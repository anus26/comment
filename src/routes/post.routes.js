import express from "express";
import {  addPost } from "../controllers/post.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import { authenticate } from "../middleware/userRef.middleware.js";

const router = express.Router();

// Correct field name for Multer
router.post("/post",authenticate, upload.single("image"), addPost);

export default router;

