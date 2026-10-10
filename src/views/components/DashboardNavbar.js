import React, { useCallback, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Divider,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { Link, useHistory, useLocation } from "react-router-dom";

import "./DashboardNavbar.css";

import {
  loadNotifications,
  readNotification
} from "../../controllers/notificationController";


function DashboardNavbar() {
  // Store the element that opens the notifications menu.
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  // Store the user's notifications.
  const [notifications, setNotifications] = useState([]);

  // Store the element that opens the profile menu.
  const [profileAnchor, setProfileAnchor] = useState(null);

  // Get notifications from the controller.
  const fetchNotifications = useCallback(async () => {
    const result = await loadNotifications();

    if (result.success) {
      setNotifications(result.data);
    }
  }, []);

  // Load notifications when the navbar is opened.
  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchNotifications]);

  // Open the notifications menu and refresh notifications.
  const openNotifications = async (event) => {
    setNotificationAnchor(event.currentTarget);
    await fetchNotifications();
  };

  // Close the notifications menu.
  const closeNotifications = () => {
    setNotificationAnchor(null);
  };

  // Mark a notification as read through the controller.
  const markNotificationAsRead = async (notificationId) => {
    const result = await readNotification(notificationId);

    if (!result.success) {
      return;
    }

    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification._id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
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
  const location = useLocation();

  // Log the user out.
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    history.push("/");
  };

  // Count unread notifications.
  const unreadNotifications = notifications.filter(
    (notification) => !notification.read,
  ).length;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#172554",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar>

        {/* UniLife logo/name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "1.5rem",
            letterSpacing: "-0.5px",
            marginRight: 4,
          }}
        >
          UniLife
        </Typography>

        {/* Navigation links */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            component={Link}
            to="/dashboard"
            disableRipple
            sx={{
              color: location.pathname === "/dashboard" ? "#3971d6" : "#334155",
              backgroundColor:
                location.pathname === "/dashboard" ? "#eef3ff" : "transparent",
              borderRadius: "8px",
              padding: "8px 14px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "15px",

              "&:hover": {
                backgroundColor: "#eef3ff",
                color: "#3971d6",
              },
            }}
          >
            Dashboard
          </Button>

          <Button
            component={Link}
            to="/events"
            disableRipple
            sx={{
              color: location.pathname === "/events" ? "#3971d6" : "#334155",
              backgroundColor:
                location.pathname === "/events" ? "#eef3ff" : "transparent",
              borderRadius: "8px",
              padding: "8px 14px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "15px",

              "&:hover": {
                backgroundColor: "#eef3ff",
                color: "#3971d6",
              },
            }}
          >
            Events
          </Button>

          <Button
            component={Link}
            to="/tasks"
            disableRipple
            sx={{
              color: location.pathname === "/tasks" ? "#3971d6" : "#334155",
              backgroundColor:
                location.pathname === "/tasks" ? "#eef3ff" : "transparent",
              borderRadius: "8px",
              padding: "8px 14px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "15px",

              "&:hover": {
                backgroundColor: "#eef3ff",
                color: "#3971d6",
              },
            }}
          >
            Tasks
          </Button>
        </Box>

        {/* Notifications and profile. */}
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Notifications button. */}
          <IconButton
            onClick={openNotifications}
            aria-label="Notifications"
            sx={{
              width: 42,
              height: 42,
              color: "#172554",
              border: "1px solid #dbe3f3",
              borderRadius: "10px",
              marginRight: 1.5,

              "&:hover": {
                backgroundColor: "#f3f6ff",
                borderColor: "#9bb7ee",
              },
            }}
          >
            <Badge
              badgeContent={unreadNotifications}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "11px",
                  minWidth: 18,
                  height: 18,
                  fontWeight: 700,
                },
              }}
            >
              <NotificationsIcon sx={{ fontSize: 22 }} />
            </Badge>
          </IconButton>

          {/* Notifications menu. */}
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={closeNotifications}
            PaperProps={{
              sx: {
                width: 360,
                maxWidth: "calc(100vw - 32px)",
                marginTop: 1,
                borderRadius: 2,
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                overflow: "hidden",
              },
            }}
          >
            {/* Notifications header. */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 18px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 17,
                }}
              >
                Notifications
              </Typography>

              {unreadNotifications > 0 && (
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "text.secondary",
                  }}
                >
                  {unreadNotifications} unread
                </Typography>
              )}
            </Box>

            <Divider />

            {notifications.length === 0 ? (
              <Box
                sx={{
                  padding: "28px 20px",
                  textAlign: "center",
                }}
              >
                <NotificationsIcon
                  sx={{
                    fontSize: 32,
                    color: "text.disabled",
                    marginBottom: 1,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 14,
                    color: "text.secondary",
                  }}
                >
                  No new notifications
                </Typography>
              </Box>
            ) : (
              notifications.map((notification) => (
                <MenuItem
                  key={notification._id}
                  onClick={() => {
                    markNotificationAsRead(notification._id);
                    closeNotifications();
                  }}
                  sx={{
                    padding: "14px 18px",
                    whiteSpace: "normal",
                    alignItems: "flex-start",
                    backgroundColor: notification.read
                      ? "transparent"
                      : "rgba(25, 118, 210, 0.06)",

                    "&:hover": {
                      backgroundColor: notification.read
                        ? "rgba(0, 0, 0, 0.04)"
                        : "rgba(25, 118, 210, 0.11)",
                    },
                  }}
                >
                  {/* Blue dot for unread notifications. */}
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      minWidth: 8,
                      borderRadius: "50%",
                      backgroundColor: notification.read
                        ? "transparent"
                        : "#1976d2",
                      marginTop: "7px",
                      marginRight: 1.5,
                    }}
                  />

                  {/* Notification content. */}
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: notification.read ? 400 : 600,
                        lineHeight: 1.5,
                      }}
                    >
                      {notification.message}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "text.secondary",
                        marginTop: 0.5,
                      }}
                    >
                      Task deadline
                    </Typography>
                  </Box>
                </MenuItem>
              ))
            )}
          </Menu>

          {/* Profile button. */}
          <Button
            variant="outlined"
            onClick={openProfile}
            startIcon={<AccountCircleIcon />}
            sx={{
              height: 42,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              color: "#172554",
              borderColor: "#dbe3f3",
              paddingLeft: 2,
              paddingRight: 2,

              "&:hover": {
                backgroundColor: "#f3f6ff",
                borderColor: "#9bb7ee",
              },
            }}
          >
            Profile
          </Button>

          {/* Profile menu. */}
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

            <MenuItem
              component={Link}
              to="/settings"
              onClick={closeProfile}
            >
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