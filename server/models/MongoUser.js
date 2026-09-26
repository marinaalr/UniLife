const mongoose = require("mongoose");

// Create a schema that describes how a user is stored in MongoDB
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String,
        default: ""
    },

    university: {
        type: String,
        default: ""
    },

    program: {
        type: String,
        default: ""
    },

    yearOfStudy: {
        type: String,
        default: ""
    },

    bio: {
        type: String,
        default: ""
    }
});

const MongoUser = mongoose.model("User", userSchema);

module.exports = MongoUser;