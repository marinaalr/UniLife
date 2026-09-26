const fs = require("fs");
const path = require("path");

// Path to the task data file
const tasksFile = path.join(__dirname, "../data/tasks.json");

// Read all task data
const getTaskData = () => {
    const data = fs.readFileSync(tasksFile, "utf8");
    return JSON.parse(data);
};

// Save all task data
const saveTaskData = (taskData) => {
    fs.writeFileSync(
        tasksFile,
        JSON.stringify(taskData, null, 2)
    );
};

// Get the lists that belong to one user
const getListsByUserId = (userId) => {
    const taskData = getTaskData();

    const userTasks = taskData.find(
        (item) => item.userId === userId
    );

    if (!userTasks) {
        return [];
    }

    return userTasks.lists;
};

// Save the lists that belong to one user
const saveListsForUser = (userId, lists) => {
    const taskData = getTaskData();

    const userIndex = taskData.findIndex(
        (item) => item.userId === userId
    );

    if (userIndex === -1) {
        taskData.push({
            userId: userId,
            lists: lists
        });
    } else {
        taskData[userIndex].lists = lists;
    }

    saveTaskData(taskData);

    return lists;
};

module.exports = {
    getListsByUserId,
    saveListsForUser
};