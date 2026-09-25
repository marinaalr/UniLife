const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

//Allow requests from React
app.use(cors());

//Allow JSON data
app.use(express.json());

//Authentication routes
app.use("/api/auth", authRoutes);

//Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});