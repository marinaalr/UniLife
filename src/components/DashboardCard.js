import React from "react";
import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

function DashboardCard({ title, count, message }) {
    return (
        <Card
           className="overview-card"
           elevation={2}
        >
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

                <Typography className="empty-text">
                    {message}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default DashboardCard;