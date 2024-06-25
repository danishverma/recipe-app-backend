import express from 'express'
// import userController from '../../controller/user.controller'

const router = express.Router()

// router.get("/", userController.registerUser)

// router.post("/register", signUpMiddleware, userController.registerUser)
// router.post("/login", userController.loginUser)

router.get("/register", (req, res) => res.send("hello from register route"))
router.get("/login", (req, res) => res.send("Hello from login route"))
export default router;