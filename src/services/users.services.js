import userRepository from '../repository/users.repository.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { commonMessages } from '../utils/constants.js'
import { ObjectId } from 'mongodb' 
import { convertMongoosId } from '../utils/utilityFunctions.js'
import mongoose from 'mongoose'
const registerUser = async (credentials) => {
    try {
        console.log('credentials', credentials);
        // Check if user already exists with the provided email
        const existingUser = await userRepository.fetchSingleData({ email: credentials.email }).catch((error) => {
            throw commonMessages.INTERNAL_SERVER_ERROR
        })
        console.log('check existing user', existingUser);
        if (existingUser) {
            throw commonMessages.BAD_REQUEST
        }
        else {
            const password = credentials.password
            const hashedPassword = await bcrypt.hash(password, 10)
            const registerData = {
                first_name: credentials.first_name,
                last_name: credentials.last_name,
                email: credentials.email,
                password: hashedPassword,
                contact: credentials.contact
            }
            console.log('registerData', registerData);
            const registerUserResult = await userRepository.createUser(registerData).catch(() => {
                throw commonMessages.INTERNAL_SERVER_ERROR
            })
            console.log(registerUserResult, 'registerUserResult');
            const id = registerUserResult._id
            let jwtToken = jwt.sign({ id }, 'secret_key', { expiresIn: "24h" })
            return ({
                token: jwtToken,
                id: registerUserResult._id
            })
        }
    } catch (error) {
        throw error
    }
}

const loginUser = async (credentials) => {
    try {
        // checking if user exist or not
        const userDetails = await userRepository.fetchSingleData({ email: credentials.email }).catch((error) => {
            throw commonMessages.INTERNAL_SERVER_ERROR
        })
        if (userDetails) {
            // comparing the password
            const passwordMatch = await bcrypt.compare(credentials.password, userDetails.password);
            if (passwordMatch) {
                // generate JWT token here
                let jwtToken = jwt.sign({ id: userDetails._id }, 'secret_key', { expiresIn: "24h" })
                return ({
                    token: jwtToken,
                    id: userDetails._id
                })
            }
            throw { statusCode: 400, message: "Password Doesn't match." }
        }
        throw { statusCode: 404, message: "User with given credentials Does not exist." }
    } catch (error) {
        throw error;
    }
}
    const fetchSingleData = async (credentials) => {
        console.log('credentials', credentials)
        // const {id} = credentials
        // const userId  = {"_id":new ObjectId(credentials.id)}
        // const newId = new mongoose.Types.ObjectId(credentials.id)
        // console.log('====> newId <=========', newId)
        // console.log(new ObjectId(credentials.id), 'userId')
        try {
            const userDetails = await userRepository.getById(credentials.id).catch((error) => {
                throw commonMessages.INTERNAL_SERVER_ERROR
            })
            console.log(userDetails, 'userdetails');
            if (userDetails) {
                return ({
                    data: userDetails
                })
            } throw { statusCode: 404, message: "User with given credentials Does not exist." }
        } catch (error) {
            throw error
        }
    }
export default {
    registerUser,
    loginUser,
    fetchSingleData
}