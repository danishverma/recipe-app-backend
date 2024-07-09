import userRepository from '../../repository/users-repository/users.repository.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { commonMessages } from '../../utils/constants.js'

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
                contact: credentials.contact,
                role: 'USER'
            }
            console.log('registerData', registerData);
            const registerUserResult = await userRepository.createUser(registerData).catch(() => {
                throw commonMessages.INTERNAL_SERVER_ERROR
            })
            console.log(registerUserResult, 'registerUserResult');
            const id = registerUserResult.id
            let jwtToken = jwt.sign({ id }, 'secret_key', { expiresIn: "24h" })
            return ({
                token: jwtToken,
                id: registerUserResult.id
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
                let jwtToken = jwt.sign({ id: userDetails.id }, 'secret_key', { expiresIn: "24h" })
                return ({
                    token: jwtToken,
                    id: userDetails.id
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
    try {
        const userDetails = await userRepository.fetchSingleData(credentials).catch((error) => {
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

const deleteUser = async (credentials) => {
    try {
        console.log(credentials, "credentials");
        const userDetails = await fetchSingleData(credentials);
        console.log(userDetails, "delete service");
        if (userDetails) {
            return await userRepository.deleteUser(credentials).catch((error) => {
                throw commonMessages.INTERNAL_SERVER_ERROR;
            });
        }
    } catch (error) {
        throw error
    }
}

const fetchAllUserData = async (paginationData) => {
    try {
        const pageSize = paginationData.pageSize
        const page = paginationData.page
        const usersDetails = await userRepository.fetchMultipleData({"role": "USER"}, pageSize, page).catch((error) => {
            throw commonMessages.INTERNAL_SERVER_ERROR;
        })
        if (usersDetails) {
            return usersDetails
        }
    } catch (error) {
        throw error
    }
}

export default {
    registerUser,
    loginUser,
    fetchSingleData,
    deleteUser,
    fetchAllUserData
}