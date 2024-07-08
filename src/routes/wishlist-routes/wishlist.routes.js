import express from 'express'
import wishlistController from '../../controller/wishlist-controller/wishlist.controller.js'

const router = express.Router()

router.get("/:user_id", wishlistController.getAllWishistItems)
router.post("/add", wishlistController.addItemstoWishlist)
router.delete("/:id", wishlistController.removeItemsFromWishlist)

export default router