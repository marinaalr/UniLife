const MongoTask = require("../models/MongoTask");
const MongoNotification = require("../models/MongoNotification");

// Get the logged in user's tasks
const getTasks = async (req, res) => {
    try {
        const userTasks = await MongoTask.findOne({
            userId: req.user.id,
        });

        res.json({
            tasks: userTasks ? userTasks.tasks : [],
        });
    } catch {
        res.status(500).json({
            message: "Server error.",
        });
    }
};

// Save the logged in user's tasks
const saveTasks = async (req, res) => {
    try {
        const { tasks } = req.body;

        if (!Array.isArray(tasks)) {
            return res.status(400).json({
                message: "Invalid task data.",
            });
        }

        // Save the tasks
        const savedTasks = await MongoTask.findOneAndUpdate(
            {
                userId: req.user.id,
            },
            {
                userId: req.user.id,
                tasks: tasks,
            },
            {
                new: true,
                upsert: true,
            },
        );

        // Get all current task IDs
        const currentTaskIds = tasks.map((task) => task.id);

        // Remove notifications for tasks that no longer exist
        await MongoNotification.deleteMany({
            userId: req.user.id,
            type: "task_deadline",
            taskId: {
                $nin: currentTaskIds,
            },
        });

        // Calculate today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Calculate the date five days from now
        const fiveDaysFromNow = new Date(today);
        fiveDaysFromNow.setDate(today.getDate() + 5);

        // Create, update or remove deadline notifications
        for (const task of tasks) {

            // Completed tasks and tasks without deadlines
            // should not have deadline notifications
            if (task.completed || !task.deadline) {
                await MongoNotification.deleteMany({
                    userId: req.user.id,
                    type: "task_deadline",
                    taskId: task.id,
                });

                continue;
            }

            const deadlineDate = new Date(`${task.deadline}T00:00:00`);

            // Remove notifications outside the five-day window
            if (deadlineDate < today || deadlineDate > fiveDaysFromNow) {
                await MongoNotification.deleteMany({
                    userId: req.user.id,
                    type: "task_deadline",
                    taskId: task.id,
                });

                continue;
            }

            // Calculate how many days remain
            const difference = deadlineDate - today;

            const daysLeft = Math.round(
                difference / (1000 * 60 * 60 * 24),
            );

            // Create notification message
            let message;

            if (daysLeft === 0) {
                message = `Task "${task.title}" is due today.`;
            } else if (daysLeft === 1) {
                message = `Task "${task.title}" is due tomorrow.`;
            } else {
                message = `Task "${task.title}" is due in ${daysLeft} days.`;
            }

            // Check if notification already exists
            const existingNotification =
                await MongoNotification.findOne({
                    userId: req.user.id,
                    type: "task_deadline",
                    taskId: task.id,
                });

            if (!existingNotification) {

                // Create notification
                await MongoNotification.create({
                    userId: req.user.id,
                    message,
                    type: "task_deadline",
                    taskId: task.id,
                    deadline: task.deadline,
                    read: false,
                });

            } else {

                // Check if deadline changed
                const deadlineChanged =
                    existingNotification.deadline !== task.deadline;

                // Update notification
                existingNotification.message = message;
                existingNotification.deadline = task.deadline;

                if (deadlineChanged) {
                    existingNotification.read = false;
                }

                await existingNotification.save();
            }
        }

        res.json({
            message: "Tasks saved successfully.",
            tasks: savedTasks.tasks,
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