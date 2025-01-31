import mongoose from "mongoose";
import Users from "../modules/user.modules.js"
const PostSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String
  },
  userRef:{
    type:mongoose.Schema.Types.ObjectId,
    ref:Users,
    required:true
  },
  LikeId:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
    }
  ]
},
  {
    timestamps:true
})

export const Post = mongoose.model("Post", PostSchema);
