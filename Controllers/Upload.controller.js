
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImage = async (req, res) => {
  try {
    res.status(200).json({ message: "success upload", data: req.file });
  } catch (error) {
    console.log(error);
  }
};
module.exports = uploadImage;
