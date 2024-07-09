
import userServices from '../../services/users-service/users.services.js'
import { generateResponse } from '../../utils/utilityFunctions.js'

const registerUser = async(req, res) => {
    console.log('req.body', req.body);
    try {
        const userDetails = await userServices.registerUser(req.body).catch((error)=>{
            throw {
                statusCode: error?.statusCode ?? statusCode.INTERNAL_SERVER_ERROR,
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

const fetchSingleData = async(req, res) => {
    // console.log(req.params,'params');
    try {
        const userDetails = await userServices.fetchSingleData(req.params).catch((error) => {
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

const deleteUser = async (req, res) => {
    try {
        console.log(req,"reqdeleete");
        const userDetails = await userServices.deleteUser(req.params).catch((error) => {
            throw {
                statusCode: error?.statusCode ?? 500,
                message: error?.message ??  "Internal server error"
            }
        })
        console.log(userDetails,'tytutt');
        console.log(res,"res");
        return generateResponse(res, userDetails)
    } catch (error) {
        return generateResponse(res, [],error.statusCode, error.message)
    }
}

const fetchAllUserData = async (req, res) => {
    try {
        const userDetails = await userServices.fetchAllUserData(req.query).catch((error) => {
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
    loginUser,
    fetchSingleData,
    deleteUser,
    fetchAllUserData
}