const MongoTask = require("../models/MongoTask");

// Get the logged in user's task lists
const getTasks = async (req, res) => {
  try {
    const userTasks = await MongoTask.findOne({
      userId: req.user.id,
    });

    res.json({
      lists: userTasks ? userTasks.lists : [],
    });
  } catch {
    res.status(500).json({
      message: "Server error.",
    });
  }
};

// Save the logged in user's task lists
const saveTasks = async (req, res) => {
  try {
    const { lists } = req.body;

    if (!Array.isArray(lists)) {
      return res.status(400).json({
        message: "Invalid task data.",
      });
    }

    const savedTasks = await MongoTask.findOneAndUpdate(
      {
        userId: req.user.id,
      },
      {
        userId: req.user.id,
        lists: lists,
      },
      {
        new: true,
        upsert: true,
      },
    );

    res.json({
      message: "Tasks saved successfully.",
      lists: savedTasks.lists,
    });
  } catch {
    res.status(500).json({
      message: "Server error.",
    });
  }
};

module.exports = {
  getTasks,
  saveTasks,
};
