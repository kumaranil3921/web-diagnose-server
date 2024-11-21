// console.js
const winston = require("winston");

const console = winston.createLogger({
  level: "info", // Default level
  format: winston.format.json(), // JSON format for structured logging
  transports: [
    new winston.transports.Console(), // Logs to the console
    new winston.transports.File({ filename: "logs/app.log" }), // Logs to a file
  ],
});

module.exports = console;
