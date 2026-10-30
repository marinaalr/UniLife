const getEvents = async (token) => {
    // Get The Users Events From The Backend
    const response = await fetch(
        "http://localhost:5000/api/events",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    const data = await response.json();

    return {
        response,
        data,
    };
};

const saveEvents = async (token, events) => {
    // Save The Users Events To The Backend
    const response = await fetch(
        "http://localhost:5000/api/events",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                events,
            }),
        },
    );

    // Convert The Server Response From JSON
    const data = await response.json();

    // Return Response And Data
    return {
        response,
        data,
    };
};

export {
    getEvents,
    saveEvents,
};