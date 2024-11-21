const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    fileUrl: { type: String, required: true },
    url: { type: String, required: true },
    category: { type: String, required: true },
    strategy: { type: String, required: true },
    fileId: { type: String, required: true },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
