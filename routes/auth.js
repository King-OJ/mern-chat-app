import express from "express";
import { getCurrentUser, loginUser, logout, registerUser, searchUsers } from "../controllers/auth.js";
import authenticateUser from "../middlewares/authMiddleware.js";

const router = express.Router()

router.route('/sign-up').post(registerUser)
router.route('/login').post(loginUser)
router.route('/getCurrentuser').get(authenticateUser , getCurrentUser)
router.route('/logout').get(logout)

export default router;