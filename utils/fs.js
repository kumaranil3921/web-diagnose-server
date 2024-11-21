const fs = require("fs");

function deleteFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(`Error deleting file: ${err.message}`);
      } else {
        resolve("File deleted successfully");
      }
    });
  });
}

// Function to check if the file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath); // Returns true if file exists
  } catch (err) {
    console.error("Error checking file existence:", err);
    return false; // Return false in case of any error
  }
}
module.exports = {
  deleteFile,
  fileExists,
};
