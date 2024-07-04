import express from 'express'
import signUpMiddleware from '../../Middleware/user-middleware/users.middleware.js';
import userController from '../../controller/user.controller.js';

const router = express.Router()

router.get("/:id", userController.fetchSingleData)
router.post("/register", signUpMiddleware, userController.registerUser)
router.post("/login", userController.loginUser)
router.delete("/:id", userController.deleteUser)

export default router;