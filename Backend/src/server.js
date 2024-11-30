// Import required dependencies
const express = require("express");
const { testConnection } = require("./config/db");
const cors = require("cors");
require("dotenv").config();

//import routes
const schemaRoutes = require("./routes/schemaRoutes");

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Use routes with /api prefix
app.use("/api", schemaRoutes);

//Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello World! Server is running" });
});

//Define port
const PORT = process.env.PORT || 3001;

// DB connection
testConnection();

//Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
