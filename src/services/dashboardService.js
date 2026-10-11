// Denna service ansvarar för kommunikationen med backend
// när Dashboard behöver hämta användarens uppgifter.

// Hämtar uppgifter för den inloggade användaren.
const getDashboardTasks = async (token) => {
    // Skickar en GET-förfrågan till backend för att hämta uppgifterna.
    const response = await fetch("http://localhost:5000/api/tasks", {
        headers: {
            // Skickar token så att servern kan kontrollera användarens behörighet.
            Authorization: `Bearer ${token}`,
        },
    });

    // Omvandlar serverns JSON-svar till JavaScript-data.
    const data = await response.json();

    // Returnerar både svaret och datan till controllern.
    return {
        response,
        data,
    };
};

// Exporterar funktionen så att controllern kan använda den.
export default getDashboardTasks;