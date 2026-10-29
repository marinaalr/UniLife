// Task controller.
// This controller handles the task operations
// between the TasksPage and the task service.


//na deiksw sthn parousiash
import {
    getTasks,
    saveTasks,
} from "../services/taskService";


// Load the logged in user's tasks.
//token proff that the user is logged in 
const loadTasks = async () => {
    const token = localStorage.getItem("token");

    try {
        // Ask the service to get the tasks from the backend.
        //na deiksw sthn parousiash 
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
const saveUserTasks = async (tasks) => {
    const token = localStorage.getItem("token");

    try {
        // Ask the service to save the tasks to the backend.
        const { response, data } = await saveTasks(
            token,
            tasks,
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