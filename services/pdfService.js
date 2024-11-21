const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generatePDF = (data) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const fileName = `PageSpeed_Insights_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, "../uploads", fileName); // Save PDF to "uploads" folder

    // Create the write stream to save the file locally
    const writeStream = fs.createWriteStream(filePath);

    // Pipe the PDF content to the file
    doc.pipe(writeStream);

    // Title
    doc.fontSize(20).text("PageSpeed Insights Report", { align: "center" });
    doc.moveDown();

    // Basic Information
    doc.fontSize(14).text(`URL: ${data.url}`);
    doc.text(`Strategy: ${data.strategy}`);
    doc.text(`Category: ${data.category}`);
    doc.moveDown();

    // Lighthouse Scores
    doc.fontSize(16).text("Lighthouse Scores:", { underline: true });
    Object.keys(data.categories).forEach((key) => {
      const category = data.categories[key];
      doc.fontSize(12).text(`${category.title}: ${category.score * 100}`);
    });
    doc.moveDown();

    // Performance Metrics
    doc.fontSize(16).text("Performance Metrics:", { underline: true });
    data.performanceMetrics.forEach((metric) => {
      doc.fontSize(12).text(`${metric.title}: ${metric.displayValue}`);
    });

    // Finalize the document
    doc.end();

    // Wait for the file to be written, then resolve with the file path
    writeStream.on("finish", () => {
      resolve(filePath);
    });

    writeStream.on("error", (error) => {
      reject("Error saving PDF file: " + error.message);
    });
  });
};

module.exports = { generatePDF };
