import userServices from '../services/users.services.js'

const registerUser = async(req, res) => {
    try {
        const userDetails = await userServices.registerUser(req.body).then((response)=>{return response})
        return res.status(userDetails.status).send({
            data: userDetails.data,
            message: userDetails.message
        })
    } catch (error) {
        console.log('error in registering user', error)
        throw error
    }
}

const loginUser = async(req, res) => {
    try {
        console.log('jghffg')
        const userDetails = await userServices.loginUser(req.body).then((response) => {return response})
        return res.status(userDetails.status).send({
            data: userDetails.data,
            message: userDetails.message
        })
    } catch (error) {
        console.log('error in logging in', error)
    }
}
export default {
    registerUser,
    loginUser
}