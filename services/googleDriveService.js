const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const { googleServiceAccountJson } = require("../config");
const { deleteFile, fileExists } = require("../utils/fs");

// Read and parse the JSON credentials from the environment variable
const SERVICE_ACCOUNT_KEY_JSON = JSON.parse(googleServiceAccountJson);

// Scopes for Google Drive API
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

async function authenticate() {
  // Load the service account credentials
  const auth = new google.auth.GoogleAuth({
    credentials: SERVICE_ACCOUNT_KEY_JSON,
    scopes: SCOPES,
  });

  // Authenticate and return the auth client
  const authClient = await auth.getClient();
  return authClient;
}

// Upload the file to Google Drive
async function uploadFile(authClient, filePath) {
  if (!fileExists(filePath)) {
    throw new Error("File not available at: ", filePath);
  }
  const drive = google.drive({ version: "v3", auth: authClient });

  const fileMetadata = {
    name: path.basename(filePath), // Set the file name
    mimeType: "application/pdf", // Adjust MIME type as needed
  };

  const media = {
    mimeType: "application/pdf",
    body: fs.createReadStream(filePath),
  };

  try {
    // Upload the file
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    console.log("File uploaded successfully:", file.data.id);

    // Make the file publicly accessible
    await drive.permissions.create({
      fileId: file.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const publicUrl = `https://drive.google.com/uc?id=${file.data.id}`;
    console.log("Public File URL:", publicUrl);

    // Delete the local file after upload
    await deleteFile(filePath);

    return { publicUrl, id: file.data.id };
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);
    throw error;
  }
}

module.exports = {
  authenticate,
  uploadFile,
};
