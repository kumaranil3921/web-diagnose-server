const winston = require("winston");

// Custom format to include timestamp, response time, and status code
const logFormat = winston.format.combine(
  winston.format.timestamp(), // Add timestamp to logs
  winston.format.printf(({ timestamp, level, message, responseTime, statusCode }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message} | Response Time: ${responseTime}ms | Status Code: ${statusCode}`;
  })
);

const console = winston.createLogger({
  level: "info", // Default level
  format: logFormat, // Custom log format
  transports: [
    new winston.transports.Console(), // Logs to the console
    new winston.transports.File({ filename: "logs/app.log" }), // Logs to a file
  ],
});

module.exports = console;
