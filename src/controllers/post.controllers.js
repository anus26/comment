
import { Post } from "../modules/post.modules.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dvryhevqf",
  api_key: "499764812538244",
  api_secret: "dZxyLgZPj9lWcMfajM6gTAGjGTc",
});

// Function to upload an image to Cloudinary
const uploadImageToCloudinary = async (localPath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localPath); // Delete the local file after upload
    return uploadResult.url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    fs.unlinkSync(localPath); // Delete the local file even if upload fails
    return null;
  }
};

// Function to handle post creation
const addPost = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file uploaded" });
  }

  try {
    // Upload image to Cloudinary
    const uploadResult = await uploadImageToCloudinary(req.file.path);
    if (!uploadResult) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // Check for user authorization
    if (!req.user) {
      return res.status(401).json({ message: "User authorization required" });
    }

    const userRef = req.user;
    if (!userRef) {
      return res.status(401).json({ message: "Please log in" });
    }

    // Create the post
    await Post.create({
      title,
      content,
      url: uploadResult,
      userRef: userRef._id,
    });

    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "An error occurred while creating the post" });
  }
};

export { addPost };
