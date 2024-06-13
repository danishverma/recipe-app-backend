import UserModal from '../Models/user-models/userModal.js'

const registerUser = async(userData) => {
    try {
        const user = await UserModal.create(userData)
        return user
    } catch (error) {
        console.log('Error in creating user:', error)
        throw error
    }
}

const loginUser = async(email) => {
    try {
        const user = await UserModal.findOne(email)
        return user
    } catch (error) {
        console.log('error in login', error);
    }
}

export default  {
    registerUser,
    loginUser
}