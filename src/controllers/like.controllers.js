import jwt from "jsonwebtoken";
import { Post } from "../modules/post.modules.js";
import Users from "../modules/user.modules.js";

const LikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const accessToken = req.headers.authorization?.split(" ")[1]; // Extract token from header

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // ✅ Decode the token to get user ID
    const decoded = jwt.verify(accessToken, process.env.ACCESS_JWT_TOKEN_SECRET);

    if ( !postId) {
      return res.status(400).json({ message: " Post ID are required" });
    }

    // ✅ Validate user existence
    const user = await Users.findOne({ email: decoded.email }); 
    if (!user) {
      return res.status(401).json({ message: "User not found or not registered" });
    }
    const userId = user._id.toString();

    // ✅ Validate post existence
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Ensure LikeId is an array
    if (!post.LikeId) {
      post.LikeId = [];
    }

    // ✅ Check if user already liked the post
    const isLiked = post.LikeId.some((id) => id.toString() === userId);

    if (isLiked) {
      // ✅ Unlike the post
      post.LikeId = post.LikeId.filter((id) => id.toString() !== userId);
    } else {
      // ✅ Like the post
      post.LikeId.push(userId);
    }

    // ✅ Save the updated post
    await post.save();

    return res.json({
      message: isLiked ? "Post unliked successfully" : "Post liked successfully",
      isLiked: !isLiked,
      likeCount: post.LikeId.length, // Return updated like count
    });

  } catch (error) {
    console.error("Error liking post:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { LikePost };

