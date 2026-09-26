const mongoose = require("mongoose");

// Describe one task
const taskSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    description: String,
    deadline: String,
    priority: String,
    completed: Boolean,
  },
  {
    _id: false,
  },
);

// Describe one task list
const listSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    tasks: [taskSchema],
  },
  {
    _id: false,
  },
);

// Store all task lists that belong to one user
const userTasksSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },

  lists: {
    type: [listSchema],
    default: [],
  },
});

// Create the MongoDB model
const MongoTask = mongoose.model("Task", userTasksSchema);

module.exports = MongoTask;