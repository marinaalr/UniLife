// Dashboard-controller.
// Denna controller hanterar kommunikationen mellan Dashboard-vyn
// och servicen samt bearbetar uppgifterna som ska visas.

// Importerar servicen som hämtar uppgifter från backend.
import {
    getDashboardTasks,
    getDashboardEvents,
}from "../services/dashboardService";

// Hämtar uppgifterna som ska visas på Dashboard.
const loadDashboardTasks = async () => {
    // Hämtar token som identifierar den inloggade användaren.
    const token = localStorage.getItem("token");

    // Kontrollerar att användaren är inloggad.
    if (!token) {
        return {
            success: false,
            message: "You are not logged in.",
            tasks: [],
        };
    }

    try {
        // Anropar servicen för att hämta uppgifterna.
        const { response, data } = await getDashboardTasks(token);

        // Kontrollerar om servern kunde hämta uppgifterna.
        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Could not load dashboard tasks.",
                tasks: [],
            };
        }

        // Returnerar uppgifterna till vyn.
        return {
            success: true,
            message: "",
            tasks: Array.isArray(data.tasks) ? data.tasks : [],
        };
    } catch {
        // Hanterar fel om servern inte kan nås.
        return {
            success: false,
            message: "Could not connect to the server.",
            tasks: [],
        };
    }
};

const loadDashboardEvents = async () => {
    // Hämtar token som identifierar den inloggade användaren.
    const token = localStorage.getItem("token");

    // Kontrollerar att användaren är inloggad.
    if (!token) {
        return {
            success: false,
            message: "You are not logged in.",
            events: [],
        };
    }

    try {
        // Anropar servicen för att hämta uppgifterna.
        const { response, data } = await getDashboardEvents(token);

        // Kontrollerar om servern kunde hämta uppgifterna.
        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Could not load dashboard tasks.",
                events: [],
            };
        }

        // Returnerar uppgifterna till vyn.
        return {
            success: true,
            message: "",
            events: Array.isArray(data.events) ? data.events : [],
        };
    } catch {
        // Hanterar fel om servern inte kan nås.
        return {
            success: false,
            message: "Could not connect to the server.",
            events: [],
        };
    }
};

// Filtrerar fram uppgifter som inte är färdiga och sorterar dem efter deadline.
const getPendingTasks = (tasks) => {
    return tasks
        .filter((task) => !task.completed)
        .sort((firstTask, secondTask) => {
            // Uppgifter utan deadline placeras sist.
            if (!firstTask.deadline) return 1;
            if (!secondTask.deadline) return -1;

            // Sorterar uppgifterna efter datum.
            return firstTask.deadline.localeCompare(secondTask.deadline);
        });
};


const getPendingEvents = (events) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events
        .filter((event) => {
            if (!event.date) {
                return false;
            }

            const eventDate = new Date(`${event.date}T00:00:00`);
            return eventDate >= today;
        })
        .sort((firstEvent, secondEvent) =>
            firstEvent.date.localeCompare(secondEvent.date)
        );
};


// Filtrerar fram uppgifter med deadline inom de kommande fem dagarna.
const getApproachingDeadlines = (tasks) => {
    // Hämtar dagens datum och nollställer klockslaget.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Beräknar datumet fem dagar framåt.
    const fiveDaysFromNow = new Date(today);
    fiveDaysFromNow.setDate(today.getDate() + 5);

    // Filtrerar fram ofärdiga uppgifter med en deadline inom perioden.
    return getPendingTasks(tasks).filter((task) => {
        // Hoppar över uppgifter som saknar deadline.
        if (!task.deadline) {
            return false;
        }

        // Omvandlar uppgiftens deadline till ett datum.
        const deadlineDate = new Date(`${task.deadline}T00:00:00`);

        // Kontrollerar att deadlinen ligger mellan idag och fem dagar framåt.
        return deadlineDate >= today && deadlineDate <= fiveDaysFromNow;
    });
};

// Beräknar hur många dagar som återstår till en deadline.
const getDaysLeft = (deadline) => {
    // Hämtar dagens datum och nollställer klockslaget.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Beräknar skillnaden mellan deadline och dagens datum.
    const deadlineDate = new Date(`${deadline}T00:00:00`);
    const difference = deadlineDate - today;

    // Omvandlar millisekunder till dagar.
    return Math.round(difference / (1000 * 60 * 60 * 24));
};

// Exporterar funktionerna så att Dashboard-vyn kan använda dem.
export {
    loadDashboardTasks,
    loadDashboardEvents,
    getPendingTasks,
    getPendingEvents,
    getApproachingDeadlines,
    getDaysLeft,
};