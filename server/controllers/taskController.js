const MongoTask = require("../models/MongoTask");
const MongoNotification = require("../models/MongoNotification");

// Get the logged in user's task lists.
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

// Save the logged in user's task lists.
const saveTasks = async (req, res) => {
    try {
        const { lists } = req.body;

        if (!Array.isArray(lists)) {
            return res.status(400).json({
                message: "Invalid task data.",
            });
        }

        // Save the task lists.
        const savedTasks = await MongoTask.findOneAndUpdate(
            {
                userId: req.user.id,
            },
            {
                userId: req.user.id,
                lists: lists,
            },
            {
                returnDocument: "after",
                upsert: true,
            },
        );

        // Collect all current tasks.
        const currentTasks = lists.flatMap((list) => list.tasks);

        // Remove notifications for tasks that no longer exist.
        const currentTaskIds = currentTasks.map((task) => task.id);

        await MongoNotification.deleteMany({
            userId: req.user.id,
            type: "task_deadline",
            taskId: {
                $nin: currentTaskIds,
            },
        });

        // Calculate today's date and the date five days from now.
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const fiveDaysFromNow = new Date(today);
        fiveDaysFromNow.setDate(today.getDate() + 5);

        // Create, update or remove deadline notifications.
        for (const task of currentTasks) {
            // Completed tasks and tasks without deadlines
            // should not have deadline notifications.
            if (task.completed || !task.deadline) {
                await MongoNotification.deleteMany({
                    userId: req.user.id,
                    type: "task_deadline",
                    taskId: task.id,
                });

                continue;
            }

            const deadlineDate = new Date(`${task.deadline}T00:00:00`);

            // Remove notifications for deadlines outside
            // the five-day notification window.
            if (deadlineDate < today || deadlineDate > fiveDaysFromNow) {
                await MongoNotification.deleteMany({
                    userId: req.user.id,
                    type: "task_deadline",
                    taskId: task.id,
                });

                continue;
            }

            // Calculate how many days remain.
            const difference = deadlineDate - today;

            const daysLeft = Math.round(
                difference / (1000 * 60 * 60 * 24),
            );

            // Create the notification message.
            let message;

            if (daysLeft === 0) {
                message = `Task "${task.title}" is due today.`;
            } else if (daysLeft === 1) {
                message = `Task "${task.title}" is due tomorrow.`;
            } else {
                message = `Task "${task.title}" is due in ${daysLeft} days.`;
            }

            // Check whether a notification already exists.
            const existingNotification =
                await MongoNotification.findOne({
                    userId: req.user.id,
                    type: "task_deadline",
                    taskId: task.id,
                });

            if (!existingNotification) {
                // Create a new notification.
                await MongoNotification.create({
                    userId: req.user.id,
                    message,
                    type: "task_deadline",
                    taskId: task.id,
                    deadline: task.deadline,
                    read: false,
                });
            } else {
                // Update the notification.
                // Keep it read if the deadline has not changed.
                const deadlineChanged =
                    existingNotification.deadline !== task.deadline;

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