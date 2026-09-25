import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography
} from "@mui/material";
import DashboardNavbar from "./components/DashboardNavbar";
import "./Profile.css";

function Profile() {
    const savedProfile = JSON.parse(
        localStorage.getItem("profile")
    ) || {
        name: "",
        username: "",
        email: ""
    };

    const [name, setName] = useState(savedProfile.name);
    const [username, setUsername] = useState(savedProfile.username);
    const [email, setEmail] = useState(savedProfile.email);
    
    const [profilePicture, setProfilePicture] = useState(
        savedProfile.profilePicture || ""
    );

    const [university,setUniversity] = useState(
        savedProfile.university || ""
    );

    const [program, setProgram] = useState(
        savedProfile.program || ""
    );

    const [yearOfStudy, setYearOfStudy] = useState(
        savedProfile.yearOfStudy || ""
    );

    const [bio, setBio] = useState(
        savedProfile.bio || ""
    );

    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");


    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];

        if(!file) {
            return;
        }
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfilePicture(reader.result);
            setSaved(false);
        };

        reader.readAsDataURL(file);
    };

    const handleSave = async (event) => {
    event.preventDefault();

    setError("");
    setSaved(false);

    const token = localStorage.getItem("token");

    if (!token) {
        setError("You are not logged in.");
        return;
    }

    const profileData = {
        name,
        username,
        email,
        profilePicture,
        university,
        program,
        yearOfStudy,
        bio
    };

    try {
        const response = await fetch(
            "http://localhost:5000/api/auth/profile",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(profileData)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            setError(data.message);
            return;
        }

        localStorage.setItem(
            "profile",
            JSON.stringify(data.user)
        );

        setName(data.user.name);
        setUsername(data.user.username);
        setEmail(data.user.email);

        setSaved(true);
    } catch {
        setError("Could not connect to the server.");
    }
};

    return (
        <Box className="profile-page">
            <DashboardNavbar />

            <Box className="profile-content">
                <Box className="profile-introduction">
                    <Typography
                        variant="h3"
                        component="h1"
                        className="profile-title"
                    >
                        Profile
                    </Typography>

                    <Typography className="profile-subtitle">
                        Manage your personal information and account.
                    </Typography>
                </Box>

                <Card className="profile-card" elevation={2}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            className="profile-section-title"
                        >
                            Personal Information
                        </Typography>

                        <Box className="profile-picture-section">
                            <Avatar
                               src={profilePicture}
                               alt="Profile picture"
                               sx={{ width: 100, height: 100 }}
                            >
                                {name ? name.charAt(0).toUpperCase() : "U"}
                            </Avatar>

                            <Button
                               variant="outlined"
                               component="label"
                            >
                                {profilePicture ? "Change Picture" : "Upload Picture"}
                                <input
                                   type="file"
                                   accept="image/*"
                                   hidden
                                   onChange={handleProfilePictureChange}
                                />
                            </Button>

                            {profilePicture && (
                                <Button
                                   variant="outlined"
                                   color="error"
                                   onClick={() => {
                                      setProfilePicture("")
                                      setSaved(false);
                                   }}
                                >
                                    Remove Picture
                                </Button>
                            )}
                        </Box>

                        <Box
                            component="form"
                            onSubmit={handleSave}
                            className="profile-form"
                        >
                            <TextField
                                fullWidth
                                label="Name"
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
                                    setSaved(false);
                                }}
                                required
                            />

                            <TextField
                                fullWidth
                                label="Username"
                                value={username}
                                onChange={(event) => {
                                    setUsername(event.target.value);
                                    setSaved(false);
                                }}
                                required
                            />

                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    setSaved(false);
                                }}
                                required
                            />

                            <TextField
                                fullWidth
                                label="University"
                                value={university}
                                onChange={(event) => {
                                    setUniversity(event.target.value);
                                    setSaved(false);
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Program / Degree"
                                value={program}
                                onChange={(event) => {
                                    setProgram(event.target.value);
                                    setSaved(false);
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Year of Study"
                                value={yearOfStudy}
                                onChange={(event) => {
                                    setYearOfStudy(event.target.value);
                                    setSaved(false);
                                }}
                            />

                            <TextField
                                fullWidth
                                label="About Me"
                                value={bio}
                                onChange={(event) => {
                                    setBio(event.target.value);
                                    setSaved(false);
                                }}
                                multiline
                                rows={4}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                className="profile-save-button"
                            >
                                Save Changes
                            </Button>

                            {error && (
                                <Typography color="error">
                                    {error}
                                </Typography>
                            )}

                            {saved && (
                                <Typography className="profile-saved-message">
                                    Changes saved successfully.
                                </Typography>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default Profile;