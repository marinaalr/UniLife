const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");  // Vi vill använda Mongoose för att prata med MongoDB
require("dotenv").config();

// Use a local secret if no .env file exists
process.env.JWT_SECRET =
    process.env.JWT_SECRET || "unilife-local-development-secret";

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/unilife";

//Allow requests from React
app.use(cors());

//Allow JSON data
app.use(express.json());

//Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

//Connect to MongoDB
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB database:", mongoose.connection.name);
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

//Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});