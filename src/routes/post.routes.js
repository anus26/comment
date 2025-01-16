import express from "express";
import {  addPost,allPost, getPostById, updatePost,deletePost } from "../controllers/post.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import { authenticate } from "../middleware/userRef.middleware.js";

const router = express.Router();

// Correct field name for Multer
router.post("/post",authenticate, upload.single("image"), addPost);
router.get("/all",allPost)
router.get("/get/:id",getPostById)
router.put("/post/:id",updatePost)
router.delete("/post/:id",deletePost)
export default router;

