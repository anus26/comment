import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { Post } from "../modules/post.modules.js";

//    Configuration
cloudinary.config({ 
  cloud_name:"dvryhevqf",
  api_key:"499764812538244",
  api_secret:"dZxyLgZPj9lWcMfajM6gTAGjGTc" 
});




// Upload image function
const uploadImageToCloudinary=async(localpath)=>{
  try {
      
      const uploadResult = await cloudinary.uploader
      .upload(
          localpath, {
              resource_type: 'auto',
          }
      )
     fs.unlinkSync(localpath)
     return  uploadResult.url
  } catch (error) {
      fs.unlinkSync(localpath)
      return(null)
  }
}


// const createPost = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Image file is required" });
//     }

//     console.log("Request Body:", req.body);
//     console.log("Uploaded File:", req.file);

//     const uploadResult = await uploadImageToCloudinary(req.file.path);
//     if (!uploadResult) {
//       return res.status(500).json({ message: "Error uploading image" });
//     }

//     const { title, content, userId } = req.body;

//     const newPost = await Post.create({
//       title,
//       content,
//       imageUrl: uploadResult,
//       createby: userId,
//     });

//     res.status(201).json({
//       message: "Post created successfully",
//       post: newPost,
//     });
//   } catch (error) {
//     console.error("Post creation error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }

// };

const createPost=async(req,res)=>{
  if (!req.file) return res.status(400).json({message:"no image file upload"})
      
  try {
    const uploadResult=await uploadImageToCloudinary(req.file.path)  
    if(!uploadResult)return res.status(500).json({message:"uploadresult failed"})
      const { title, content, userId } = req.body;

       
      res.status (200).json({message:"image succussfully",
  url:uploadResult,
  title,
  content,
  createby:userId
  })
  } catch (error) {
      console.log(error);
      res.status(500).json({message:"upload failed"})
      
      
  }
} 
const shareget=async(req,res)=>{
  const {title,content,userId,url}=req.body
  res.status(201).json({message:"data successfully",
    title,
    url,
    content,
    userId,


  })
} 




export {createPost,shareget}