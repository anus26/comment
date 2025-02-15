import  express from "express";
import {logoutUser, loginUser, refreshToken, registerUser, sendTestemail} from '../controllers/user.controllers.js'

const router=express.Router()
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshToken);
router.get("/sendemail",sendTestemail);
export default router