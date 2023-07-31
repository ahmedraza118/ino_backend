// Import required modules
require("dotenv").config();
const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors module
const apiErrorHandler = require("./helper/apiErrorHandler.js");
const { logRequest, logResponse } = require("./helper/requestTrack.js");

// Create Express app
const app = express();

app.use(logRequest);
app.use(logResponse);
// Use the middleware functions
app.use(cors({ origin: "*" })); // Enable CORS for all routes
// Middleware
app.use(express.json());
app.use(bodyParser.json());
// Register routes
routes(app);
app.use(apiErrorHandler);
// Connect to the database
const connectToDatabase = async () => {
  try {
    const dbConfig = config.get("dbConfig");
    let dbUrl = `mongodb://${dbConfig.dbHost}:${dbConfig.dbPort}/${dbConfig.dbName}`;

    if (process.env.MONGO_URL) {
      dbUrl = process.env.MONGO_URL;
    }

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

// Start the server
const startServer = () => {
  const serverConfig = config.get("serverConfig");
  const port = process.env.PORT || serverConfig.serverPort;
  app.listen(port, () => {
    console.log(`Server is running on ${serverConfig.serverURL}:${port}`);
  });
};

// Connect to the database first, then start the server
(async () => {
  try {
    await connectToDatabase();
    startServer();
  } catch (error) {
    console.error("Error starting the server:", error);
  }
})();
