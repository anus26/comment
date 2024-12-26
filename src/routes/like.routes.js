import express from 'express'
import { LikePost } from '../controllers/like.controllers.js'


const router=express.Router()
router.post('/like',LikePost)

export default router
