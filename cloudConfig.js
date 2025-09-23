const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// console.log("Cloud Name:", process.env.CLOUD_NAME);
// console.log("API Key:", process.env.CLOUD_API_KEY);
// console.log("API Secret:", process.env.CLOUD_API_SECRET);

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'prahari_DEV',
    allowed_Formats: ['png', 'jpg', 'jpeg', 'mp4'], 
  },
});


module.exports = { cloudinary, storage }