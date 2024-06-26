import userServices from '../services/users.services.js'
import { generateResponse } from '../utils/utilityFunctions.js'

const registerUser = async(req, res) => {
    try {
        const userDetails = await userServices.registerUser(req.body).catch((error)=>{
            throw {
                statusCode: error?.statusCode ?? 500,
                message: error?.message ??  "Internal server error"
            }
        })
        return generateResponse(res, userDetails)
    } catch (error) {
        return generateResponse(res, [],error.statusCode, error.message)
    }
}

const loginUser = async(req, res) => {
    try {
        const userDetails = await userServices.loginUser(req.body).catch((error) => {
            throw {
                statusCode: error?.statusCode ?? 500,
                message: error?.message ??  "Internal server error"
            }
        })
        return generateResponse(res, userDetails)
    } catch (error) {
        return generateResponse(res, [],error.statusCode, error.message)
    }
}
export default {
    registerUser,
    loginUser
}