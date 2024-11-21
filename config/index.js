require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  googleAPIKey: process.env.GOOGLE_API_KEY,
  port: process.env.PORT,
  googleServiceAccountJson: process.env.GOOGLE_SERVICE_ACCOUNT_JSON
};
