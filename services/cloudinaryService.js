const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { cloudinary: cloudConfig } = require("../config");
const logger = require('../utils/logger')

cloudinary.config({
  cloud_name: cloudConfig.cloudName,
  api_key: cloudConfig.apiKey,
  api_secret: cloudConfig.apiSecret,
});

const uploadFile = async (file) => {
  try {
    if (!fs.existsSync(file)) {
      logger.info("No file available at given path");
      return;
    }
    const result = await cloudinary.uploader.upload(file, {
      folder: "pageSpeedReports",
      access_mode: "public",
      invalidate: true, // Forces a cache refresh
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    logger.log("error", error);
    throw new Error("Error uploading file to Cloudinary");
  }
};

module.exports = { uploadFile };
