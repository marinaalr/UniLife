import {
    getEvents,
    saveEvents,
} from "../services/eventService";

const loadEvents = async () => {
    const token = localStorage.getItem("token");

    try {
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

const saveUserEvents = async (events) => {
    const token = localStorage.getItem("token");

    try {
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