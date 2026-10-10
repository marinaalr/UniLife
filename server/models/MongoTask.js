const mongoose = require("mongoose");

// Describe one task
const taskSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    description: String,
    deadline: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

// Store all tasks that belong to one user
const userTasksSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },

  tasks: {
    type: [taskSchema],
    default: [],
  },
});

// Create the MongoDB model
const MongoTask = mongoose.model("Task", userTasksSchema);

module.exports = MongoTask;