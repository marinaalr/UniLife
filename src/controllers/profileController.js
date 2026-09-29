// Profile controller.
// This controller handles profile updates
// between the Profile view and the profile service.

import updateProfile from "../services/profileService";


// Save the user's profile.
const saveProfile = async (profileData) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return {
            success: false,
            message: "You are not logged in.",
            user: null,
        };
    }

    try {
        // Ask the service to update the profile.
        const { response, data } = await updateProfile(
            token,
            profileData,
        );

        if (!response.ok) {
            return {
                success: false,
                message: data.message,
                user: null,
            };
        }

        return {
            success: true,
            message: "",
            user: data.user,
        };
    } catch {
        return {
            success: false,
            message: "Could not connect to the server.",
            user: null,
        };
    }
};


export default saveProfile;