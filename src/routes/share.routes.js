import express from "express"
import { sharepost } from "../controllers/share.controllers.js"


const router=express.Router()
router.post("/share",sharepost)
export default router;