import express from 'express'
import userController from '../../controller/users-controller/user.controller.js';
import usersMiddleware from '../../Middleware/user-middleware/users.middleware.js';
const router = express.Router()

router.post("/register", usersMiddleware.signUpMiddleware, userController.registerUser)
router.post("/login", userController.loginUser)
router.get("/:id", userController.fetchSingleData)
router.delete("/:id", userController.deleteUser)
router.get("/", usersMiddleware.checkRole ,userController.fetchAllUserData)

export default router;