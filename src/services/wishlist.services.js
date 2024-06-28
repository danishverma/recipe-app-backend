import wishlistRepository from "../repository/wishlist.repository";
import { commonMessages } from "../utils/constants";

const getAllWishistItems = async(credentials) => {
    try {
        const wishlistResult = await wishlistRepository.getAllWishistItems(credentials).catch((err)=> {
            throw commonMessages.INTERNAL_SERVER_ERROR
        })
        if(wishlistResult){
            return wishlistResult
        }
        throw {statusCode : 404, message: "Recipe with given name doesn't exists"}
    } catch (error) {
        throw error
    }
}

const addItemstoWishlist = async(credentials) => {
    try {
        const wishlistResult = await wishlistRepository.addItemstoWishlist(credentials).catch((err)=>{
            throw commonMessages.INTERNAL_SERVER_ERROR
        })
        return wishlistResult
    } catch (error) {
        throw error
    }
}

const removeItemsFromWishlist = async(credentials) => {
    try {
        return await wishlistRepository.removeItemsFromWishlist(credentials).catch((err)=>{
            throw commonMessages.INTERNAL_SERVER_ERROR
        })
    } catch (error) {
        throw error
    }
}

export default  {
    getAllWishistItems, 
    addItemstoWishlist,
    removeItemsFromWishlist
}