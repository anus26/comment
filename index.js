import dotenv from "dotenv";
dotenv.config(); // Ensure environment variables are loaded

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import connectDB from "./src/db/index.js";

// Import Routes
import commentRoutes from "./src/routes/comment.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import postRoutes from "./src/routes/post.routes.js";
import likeRoutes from "./src/routes/like.routes.js";
import shareRoutes from "./src/routes/share.routes.js";



// Initialize Express App
const app = express();


app.use(cors({
  origin: ["http://localhost:5173", "https://comment-pow28yp2y-anusrazas-projects.vercel.app"], 
  credentials: true, 
  methods: "GET,POST,PUT,DELETE", 
  allowedHeaders: ["Content-Type", "Authorization"]
}));


  // Handle preflight requests
  app.options("*", cors());
  


app.use(express.json());
app.use(cookieParser());

// Environment Variables
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.ACCESS_JWT_TOKEN_SECRET;

// Database Connection
connectDB()
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Stop server if DB connection fails
  });

// Default Route
app.get("/", (req, res) => {
  res.send("Hello World from Serverless Function");
});

// Encrypt Password
app.post("/encryptpassword", async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: "Password is required" });

    const hash = await bcrypt.hash(password, 10);
    res.json({ password: hash });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Check Password
app.post("/checkedpassword", async (req, res) => {
  try {
    const { password } = req.body;
    const encryptedPassword = "$2b$10$GYOgdCP7o8xn2czJ2VSiKedYc2x6abHpmcPqSLJ2L4EXwc8D1hkH.";

    const match = await bcrypt.compare(password, encryptedPassword);
    if (match) return res.json({ message: "Password is correct" });

    res.status(400).json({ message: "Incorrect password" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Generate Token
app.post("/genreatetoken", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Verify Token
app.post("/checkedtoken", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: "Token is required" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid Token" });
    res.json(decoded);
  });
});

// API Routes
app.use("/api/v1", commentRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", postRoutes);
app.use("/api/v1", likeRoutes);
app.use("/api/v1", shareRoutes);

// Start Server (For Local Development)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`⚙️ Server is running at port: ${PORT}`);
  });
}

// Export for Vercel Serverless Function
export default app;