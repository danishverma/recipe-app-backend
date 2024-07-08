import wishlistService from "../../services/wishlist-service/wishlist.services.js" 
import { generateResponse } from "../../utils/utilityFunctions.js";

const getAllWishistItems = async(req, res) => {
    try {
        const wishlistResult = await wishlistService.getAllWishistItems(req.params).catch((error)=>{
            throw {
                statusCode: error?.statusCode ?? statusCode.INTERNAL_SERVER_ERROR,
                message: error?.message ??  "Internal server error"
            }
        })
        return generateResponse(res, wishlistResult)
    } catch (error) {
        return generateResponse(res, [],error.statusCode, error.message)
    }
}

const addItemstoWishlist = async(req, res) => {
    try {
        const wishlistResult = await wishlistService.addItemstoWishlist(req.body).catch((error)=>{
            throw {
                statusCode: error?.statusCode ?? statusCode.INTERNAL_SERVER_ERROR,
                message: error?.message ??  "Internal server error"
            }
        })
        return generateResponse(res, wishlistResult)
    } catch (error) {
        return generateResponse(res, [],error.statusCode, error.message)
    }
}

const removeItemsFromWishlist = async(req, res) => {
    try {
        const wishlistResult = await wishlistService.removeItemsFromWishlist(req.params).catch((error)=>{
            throw {
                statusCode: error?.statusCode ?? statusCode.INTERNAL_SERVER_ERROR,
                message: error?.message ??  "Internal server error"
            }
        })
        return generateResponse(res, wishlistResult)
    } catch (error) {
        return generateResponse(res, [],error.statusCode, error.message)
    }
}

export default {
    getAllWishistItems, 
    addItemstoWishlist,
    removeItemsFromWishlist
}