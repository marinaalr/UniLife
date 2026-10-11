import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import DashboardNavbar from "./components/DashboardNavbar";
import DashboardCard from "../components/DashboardCard";

import "./Dashboard.css";

function Dashboard() {
  // Get the current date to open the calendar on the current month.
  const today = new Date();

  // Store the month and year currently displayed in the calendar.
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  // Store the calendar day selected by the user.
  const [selectedDay, setSelectedDay] = useState(null);

  // Control whether the selected day dialog is open.
  const [dayDialogOpen, setDayDialogOpen] = useState(false);

  // Store the tasks loaded for the logged in user
  const [tasks, setTasks] = useState([]);

  // Load the logged in user's tasks from the server
  useEffect(() => {
    async function loadTasks() {
      // Hämtar inloggningstoken som används för att iden. användaren
      const token = localStorage.getItem("token");

      try {
        //Skickar en förfrågan till serverns API för att hämta uppg.
        const response = await fetch("http://localhost:5000/api/tasks", {
          headers: {
            //Skickar token så att servern kan kontrollera behörighet
            Authorization: `Bearer ${token}`,
          },
        });

        //Omvandlar servern svar till Javascript data
        const data = await response.json();

        if (response.ok) {
          setTasks(data.tasks || []);
        }
      } catch {
        console.log("Could not load tasks.");
      }
    }

    loadTasks();
  }, []);

  // Keep only tasks that are not completed
  const pendingTasks = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => {
      //Uppg uatn deadline placeras sist i listan
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;

      //Jämför datumen för att sortera uppgifterna i datumordning
      return a.deadline.localeCompare(b.deadline);
    });


  // Find pending tasks with a deadline within the next 5 days.
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  //Beräknar datumet 5 dagar framåt
  const fiveDaysFromNow = new Date(todayStart);
  fiveDaysFromNow.setDate(todayStart.getDate() + 5);

  //Filterar fram uppg. som har en deadline inom de kommande fem dagar
  const approachingDeadlines = pendingTasks.filter((task) => {
    //Hoppa över uppg som saknar deadline
    if (!task.deadline) {
      return false;
    }

    // Omvandlar uppg deadline till ett datumonjekt
    const deadlineDate = new Date(`${task.deadline}T00:00:00`);

    //Behåller endast deadlines mellan idag och fem dagar framåt
    return deadlineDate >= todayStart && deadlineDate <= fiveDaysFromNow;
  });

  // Calculate how many days are left until the deadline.
  function getDaysLeft(deadline) {
    const deadlineDate = new Date(`${deadline}T00:00:00`);
    //Beräknar skillnaden i millisekunder mellan datumen
    const difference = deadlineDate - todayStart;

    //Omvandlar millisekunder till hela dagar
    return Math.round(difference / (1000 * 60 * 60 * 24));
  }

  // Names of the months used when displaying the calendar.
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Find the weekday of the first day of the selected month.
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Find how many days the selected month contains.
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Convert the calendar to start with Monday instead of Sunday.
  const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Create the calendar cells.
  const calendarDays = [];

  // Add empty cells before the first day of the month.
  for (let index = 0; index < startingDay; index++) {
    calendarDays.push(null);
  }

  // Add all days of the selected month.
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Move to the previous month. (ena if satsen för jan-dec)
  const previousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  // Move to the next month. (ena if satsen för dec-jan)
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  // Open the details dialog for the selected calendar day.
  const openDayDetails = (day) => {
    if (!day) {
      return;
    }

    //Sparar den valda dagen och öppnar dialogrutan
    setSelectedDay(day);
    setDayDialogOpen(true);
  };

  // Close the selected day dialog.
  const closeDayDetails = () => {
    setDayDialogOpen(false);
    setSelectedDay(null);
  };

  // Check whether a calendar day is today.
  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Get all tasks that have a deadline on a specific calendar day.
  const getTasksForDay = (day) => {
    //Skapar ett datum i formuläret (ÅÅÅÅ-MM-DD)
    const calendarDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    //Returnerar uppgifter vars deadline matchar kalenderdatumet
    return tasks.filter((task) => task.deadline === calendarDate);
  };

  return (
    <Box className="dashboard-page">
      <DashboardNavbar />

      <Box className="dashboard-content">
        {/* Introduction to the personal dashboard. */}
        <Box className="dashboard-introduction">
          <Typography variant="h3" component="h1" className="dashboard-title">
            Personal Dashboard
          </Typography>

          <Typography className="dashboard-subtitle">
            Your personal overview of events, tasks and deadlines.
          </Typography>
        </Box>

        {/* Main personal calendar. */}
        <Card className="calendar-card" elevation={2}>
          <CardContent>
            {/* Calendar heading. */}
            <Box className="calendar-header">
              <Typography variant="h5" className="calendar-title">
                {monthNames[month]} {year}
              </Typography>

              <Typography className="calendar-description">
                Your personal calendar
              </Typography>
            </Box>

            {/* Buttons for changing month. */}
            <Box className="calendar-navigation">
              <Button
                variant="outlined"
                onClick={previousMonth}
                aria-label="Previous month"
              >
                &lt;
              </Button>

              <Button
                variant="outlined"
                onClick={nextMonth}
                aria-label="Next month"
              >
                &gt;
              </Button>
            </Box>

            {/* Weekday headings. */}
            <Box className="calendar-weekdays">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day) => (
                  <Typography key={day} className="calendar-weekday">
                    {day}
                  </Typography>
                ),
              )}
            </Box>

            {/* Calendar days. */}
            <Box className="calendar-grid">
              {calendarDays.map((day, index) => (
                <Button
                  key={index}
                  className={
                    day
                      ? isToday(day)
                        ? "calendar-day today"
                        : "calendar-day"
                      : "calendar-day empty"
                  }
                  onClick={() => openDayDetails(day)}
                  disabled={!day}
                >
                  {day && (
                    <>
                      <Typography className="day-number">{day}</Typography>

                      {getTasksForDay(day).map((task) => (
                        <Typography key={task.id} className="calendar-task">
                          {task.title}
                        </Typography>
                      ))}
                    </>
                  )}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Dashboard overview sections. */}
        <Box className="dashboard-overview">
          {/* Upcoming events from Event Management. */}
          <DashboardCard
            title="Upcoming Events"
            count={0}
            message="No upcoming events yet."
          />

          {/* Joined events from Event Management. */}
          <DashboardCard
            title="Joined Events"
            count={0}
            message="No joined events yet."
          />

          {/* Pending tasks from Task Management. */}
          <Card className="overview-card" elevation={2}>
            <CardContent>
              <Typography variant="h6" className="overview-title">
                Pending Tasks
              </Typography>

              <Typography variant="h4" className="overview-count">
                {pendingTasks.length}
              </Typography>

              {pendingTasks.length === 0 ? (
                <Typography className="empty-text">
                  No pending tasks yet.
                </Typography>
              ) : (
                <Box className="pending-task-list">
                  {pendingTasks.map((task) => (
                    <Box key={task.id} className="pending-task-item">
                      <Typography className="pending-task-title">
                        {task.title}
                      </Typography>

                      <Box className="pending-task-meta">
                        <Typography className="pending-task-list-name">
                          List: {task.listName}
                        </Typography>

                        <Typography className="pending-task-deadline">
                          {task.deadline
                            ? `Due ${task.deadline}`
                            : "No deadline"}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Tasks with a deadline within the next 5 days. */}
          <Card className="overview-card" elevation={2}>
            <CardContent>
              <Typography variant="h6" className="overview-title">
                Approaching Deadlines
              </Typography>

              <Typography variant="h4" className="overview-count">
                {approachingDeadlines.length}
              </Typography>

              {approachingDeadlines.length === 0 ? (
                <Typography className="empty-text">
                  No approaching deadlines.
                </Typography>
              ) : (
                <Box className="pending-task-list">
                  {approachingDeadlines.map((task) => (
                    <Box key={task.id} className="pending-task-item">
                      {/* Task title and remaining days. */}
                      <Box className="approaching-task-header">
                        <Typography className="pending-task-title">
                          {task.title}
                        </Typography>

                        <Typography
                          className={`days-left-badge ${getDaysLeft(task.deadline) <= 1
                              ? "days-left-urgent"
                              : getDaysLeft(task.deadline) <= 3
                                ? "days-left-soon"
                                : "days-left-normal"
                            }`}
                        >
                          {getDaysLeft(task.deadline) === 0
                            ? "Due today"
                            : getDaysLeft(task.deadline) === 1
                              ? "1 day left"
                              : `${getDaysLeft(task.deadline)} days left`}
                        </Typography>
                      </Box>

                      {/* List name and exact deadline. */}
                      <Box className="pending-task-meta">
                        <Typography className="pending-task-list-name">
                          List: {task.listName}
                        </Typography>

                        <Typography className="pending-task-deadline">
                          Due {task.deadline}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Show details for the selected calendar day. */}
      <Dialog
        open={dayDialogOpen}
        onClose={closeDayDetails}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedDay ? `${monthNames[month]} ${selectedDay}, ${year}` : ""}
        </DialogTitle>

        <DialogContent>
          {/* Events belonging to the selected day. */}
          <Typography variant="h6" className="dialog-section-title">
            Events
          </Typography>

          <Typography className="day-dialog-text">
            No events scheduled for this day.
          </Typography>

          <Divider />

          {/* Tasks belonging to the selected day. */}
          <Typography variant="h6" className="dialog-section-title">
            Tasks
          </Typography>

          {selectedDay && getTasksForDay(selectedDay).length > 0 ? (
            <Box className="pending-task-list">
              {getTasksForDay(selectedDay).map((task) => (
                <Box key={task.id} className="pending-task-item">
                  <Typography className="pending-task-title">
                    {task.title}
                  </Typography>

                  <Box className="pending-task-meta">
                    <Typography className="pending-task-list-name">
                      List: {task.listName}
                    </Typography>

                    <Typography className="pending-task-deadline">
                      Due {task.deadline}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography className="day-dialog-text">
              No tasks scheduled for this day.
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDayDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Dashboard;