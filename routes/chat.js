import express from "express";
import authenticateUser from "../middlewares/authMiddleware.js";
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, updateGroup } from "../controllers/chat.js";

const router = express.Router()

router.route("/").get(authenticateUser, fetchChats).post(authenticateUser, accessChat)

router.route("/group").post(authenticateUser, createGroupChat)
router.route("/group/updateGroup").patch(authenticateUser, updateGroup)
router.route("/group/addToGroup").put(authenticateUser, addToGroup)
router.route("/group/removeFromGroup").delete(authenticateUser, removeFromGroup)



export default router;