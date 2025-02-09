import express from 'express'
import { getLikeall, LikePost } from '../controllers/like.controllers.js'


const router=express.Router()
router.post('/like',LikePost)
router.get('/getlike',getLikeall)

export default router
