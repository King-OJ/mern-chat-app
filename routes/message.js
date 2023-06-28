import express from 'express'
import authenticateUser from '../middlewares/authMiddleware.js'
import { allMessages, sendMessage } from '../controllers/messages.js'

const router = express.Router()

router.route('/').post(authenticateUser, sendMessage)
router.route('/:chatId').get(authenticateUser, allMessages)

export default router