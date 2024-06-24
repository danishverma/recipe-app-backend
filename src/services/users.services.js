import userRepository from '../repository/users.repository.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const secretKey = 'secret_key'
const getUserDetailsByEmail = async (email) => {
    try {
        // const userDetailsResult = await UserModal.findOne({ email });
        const userDetailsResult = await userRepository.loginUser({ email })
        if (userDetailsResult) {
            console.log('User already exists:', userDetailsResult);
            return userDetailsResult; // Return user details
        } else {
            console.log('User not found');
            return null; // Return null if user not found
        }
    } catch (error) {
        console.log('Error in getting user by email', error);
        throw error; // Rethrow the error for handling in upper layers
    }
}

const registerUser = async (userData) => {
    const email = userData.email
    try {
        // Check if user already exists with the provided email
        const existingUser = await getUserDetailsByEmail(email);
        if (existingUser) {
            console.log('User with this email already exists');
            return {
                status: 400,
                data: null,
                message: 'User with this email already exists'
            }
        }
        const password = userData.password
        const hashedPassword = await bcrypt.hash(password, 10)
        const registerData = {
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            password: hashedPassword,
            contact: userData.contact
        }
        console.log('regiter data', registerData)
        const registerUserResult = await userRepository.registerUser(registerData)

        const id = registerUserResult._id
        console.log('id', id);
        let Token = jwt.sign({ id }, secretKey, { expiresIn: "24h" })
        console.log('user registered successfully');
        return {
            status: 201,
            auth: Token,
            data: registerUserResult,
            message: 'user registered successfully'
        }
    } catch (error) {
        console.log('Error in registering user', error);
    }
}

// const loginUser = async (userData) => {
//     try {
//         console.log('login service ')
//         const email = userData.email;
//         const password = userData.password;
//         // Get user details by email
//         const userDetails = await getUserDetailsByEmail(email);

//         const id = userDetails._id
//         console.log(id, 'id');
//         // If user exists, compare passwords
//         if (userDetails) {
//             // Compare passwords using bcrypt
//             const passwordMatch = bcrypt.compare(password, userDetails.password);
//             if (passwordMatch) {
//                 let Token = jwt.sign({ id }, secretKey, { expiresIn: "24h" })
//                 console.log('token', Token);
//                 console.log('Login successful');
//                 return ({
//                     status: 200,
//                     auth: Token,
//                     data: userDetails,
//                     message: 'Login successful'
//                 })
//             } else {
//                 console.log('Incorrect password');
//                 return ({
//                     status: 401,
//                     data: null,
//                     message: 'Incorrect password'
//                 })
//             }
//         } else {
//             console.log('User not found');
//             return ({
//                 status: 404,
//                 data: null,
//                 message: 'User not found'
//             })
//         }
//     } catch (error) {
//         console.log('Error in loginUser', error);
//     }
// }
const loginUser = async (credentials) => {
    try {
        // checking if user exist or not
        const userDetails = await userRepository.fetchSingleData({email: credentials.email}).catch((error) => {
            throw "Error occurred while processing your request. Please try after some time or if problem continues kindly contact with support team."
        })
        if(userDetails) {
            // logic to login
            return;
        }
        throw "User with given credentials Does not exist."
    } catch (error) {
        throw error;
    }
}
export default {
    registerUser,
    loginUser
}