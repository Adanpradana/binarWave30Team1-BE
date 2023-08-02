const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    cloudinary.uploader.upload(req.file.path, (err, result) => {
      if (err) {
        console.error("Error uploading to Cloudinary:", err);
        return res.status(500).json({ message: "Error uploading file" });
      }
      res.json({ message: "uppload success", imageUrl: result });
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = uploadImage;
