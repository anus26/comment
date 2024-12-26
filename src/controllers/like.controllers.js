import { Like } from "../modules/like.modules.js";

const LikePost = async (req, res) => {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
        return res.status(400).json({ message: "User ID and Post ID are required" });
    }


        const newLike = new Like({ userId, postId });
        await newLike.save();

        res.json({
            message: "Like successfully added",
            Like: newLike,
            userId,
            postId
            
        });
    } 
    


export { LikePost };

