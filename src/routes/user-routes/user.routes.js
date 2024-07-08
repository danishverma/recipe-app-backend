import express from 'express'
import signUpMiddleware from '../../Middleware/user-middleware/users.middleware.js';
import userController from '../../controller/users-controller/user.controller.js';

const router = express.Router()

router.post("/register", signUpMiddleware, userController.registerUser)
router.post("/login", userController.loginUser)
router.get("/:id", userController.fetchSingleData)
router.delete("/:id", userController.deleteUser)
router.get("/", userController.fetchAllUserData)

export default router;