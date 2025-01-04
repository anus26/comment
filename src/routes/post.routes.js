import express from "express";
import { createPost, shareget } from "../controllers/post.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

// Correct field name for Multer
router.post("/post", upload.single("image"), createPost);
router.get("/share",shareget)
export default router;

