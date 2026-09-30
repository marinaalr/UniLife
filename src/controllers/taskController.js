// Task controller.
// This controller handles the task operations
// between the TasksPage and the task service.

import {
    getTasks,
    saveTasks,
} from "../services/taskService";


// Load the logged in user's tasks.
const loadTasks = async () => {
    const token = localStorage.getItem("token");

    try {
        // Ask the service to get the tasks from the backend.
        const { response, data } = await getTasks(token);

        if (!response.ok) {
            return {
                success: false,
                data: null,
            };
        }

        return {
            success: true,
            data,
        };
    } catch {
        return {
            success: false,
            data: null,
        };
    }
};


// Save the logged in user's tasks.
const saveUserTasks = async (lists) => {
    const token = localStorage.getItem("token");

    try {
        // Ask the service to save the tasks to the backend.
        const { response, data } = await saveTasks(
            token,
            lists,
        );

        return {
            success: response.ok,
            data,
        };
    } catch {
        return {
            success: false,
            data: null,
        };
    }
};


export {
    loadTasks,
    saveUserTasks,
};