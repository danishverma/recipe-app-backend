import quizRepository from '../repository/users.repository.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const secretKey = 'secret_key'
const getUserDetailsByEmail = async (email) => {
    try {
        // const userDetailsResult = await UserModal.findOne({ email });
        const userDetailsResult = await quizRepository.loginUser({ email })
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
    try {
        const { email } = userData;
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
        const registerUserResult = await quizRepository.registerUser(registerData)
        let Token = jwt.sign({ email }, secretKey, { expiresIn: "24h" })
        console.log('user registered successfully');
        return {
            status: 200,
            auth: Token,
            data: registerUserResult,
            message: 'user registered successfully'
        }
    } catch (error) {
        console.log('Error in registering user', error);
    }
}

const loginUser = async (userData) => {
    try {
        console.log('login service ')
        const email = userData.email;
        const password = userData.password;
        // Get user details by email
        const userDetails = await getUserDetailsByEmail(email);
        // If user exists, compare passwords
        if (userDetails) {
            // Compare passwords using bcrypt
            const passwordMatch = await bcrypt.compare(password, userDetails.password);
            if (passwordMatch) {
                let Token = jwt.sign({ email }, secretKey, { expiresIn: "24h" })
                console.log('token', Token);
                console.log('Login successful');
                return ({
                    status: 200,
                    auth: Token,
                    data: userDetails,
                    message: 'Login successful'
                })
            } else {
                console.log('Incorrect password');
                return ({
                    status: 401,
                    data: null,
                    message: 'Incorrect password'
                })
            }
        } else {
            console.log('User not found');
            return ({
                status: 404,
                data: null,
                message: 'User not found'
            })
        }
    } catch (error) {
        console.log('Error in loginUser', error);
    }
}


export default {
    registerUser,
    loginUser
}