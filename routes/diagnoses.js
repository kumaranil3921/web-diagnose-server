const express = require("express");
const File = require("../models/File");
const logger = require("../utils/logger");

const router = express.Router();

router.get("/diagnoses", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    logger.info(`Fetching files: Page ${page}, Limit ${limit}`);
    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    // Validate input
    if (
      isNaN(pageNumber) ||
      isNaN(pageSize) ||
      pageNumber < 1 ||
      pageSize < 1
    ) {
      logger.error("Invalid pagination parameters");
      return res.status(400).json({ error: "Invalid pagination parameters." });
    }

    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * pageSize;

    // Retrieve files with pagination (using cursor-style pagination)
    const files = await File.find()
      .sort({ _id: -1 }) // Sort by _id or other field to ensure consistency
      .skip(skip)
      .limit(pageSize);

    // Get the total number of documents in the collection
    const totalFiles = await File.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalFiles / pageSize);
    logger.info(`Successfully fetched ${files.length} files.`);
    // Send paginated result
    res.status(200).json({
      files,
      pagination: {
        totalFiles,
        totalPages,
        currentPage: pageNumber,
        pageSize,
      },
    });
  } catch (error) {
    logger.error(`Error fetching files: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch files." });
  }
});

module.exports = router;
