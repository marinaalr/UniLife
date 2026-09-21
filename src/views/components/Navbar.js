//JavaScript
//Import Material UI components 
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from "react-router-dom";

//Create the navbar component 
function Navbar () {
    return (
         //The bar at the top of the page 
         //JSX: What should be shown under 
        <AppBar position="static"> 
            <Toolbar>

                {/* Website name */} 
                {/* Add space between UniLife and the navigation buttons */}
                <Typography variant="h6" sx={{ marginRight: 4 }}> 
                UniLife
                </Typography>

                {/* Navigation Buttons */} 
                <Button color="inherit">Home</Button>
                <Button color="inherit">Calendar</Button>
                <Button color="inherit">Events</Button>
                <Button color="inherit">Tasks</Button>


                {/* Push login buttons to the right */}
                <Box sx={{ marginLeft: 'auto' }}>  {/*bobxen trycks så långs åt häger som möjligt*/}
                    <Button 
                      color="inherit"
                      component={Link}
                      to="/login"
                    >
                        Log in
                   </Button>
                   <Button 
                      color="inherit"
                      component={Link}
                      to="/register"
                    >
                        Sign up
                    </Button>
                </Box>

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;  //Make navbar available to other files 
