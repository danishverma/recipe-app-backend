
import express from 'express'
import userController from '../controller/user.controller.js'
import signUpMiddleware from '../Middleware/user-middleware/users.middleware.js'

const router = express.Router()

router.get("/api/v1/users/test", (req, res)=>{res.json({message: "app working"})})
router.post("/api/v1/users/register", signUpMiddleware, userController.registerUser)
router.post("/api/v1/users/login", userController.loginUser)

export default router