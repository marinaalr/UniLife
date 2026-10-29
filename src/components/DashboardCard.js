
import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";

function DashboardCard({ title, count, message, events = [] }) {
    return (
        <Card className="overview-card" elevation={2}>
            <CardContent>
                <Typography
                    variant="h6"
                    className="overview-title"
                >
                    {title}
                </Typography>

                <Typography
                    variant="h4"
                    className="overview-count"
                >
                    {count}
                </Typography>

                {events.length === 0 ? (
                    <Typography className="empty-text">
                        {message}
                    </Typography>
                ) : (
                    <Box className="pending-task-list">
                        {events.map((event) => (
                            <Box
                                key={event.id}
                                className="pending-task-item"
                            >
                                <Typography className="pending-task-title">
                                    {event.title}
                                </Typography>

                                <Typography className="pending-task-deadline">
                                    {event.date}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}

export default DashboardCard;
