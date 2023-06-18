// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const config = require('config');
const bodyParser = require('body-parser');


// Create Express app
const app = express();

// Middleware
app.use(express.json()); 
app.use(bodyParser.json());
// Register routes
routes(app);

// Connect to the database
const connectToDatabase = async () => {
  try {
    const dbConfig = config.get('dbConfig');
    await mongoose.connect(`mongodb://${dbConfig.dbHost}:${dbConfig.dbPort}/${dbConfig.dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

// Start the server
const startServer = () => {
  const serverConfig = config.get('serverConfig');
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
    console.error('Error starting the server:', error);
  }
})();
