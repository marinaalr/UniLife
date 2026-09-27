const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");  // Vi vill använda Mongoose för att prata med MongoDB
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

//Allow requests from React
app.use(cors());

//Allow JSON data
app.use(express.json());

//Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

//Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
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