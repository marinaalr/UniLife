// Notification controller.
// This controller handles notification operations
// between the DashboardNavbar and the notification service.

import {
    getNotifications,
    markNotificationAsRead,
} from "../services/notificationService";


// Load the logged in user's notifications.
const loadNotifications = async () => {
    const token = localStorage.getItem("token");

    try {
        // Ask the service to get the notifications.
        const { response, data } = await getNotifications(token);

        if (!response.ok) {
            return {
                success: false,
                data: [],
            };
        }

        return {
            success: true,
            data,
        };
    } catch {
        return {
            success: false,
            data: [],
        };
    }
};


// Mark a notification as read.
const readNotification = async (notificationId) => {
    const token = localStorage.getItem("token");

    try {
        // Ask the service to mark the notification as read.
        const { response, data } =
            await markNotificationAsRead(
                token,
                notificationId,
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
    loadNotifications,
    readNotification,
};