import userServices from '../services/users.services.js'

const registerUser = async(req, res) => {
    try {
        const userDetails = await userServices.registerUser(req.body)
        return res.status(userDetails.status).send({
            data: userDetails.data,
            message: userDetails.message,
            token: userDetails.auth
        })
    } catch (error) {
        console.log('error in registering user', error)
    }
}

const loginUser = async(req, res) => {
    try {
        console.log('jghffg')
        const userDetails = await userServices.loginUser(req.body)
        return res.status(userDetails.status).send({
            data: userDetails.data,
            message: userDetails.message,
            token: userDetails.auth
        })
    } catch (error) {
        console.log('error in logging in', error)
    }
}
export default {
    registerUser,
    loginUser
}