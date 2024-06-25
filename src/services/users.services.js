import userRepository from '../repository/users.repository.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { commonMessages } from '../utils/constants.js'
// const secretKey = process.env.SECRET_KEY
// const getUserDetailsByEmail = async (email) => {
//     try {
//         // const userDetailsResult = await UserModal.findOne({ email });
//         const userDetailsResult = await userRepository.fetchSingleData({ email })
//         if (userDetailsResult) {
//             return userDetailsResult; // Return user details
//         } else {
//             return null; // Return null if user not found
//         }
//     } catch (error) {
//         throw error; // Rethrow the error for handling in upper layers
//     }
// }

const registerUser = async (credentials) => {
    try {
        // Check if user already exists with the provided email
        const existingUser = await userRepository.fetchSingleData({ email: credentials.email }).catch((error) => {
            throw commonMessages.INTERNAL_SERVER_ERROR
        })
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
        const registerUserResult = await userRepository.createUser(registerData).catch(()=>{
            throw commonMessages.INTERNAL_SERVER_ERROR
        })
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
export default {
    registerUser,
    loginUser
}