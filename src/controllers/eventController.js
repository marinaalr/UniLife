import {
    getEvents,
    saveEvents,
} from "../services/eventService";

// Load User Events
const loadEvents = async () => {
    const token = localStorage.getItem("token");

    try {
        // Ask The Service To Get The Events From The Backend
        const {response, data} = await getEvents(token);

        if (!response.ok) {
            return {
                success: false,
                data: null,
            };
        }

        return {
            success: true,
            data,
        };
    } catch {
        return {
            success: false,
            data: null,
        };
    }
};

// Save User Events
const saveUserEvents = async (events) => {
    const token = localStorage.getItem("token");

    try {
        // Ask The Service To Save The Events To The Backend
        const {response, data} = await saveEvents(
            token,
            events,
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
    loadEvents,
    saveUserEvents,
};