import express from "express";
import authenticateUser from "../middlewares/authMiddleware";
import { accessChat } from "../controllers/chat";

const router = express.Router()

router.route("/").post(authenticateUser, accessChat).get(authenticateUser, getChat)

router.route("/group").post(authenticateUser, createGroupChat)
router.route("/group/updateGroup").patch(authenticateUser, updateGroup)
router.route("/group/addToGroup").put(authenticateUser, updateGroup)
router.route("/group/removeFromGroup").delete(authenticateUser, updateGroup)


export default router;