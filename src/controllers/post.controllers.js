

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
     const newPost=await Post.create({
      title,
      content,
       imageUrl: uploadResult,
      userRef: userRef._id,
    });
 
    return res.status(201).json({ message: "Post created successfully", data:newPost });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "An error occurred while creating the post" });
  }
};

// getpost
const allPost =async(req,res)=>{
 
  try {

  const post = await Post.find()
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
      
    }
    return res.status(200).json({ message: "Post found successfully", data:post })
  } catch (error) {
    res.status(500).json({message:"fetching error"})
  }
}

// get by Id
const getPostById = async (req, res) => {
  try {
      const id = req.params.id; // Extract the ID from route parameters
      // Find the post by its ID
      const post = await Post.findById();
      
      if (!post) {
        return res.status(404).json({ message: "Post not found",data:post }); // If post doesn't exist
      }
      
      return res.status(200).json({ message: "Post found successfully", data: post }); // Return the found post
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving post", error: error.message }); // Handle errors
    }
  };
  
  // Update a post
const updatePost = async (req, res) => {
  const { id } = req.params; 
  const { title, content } = req.body; 
  if (!id) {
    return res.status(400).json({ message: "post ID is required." });
}
  if (!title && !content && !req.file) {
    return res.status(400).json({ message: "Please provide at least one field to update (title, content, or image)." });}
    if (!req.user) {
      return res.status(401).json({ message: "You need to log in first." });
  }
  try {
    let updateFields={}
    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(req.file.path);
      if (!uploadResult) {
        return res.status(500).json({ message: "Image upload failed" });
      }
      updateFields.imageUrl=uploadResult
    }
    const post = await Post.findByIdAndUpdate(id,{title:title||undefined,
      content:content||undefined,
      
    }, { new: true });

    if (!post) {
      return res.status(404).json({ message: "Post not found" }); // Post not found
    }

    res.status(200).json({ message: "Post updated successfully", post:updatePost });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Error updating post", error: error.message });
  }
};


const deletePost=async(req,res)=>{
  try {
    const id=req.params.id
    const post=await Post.findByIdAndDelete(id)
    res.json({message:"post delete successfully",data:post})
  } catch (error) {
    res.json({message:"error fetching data"})
  }
}


export { addPost ,allPost,getPostById,updatePost,deletePost};
