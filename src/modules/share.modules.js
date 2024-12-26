import mongoose from "mongoose";

const ShareSchema = new mongoose.Schema({
//   sharedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Users", // Kis user ne share kiya
//     required: [true, "Shared by user ID is required"],
//   },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // Share kiya gaya post
    required: [true, "Post ID is required"],
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  }
//   platform: {
//     type: String,
//     enum: ["Facebook", "Twitter", "WhatsApp", "LinkedIn", "Other"], // Platform jahan share hua
//     default: "Other",
//   },
//   message: {
//     type: String, // Custom message user ke taraf se
//     maxlength: 500,
//   },
}, {
  timestamps: true, // Timestamps add karega (createdAt, updatedAt)
});

export const Share = mongoose.model("Share", ShareSchema);
