import express from "express";
import { getUsers, getCurrentUser, loginUser, logout, registerUser } from "../controllers/users.js";
import authenticateUser from "../middlewares/authMiddleware.js";

const router = express.Router()

router.route('/sign-up').post(registerUser)
router.route('/login').post(loginUser)
router.route('/getCurrentuser').get(authenticateUser , getCurrentUser)
router.route('/getUsers').get(authenticateUser , getUsers)
router.route('/logout').get(logout)

export default router;