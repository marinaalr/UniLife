//JavaScript
//Import Material UI components 
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from "react-router-dom";

//Create the navbar component 
function Navbar () {
    return (
         //The bar at the top of the page 
         //JSX: What should be shown under 
        <AppBar position="static"
        elevation={0}
        sx={{
            backgroundColor: "#ffffff",
            color: "#172554",
            borderBottom: "1px solid #e5e7eb"
        }}
        > 
            <Toolbar>

                {/* Website name */} 
                {/* Add space between UniLife and the navigation buttons */}
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.5px"}}> 
                UniLife
                </Typography>

                {/* Push login buttons to the right */}
                <Box sx={{ marginLeft: 'auto' }}>  {/*bobxen trycks så långs åt häger som möjligt*/}
                    <Button 
                      variant="outlined"
                      component={Link}
                      to="/login"
                      sx={{ 
                        marginRight: 2, 
                        borderRadius: "10px",
                        textTransform: "uppercase",
                        fontWeight: 600
                    }}
                    >
                        Log in
                   </Button>
                   <Button 
                      variant="contained"
                      component={Link}
                      to="/register"
                      sx={{
                        borderRadius: "10px",
                        textTransform: "uppercase",
                        fontWeight: 600
                      }}
                    >
                        Sign up
                    </Button>
                </Box>

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;  //Make navbar available to other files 
