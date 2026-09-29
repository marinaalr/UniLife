// Settings controller.
// This controller handles password changes
// between the Settings view and the settings service.

import changePassword from "../services/settingsService";


// Change the user's password.
const updatePassword = async (
    currentPassword,
    newPassword,
) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return {
            success: false,
            message: "You are not logged in.",
        };
    }

    try {
        // Ask the service to change the password.
        const { response, data } = await changePassword(
            token,
            currentPassword,
            newPassword,
        );

        if (!response.ok) {
            return {
                success: false,
                message: data.message,
            };
        }

        return {
            success: true,
            message: data.message,
        };
    } catch {
        return {
            success: false,
            message: "Could not connect to the server.",
        };
    }
};


export default updatePassword;