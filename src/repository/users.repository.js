import UserModal from '../Models/user-models/userModal.js'

const registerUser = async(userData) => {
    try {
        console.log(userData, '@1 register')
        const user = await UserModal.create(userData)
        console.log(user, 'register')
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
const fetchSingleData = async (whereCondition) => {
    try {
        const userDetails = await UserModal.findOne(whereCondition).catch((error) => {
            throw error
        })
        return userDetails;
    } catch (error) {
        throw error
    }
}
export default  {
    registerUser,
    loginUser,
    fetchSingleData
}