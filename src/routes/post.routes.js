import express from "express";
import { createPost } from "../controllers/post.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

// Correct field name for Multer
router.post("/post", upload.single("image"), createPost);

export default router;

