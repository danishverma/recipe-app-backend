import express from 'express'
import wishlistController from '../../controller/wishlist.controller'

const router = express.Router()

router.get("/:id", wishlistController.getAllWishistItems)
router.post("/addItem", wishlistController.addItemstoWishlist)
router.delete("/remove", wishlistController.removeItemsFromWishlist)

export default router