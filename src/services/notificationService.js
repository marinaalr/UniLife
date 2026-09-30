// Notification service.
// This service communicates with the backend notification API.


const getNotifications = async (token) => {
    // Get the logged in user's notifications.
    const response = await fetch(
        "http://localhost:5000/api/notifications",
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


const markNotificationAsRead = async (
    token,
    notificationId,
) => {
    // Tell the backend that the notification has been read.
    const response = await fetch(
        `http://localhost:5000/api/notifications/${notificationId}/read`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
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
    getNotifications,
    markNotificationAsRead,
};