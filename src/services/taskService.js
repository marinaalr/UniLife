// Task service.
// This service communicates with the backend task API.

const getTasks = async (token) => {
    // Get the logged in user's tasks from the backend.
    const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    // Convert the server response from JSON.
    const data = await response.json();

    // Return both the response and the data
    // so the controller can handle the result.
    return {
        response,
        data,
    };
};


const saveTasks = async (token, tasks) => {
    // Save the user's tasks to the backend.
    const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                tasks,
            }),
        },
    );

    // Convert the server response from JSON.
    const data = await response.json();

    // Return both the response and the data.
    return {
        response,
        data,
    };
};


export {
    getTasks,
    saveTasks,
};