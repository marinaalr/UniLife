// Login service.
// This service communicates with the backend login API.
const loginService = async (identifier, password) => {

    // Send the login information to the backend.
    const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
            method: "POST",

            // Tell the server that we are sending JSON data.
            headers: {
                "Content-Type": "application/json",
            },

            // Send the username/email and password.
            body: JSON.stringify({
                identifier,
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

export default loginService;