// Signup service.
// This service communicates with the backend registration API.

const registerUser = async (
    name,
    username,
    email,
    password,
) => {
    // Send the registration information to the backend.
    const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                username,
                email,
                password,
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

export default registerUser;