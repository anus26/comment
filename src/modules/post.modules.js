import mongoose from "mongoose";

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
  createby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users",
    required:true
  },
  like:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Like',
    }
  ]
},
  {
    timestamps:true
})

export const Post = mongoose.model("Post", PostSchema);
