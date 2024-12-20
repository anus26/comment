import mongoose from "mongoose";


const CommentSchema= new mongoose.Schema({
    comment:{
        type:String,
        required:[true]
        
    },
  postId:  {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Post",
      required:[true,"post id is required"]
    },
    enrolleduserdId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:[true,"user id is required"]
    },
   
},{
    timestamps:true,
  })


export const Comment = mongoose.model("Comment", CommentSchema);
