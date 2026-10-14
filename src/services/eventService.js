const getEvents = async (token) => {
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

    const data = await response.json();

    return {
        response,
        data,
    };
};

export {
    getEvents,
    saveEvents,
};