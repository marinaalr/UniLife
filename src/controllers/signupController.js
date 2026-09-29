// Signup controller.
// This controller handles user registration between the Signup view and the signup service.

import registerUser from "../services/signupService";


// Register a new user.
const signupController = async (
    name,
    username,
    email,
    password,
) => {
    try {
        // Ask the service to register the user.
        const { response, data } = await registerUser(
            name,
            username,
            email,
            password,
        );

        if (!response.ok) {
            return {
                success: false,
                message: data.message,
            };
        }

        return {
            success: true,
            message: "Account created successfully.",
        };
    } catch {
        return {
            success: false,
            message: "Could not connect to the server.",
        };
    }
};


export default signupController;