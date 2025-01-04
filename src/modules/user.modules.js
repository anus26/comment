import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  enrolledcomment:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Comment',
 
  },
 likes:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Like'
  }
 ] 
},
  {
    timestamps:true,
  }
  
);
userSchema.pre("save",async function(next){
  if(!this.isModified("password"))return next()
    this.password=await bcrypt.hash (this.password,10)
  next()
})
export default mongoose.model("Users", userSchema);