// import multer from "multer";
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });
// export const upload = multer({ storage: storage });
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dvryhevqf",
  api_key: "499764812538244",
  api_secret: "dZxyLgZPj9lWcMfajM6gTAGjGTc",
});

// Multer direct Cloudinary pe upload karega
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Cloudinary folder
    resource_type: "auto",
  },
});

const upload = multer({ storage });

export default upload;



