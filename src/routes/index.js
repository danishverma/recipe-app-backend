
import express from 'express'
import userController from '../controller/user.controller.js'
import signUpMiddleware from '../Middleware/user-middleware/users.middleware.js'

const router = express.Router()

router.post("/api/v1/users/register", signUpMiddleware, userController.registerUser)
router.post("/api/v1/users/login", userController.loginUser)

export default router