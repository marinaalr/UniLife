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
import saveProfile from "../controllers/profileController";

// Def. och exporterar senare komponenten Profile
function Profile() {
    //Hämtar sparad profilinformation från webbläsarens localStorage.
    //Json.parse omvandlar JSOn text till ett JavaScript objekt
    const savedProfile = JSON.parse(
        localStorage.getItem("profile")
    ) || { //Om värdet saknas används objektet nedan (Standardvärden)
        name: "",
        username: "",
        email: ""
    };

    //Skapar tillstånd för namnet och fyller det med det sparade värdet
    const [name, setName] = useState(savedProfile.name);
    //Tillstånd för användarnämnet
    const [username, setUsername] = useState(savedProfile.username);
    // Skapar ett tillstånd för e-postadressen
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

    //Håller reda på om ändringarna har sparats
    const [saved, setSaved] = useState(false);
    //Sparar evt. felmeddelande
    const [error, setError] = useState("");


    //Hanterar när användaren väljer ny profilbild
    const handleProfilePictureChange = (event) => {
        //Hämtar den första filen som användaren har valt
        const file = event.target.files[0];

        //Avbryter om ingen fil har valt
        if(!file) {
            return;
        }
        //Skapar en filereader för att läsa in bilden
        const reader = new FileReader();

        reader.onloadend = () => {
            // Sparar bildens innehåll i komponentens tillstånd
            setProfilePicture(reader.result);
            //Markerar att det finns ändringar som ännu inte sparats
            setSaved(false);
        };

        //Omvandlar bilden till data URL
        reader.readAsDataURL(file);
    };

// Save the user's profile through the controller.
const handleSave = async (event) => {
    event.preventDefault();

    //Rensar tidigare felmeddelanden och sparstatus
    setError("");
    setSaved(false);

    //Samlar alla profilfält i ett objekt
    const profileData = {
        name,
        username,
        email,
        profilePicture,
        university,
        program,
        yearOfStudy,
        bio,
    };

    //Skickar profilinformationen till controllern för att sparas
    const result = await saveProfile(profileData);

    if (!result.success) {
        setError(result.message);
        return;
    }

    //Sparar den uppdaterade profilen i webbläsarens localStorage
    localStorage.setItem(
        "profile",
        JSON.stringify(result.user),
    );

    // Uppdaterar tillstånden med informationen som sparades
    setName(result.user.name);
    setUsername(result.user.username);
    setEmail(result.user.email);
    setProfilePicture(result.user.profilePicture || "");
    setUniversity(result.user.university || "");
    setProgram(result.user.program || "");
    setYearOfStudy(result.user.yearOfStudy || "");
    setBio(result.user.bio || "");

    //Visar att ändringarna har sparats
    setSaved(true);
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