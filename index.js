import dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors  from "cors"
import connectDB from "./src/db/index.js"
import cookieParser  from 'cookie-parser'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import commentRoutes from "./src/routes/comment.routes.js";
import userRoutes from "./src/routes/user.routes.js"
import postRoutes from "./src/routes/post.routes.js"
import likeRoutes from "./src/routes/like.routes.js"
import sharerouter from './src/routes/share.routes.js'

   
const app = express();
app.use(cors({
  origin: "https://comment-react.vercel.app",  // Sabhi origins allow karein (for testing only)

  methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],

  credentials: true 
}));
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://comment-react.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(200).send();
});

app.use(express.json());
app.use(cookieParser())

app.get("/",(req,res)=>{
res.send("hello world")
})
console.log("Mongo URI:", process.env.MONGO_URI);

const  encryptpassword = "$2b$10$GYOgdCP7o8xn2czJ2VSiKedYc2x6abHpmcPqSLJ2L4EXwc8D1hkH."
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzaWY3ODZAZ21haWwuY29tIiwiaWF0IjoxNzM5NTkwNDg3fQ.-WxJeIGrPYWgjIBe5hBeDqsv5feWR9Lg1OajmapNUlM"
// encrpt password
app.post("/encryptpassword",(req,res)=>{
    const {password}=req.body
    
        bcrypt.hash(password, 10, function(err, hash) {
            // Store hash in your password DB.
            if(err)return res.status(402).json({message:"password not correct"})
                res.json({password:hash})
            });
            
          })
         app.post("/checkedpassword",(req,res)=>{
            const {password}=req.body
            bcrypt.compare(password, encryptpassword, function(err, result) {
              if(err) return res.status(402).json({message:"error"})
                if(result) return res.json({message:"password is correct"})
   res.status(404).json({message:"incorrect password"})
})   // checkedpassword
        ;
 })
// genreatetoken
app.post("/genreatetoken",(req,res)=>{
    const {email}=req.body
    const token = jwt.sign({email },process.env.JWT_TOKEN_SECRET ,);
    res.json(token)
})

// checkedtokend
app.post("/checkedtoken",(req,res)=>{
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, function(err, decoded) {
    if(err) return res.json({message:"error occured"})
    console.log(decoded) // bar
  res.json(decoded)
  });
})




app.use('/api/v1',commentRoutes);
app.use('/api/v1',userRoutes);
app.use('/api/v1',postRoutes)
app.use('/api/v1',likeRoutes)
app.use('/api/v1',sharerouter)
connectDB()

  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!!", err);
  });