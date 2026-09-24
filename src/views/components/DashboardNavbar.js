import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Badge
} from "@mui/material";
import {
    Notifications as NotificationsIcon,
    AccountCircle as AccountCircleIcon
} from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";

function DashboardNavbar() {
    // Store the element that opens the notifications menu.
    const [notificationAnchor, setNotificationAnchor] = useState(null);

    // Store the element that opens the profile menu.
    const [profileAnchor, setProfileAnchor] = useState(null);

    // Open the notifications menu.
    const openNotifications = (event) => {
        setNotificationAnchor(event.currentTarget);
    };

    // Close the notifications menu.
    const closeNotifications = () => {
        setNotificationAnchor(null);
    };

    // Open the profile menu.
    const openProfile = (event) => {
        setProfileAnchor(event.currentTarget);
    };

    // Close the profile menu.
    const closeProfile = () => {
        setProfileAnchor(null);
    };

    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("profile");
        history.push("/login");
    };

    return (
        <AppBar position="static">
            <Toolbar>

                {/* UniLife logo/name */}
                <Typography
                    variant="h6"
                    sx={{
                        marginRight: 4,
                        fontFamily: 'Georgia, "Times New Roman", serif'
                    }}
                >
                    UniLife
                </Typography>

                {/* Navigation links for the logged-in area */}
                <Button
                    color="inherit"
                    component={Link}
                    to="/dashboard"
                >
                    Dashboard
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/events"
                >
                    Events
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/tasks"
                >
                    Tasks
                </Button>

                {/* Notifications and profile */}
                <Box
                    sx={{
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    {/* Notifications button */}
                    <IconButton
                        color="inherit"
                        onClick={openNotifications}
                        aria-label="Notifications"
                    >
                        <Badge
                            badgeContent={0}
                            color="error"
                        >
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    <Menu
                        anchorEl={notificationAnchor}
                        open={Boolean(notificationAnchor)}
                        onClose={closeNotifications}
                    >
                        <MenuItem onClick={closeNotifications}>
                            No new notifications
                        </MenuItem>
                    </Menu>

                    {/* Profile button */}
                    <IconButton
                        color="inherit"
                        onClick={openProfile}
                        aria-label="Profile"
                    >
                        <AccountCircleIcon />
                    </IconButton>

                    <Typography
                        component="span"
                        sx={{
                            marginLeft: 1,
                            fontSize: 15
                        }}
                    >
                        Profile
                    </Typography>

                    <Menu
                        anchorEl={profileAnchor}
                        open={Boolean(profileAnchor)}
                        onClose={closeProfile}
                    >
                        <MenuItem 
                            component={Link}
                            to="/profile"
                            onClick={closeProfile}
                        >
                            Profile
                        </MenuItem>

                        <MenuItem onClick={closeProfile}>
                            Settings
                        </MenuItem>

                        <MenuItem onClick={handleLogout}>
                            Log out
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default DashboardNavbar;