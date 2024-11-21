const express = require("express");
const axios = require("axios");
const pdfService = require("../services/pdfService");
const File = require("../models/File");
const { googleAPIKey } = require("../config");
const googleDrive = require("../services/googleDriveService");
// const console = require("../utils/console");

const router = express.Router();

router.post("/pagespeed", async (req, res) => {
  const {
    url,
    category = "CATEGORY_UNSPECIFIED",
    strategy = "DESKTOP",
  } = req.body;

  if (!url) {
    logger.error("Missing 'url' parameter");
    return res.status(400).json({ error: "The 'url' parameter is required." });
  }

  try {
    // Call the PageSpeed Insights API
    const apiResponse = await axios.get(
      "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed",
      {
        params: {
          url,
          category,
          strategy: strategy.toLowerCase(),
          key: googleAPIKey,
        },
      }
    );

    const data = apiResponse.data;
    const { lighthouseResult } = data;

    if (!lighthouseResult) {
      logger.error("No Lighthouse results found");
      return res
        .status(500)
        .json({ error: "No Lighthouse results found in the response." });
    }

    // Extract data for the PDF
    const categories = lighthouseResult.categories;
    const audits = lighthouseResult.audits;

    // Prepare performance metrics
    const performanceMetrics = [
      {
        title: "First Contentful Paint",
        displayValue: audits["first-contentful-paint"].displayValue,
      },
      {
        title: "Largest Contentful Paint",
        displayValue: audits["largest-contentful-paint"].displayValue,
      },
      {
        title: "Speed Index",
        displayValue: audits["speed-index"].displayValue,
      },
      {
        title: "Interactive",
        displayValue: audits["interactive"].displayValue,
      },
      {
        title: "Cumulative Layout Shift",
        displayValue: audits["cumulative-layout-shift"].displayValue,
      },
      {
        title: "Speed Index",
        displayValue: audits["speed-index"].displayValue,
      },
    ];

    // Generate PDF and upload it to Cloudinary
    const filePath = await pdfService.generatePDF({
      url,
      category,
      strategy,
      categories,
      performanceMetrics,
    });

    const googleAuthClient = await googleDrive.authenticate();
    const googleDriveResponse = await googleDrive.uploadFile(
      googleAuthClient,
      filePath
    );
    const newFile = new File({
      url: url,
      strategy,
      category,
      fileUrl: googleDriveResponse.publicUrl,
      fileId: googleDriveResponse.id,
    });

    // Save URL to MongoDB
    await newFile.save();
    console.info(
      `File uploaded successfully to google drive: ${googleDriveResponse.publicUrl}`
    );
    // Return the file info
    return res.status(200).json({
      id: newFile._id,
      url: googleDriveResponse.publicUrl,
      fileId: googleDriveResponse.id,
    });
  } catch (error) {
    console.error(`Error processing PageSpeed report: ${error.message}`);
    res.status(500).json({ error: "Failed to generate PageSpeed report." });
  }
});

module.exports = router;
