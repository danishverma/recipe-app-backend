import UserModal from '../Models/user-models/userModal.js'

const fetchMultipleData = async(whereCondition={}) => {
    try {
        return await UserModal.find(whereCondition).catch((error) => {
            throw error
        })
    } catch (error) {
        throw error
    }
}
const createUser = async (user) => {
    try {
        let newUser = await UserModal.create(user).catch((error) => {
            throw error
        })
        return newUser;
    } catch (error) {
        throw error;
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

const updateUser = async (whereCondition, updatedData) => {
    try {
        await UserModal.updateOne(whereCondition, updatedData).catch((error) => {
            throw error;
        })
    } catch (error) {
        throw error;
    }
}

const deleteUser = async (whereCondition ) => {
    try {
        await UserModal.deleteOne(whereCondition).catch(error => {
            throw error;
        })
        return;
    } catch (error) {
        throw error
    }
}
    
const getById = async(id) => {
    try {
        const user = await UserModal.findById(id).catch(err=>{throw err})
        return user
    } catch (error) {
        throw error
    }
}
export default  {
    fetchSingleData,
    fetchMultipleData,
    createUser,
    updateUser,
    deleteUser,
    getById
}