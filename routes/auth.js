import express from "express";
import { loginUser, registerUser, searchUsers } from "../controllers/auth.js";

const router = express.Router()

router.route('/sign-up').post(registerUser)
router.route('/login').post(loginUser)
router.route('/users').get(searchUsers)

export default router;