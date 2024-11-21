const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const pageSpeedRoute = require("./routes/pageSpeedRoute");
const diagnoseRoute = require("./routes/diagnoses");
const { mongoURI, port } = require("./config");
const logger = require('./utils/logger')

const app = express();
const PORT = port || 4000;

app.use(cors());
app.use(express.json());

// Middleware to log request details including response time and status code
app.use((req, res, next) => {
  const start = Date.now(); // Start time for response

  // Capture the status code and response time
  res.on('finish', () => {
    const responseTime = Date.now() - start; // Calculate response time
    logger.info(`${req.method} ${req.originalUrl}`, {
      responseTime,  // Log the response time
      statusCode: res.statusCode // Log the status code
    });
  });

  next(); // Pass to the next middleware
});

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info("MongoDB connected");
  })
  .catch((err) => {
    logger.error(`Error connecting to MongoDB: ${err.message}`, {stack: err.stack});
  });

app.use("/api", pageSpeedRoute);
app.use("/api", diagnoseRoute);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
