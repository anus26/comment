import express from 'express'
import { createComment } from '../controllers/comment.controllers.js'

const router=express.Router()
router.post ("/comment",createComment)

export default router
