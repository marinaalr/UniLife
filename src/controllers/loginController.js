import loginService from "../services/authService";

// Login controller.
// This controller handles the login process
// between the LoginForm and the login service.
const loginController = async (identifier, password) => {
    try {
        // Ask the service to communicate with the backend.
        const { response, data } = await loginService(
            identifier,
            password,
        );

        // Check if the login was unsuccessful.
        if (!response.ok) {
            return {
                success: false,
                message: data.message,
            };
        }

        // Save the login token.
        localStorage.setItem("token", data.token);

        // Save the user's profile information.
        localStorage.setItem(
            "profile",
            JSON.stringify(data.user),
        );

        // Tell the component that login was successful.
        return {
            success: true,
        };
    } catch {
        // Return an error if the server cannot be reached.
        return {
            success: false,
            message: "Could not connect to the server.",
        };
    }
};

export default loginController;