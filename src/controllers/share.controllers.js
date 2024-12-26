import { Share } from "../modules/share.modules.js";


const sharepost=async (req,res)=>{
    const { postId, userId,  } = req.body;
    
    
        const newshare =  new Share({  postId,  userId});
        await newshare.save()
        res.status(201).json({ message:'mesaage successfully', newshare:Share});
      }

export {sharepost}