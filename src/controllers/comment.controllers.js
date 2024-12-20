
import { Comment } from "../modules/comment.modules.js"
const createComment=async(request,response)=>{
    const {comment,userId,postId}=request.body
    if(!comment)return response.status(400).json({message:"comment required"})
const newComment=await Comment.create({
    comment,
    postId:request.userId,
    
})
response.status(201).json({
    message:"added comment",
    data:newComment
})
}

export  {createComment} 