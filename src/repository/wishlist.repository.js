import WishlistModal from "../Models/wishlist-modal/wishlistModal.js";

const getAllWishistItems = async(whereCondition) => {
    try {
        const wishlistResult = await WishlistModal.find(whereCondition).catch((err)=>{
            throw err
        })
        return wishlistResult
    } catch (error) {
        throw error
    }
}

const addItemstoWishlist = async(whereCondition) => {
    try {
        const wishlistResult = await WishlistModal.create(whereCondition).catch((err)=>{
            throw err
        })
        return wishlistResult
    } catch (error) {
        throw error
    }
}

const removeItemsFromWishlist = async(whereCondition) => {
    try {
        await WishlistModal.deleteOne(whereCondition).catch((err)=> {
            throw err
        })
    } catch (error) {
        throw error
    }
}

export default {
    getAllWishistItems,
    addItemstoWishlist,
    removeItemsFromWishlist
}