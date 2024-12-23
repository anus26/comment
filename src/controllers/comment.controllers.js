
import { Comment } from "../modules/comment.modules.js"
const createComment=async(req,res)=>{
    const {comment,userId,postId}=req.body
    if(!comment)return res.status(400).json({message:"comment required"})
        if (!userId) return res.status(400).json({ message: "User ID is required" });
    if (!postId) return res.status(400).json({ message: "Post ID is required" });
 // Create a new comment document
 const newComment = new Comment({
    comment,
    enrolleduserdId: userId,

    postId,
});
const savedComment = await newComment.save();
res.status(201).json({
    message:"added comment",
    comment:savedComment,
    comment,
    userId,
    postId
    
   

})
}

export  {createComment} 