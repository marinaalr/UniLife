import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import DashboardNavbar from "./components/DashboardNavbar";
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
        "December"
    ];

    // Find the weekday of the first day of the selected month.
    const firstDayOfMonth = new Date(
        year,
        month,
        1
    ).getDay();

    // Find how many days the selected month contains.
    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();

    // Convert the calendar to start with Monday instead of Sunday.
    const startingDay =
        firstDayOfMonth === 0
            ? 6
            : firstDayOfMonth - 1;

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

    // Move to the previous month.
    const previousMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    // Move to the next month.
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

        setSelectedDay(day);
        setDayDialogOpen(true);
    };

    // Close the selected day dialog.
    const closeDayDetails = () => {
        setDayDialogOpen(false);
        setSelectedDay(null);
    };

    return (
        <Box className="dashboard-page">
            <DashboardNavbar />

            <Box className="dashboard-content">

                {/* Introduction to the personal dashboard. */}
                <Box className="dashboard-introduction">
                    <Typography
                        variant="h3"
                        component="h1"
                        className="dashboard-title"
                    >
                        Personal Dashboard
                    </Typography>

                    <Typography className="dashboard-subtitle">
                        Your personal overview of events,
                        tasks and deadlines.
                    </Typography>
                </Box>

                {/* Main personal calendar. */}
                <Card
                    className="calendar-card"
                    elevation={2}
                >
                    <CardContent>

                        {/* Calendar heading. */}
                        <Box className="calendar-header">
                            <Typography
                                variant="h5"
                                className="calendar-title"
                            >
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
                            {[
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                                "Sun"
                            ].map((day) => (
                                <Typography
                                    key={day}
                                    className="calendar-weekday"
                                >
                                    {day}
                                </Typography>
                            ))}
                        </Box>

                        {/* Empty calendar.
                            Events and tasks can later be displayed
                            here using data from the other project features. */}
                        <Box className="calendar-grid">
                            {calendarDays.map((day, index) => (
                                <Button
                                    key={index}
                                    className={
                                        day
                                            ? "calendar-day"
                                            : "calendar-day empty"
                                    }
                                    onClick={() =>
                                        openDayDetails(day)
                                    }
                                    disabled={!day}
                                >
                                    {day && (
                                        <Typography className="day-number">
                                            {day}
                                        </Typography>
                                    )}
                                </Button>
                            ))}
                        </Box>
                    </CardContent>
                </Card>

                {/* Dashboard overview sections.
                    These will later display data from the corresponding
                    features developed by the other team members. */}
                <Box className="dashboard-overview">

                    {/* Upcoming events from Event Management. */}
                    <Card
                        className="overview-card"
                        elevation={2}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                className="overview-title"
                            >
                                Upcoming Events
                            </Typography>

                            <Typography className="empty-text">
                                No upcoming events.
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* Joined events from Event Management. */}
                    <Card
                        className="overview-card"
                        elevation={2}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                className="overview-title"
                            >
                                Joined Events
                            </Typography>

                            <Typography className="empty-text">
                                No joined events.
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* Pending tasks from Task Management. */}
                    <Card
                        className="overview-card"
                        elevation={2}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                className="overview-title"
                            >
                                Pending Tasks
                            </Typography>

                            <Typography className="empty-text">
                                No pending tasks.
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* Approaching deadlines from Task Management. */}
                    <Card
                        className="overview-card"
                        elevation={2}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                className="overview-title"
                            >
                                Approaching Deadlines
                            </Typography>

                            <Typography className="empty-text">
                                No approaching deadlines.
                            </Typography>
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
                    {selectedDay
                        ? `${monthNames[month]} ${selectedDay}, ${year}`
                        : ""}
                </DialogTitle>

                <DialogContent>
                    <Typography className="day-dialog-text">
                        No events or tasks are scheduled for this day.
                    </Typography>

                    <Typography className="day-dialog-text">
                        Events and tasks will appear here when
                        available.
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDayDetails}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Dashboard;