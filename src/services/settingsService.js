// Settings service.
// This service communicates with the backend password API.

const changePassword = async (
    token,
    currentPassword,
    newPassword,
) => {
    // Send the password change request to the backend.
    const response = await fetch(
        "http://localhost:5000/api/auth/password",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                currentPassword,
                newPassword,
            }),
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

export default changePassword;