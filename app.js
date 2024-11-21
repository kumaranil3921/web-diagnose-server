const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const pageSpeedRoute = require("./routes/pageSpeedRoute");
const diagnoseRoute = require("./routes/diagnoses");
const { mongoURI, port } = require("./config");
// const console = require('./utils/console')

const app = express();
const PORT = port || 4000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.use("/api", pageSpeedRoute);
app.use("/api", diagnoseRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
