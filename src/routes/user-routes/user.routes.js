import express from 'express'
import signUpMiddleware from '../../Middleware/user-middleware/users.middleware.js';
import userController from '../../controller/user.controller.js';
// import userController from '../../controller/user.controller'

const router = express.Router()

// router.get("/", userController.registerUser)

router.post("/register", signUpMiddleware, userController.registerUser)
router.post("/login", userController.loginUser)

export default router;