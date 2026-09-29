// Profile service.
// This service communicates with the backend profile API.

const updateProfile = async (token, profileData) => {
    // Send the updated profile information to the backend.
    const response = await fetch(
        "http://localhost:5000/api/auth/profile",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
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

export default updateProfile;