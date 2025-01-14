import { Like } from "../modules/like.modules.js";
import { Post } from "../modules/post.modules.js";

const LikePost = async (req, res) => {
  const { userId, postId } = req.body;

  if (!userId || !postId) {
    return res.status(400).json({ message: "User ID and Post ID are required" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user already liked the post
    const existingLike = await Like.findOne({ userId, postId });
    let isLiked;
    if (existingLike) {
      // Unlike the post
      await Like.deleteOne({ _id: existingLike._id });
      post.likeCount -= 1;
      isLiked = false;
    } else {
      // Like the post
      const newLike = new Like({ userId, postId });
      await newLike.save();
      post.likeCount += 1;
      isLiked = true;
    }

    await post.save();

    return res.json({
      message: isLiked ? "Post liked successfully" : "Post unliked successfully",
      isLiked,
      likeCount: post.likeCount,
    });
  } catch (error) {
    console.error("Error liking post:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { LikePost };
