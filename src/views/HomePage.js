// Import the Navbar component
import Navbar from './components/Navbar';

// Import Material UI components
import { Container, Box, Typography } from '@mui/material';


// Create the HomePage component
function HomePage() {
  return (

    // Make the page at least as high as the screen
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >

      {/* Show the navbar */}
      <Navbar />


      {/* MAIN CONTENT */}
      <Container>

        {/* Center the welcome text */}
        <Box
          sx={{
            marginTop: 18,
            textAlign: 'center'
          }}
        >

          {/* Main heading */}
          <Typography variant="h3">
            Welcome to UniLife
          </Typography>

          {/* Short description */}
          <Typography
            variant="h6"
            sx={{ marginTop: 2 }}
          >
            Stay organized, discover campus events, and connect with students.
          </Typography>

        </Box>

      </Container>


      {/* FOOTER */}
      <Box
        sx={{
          marginTop: 'auto',
          textAlign: 'center',
          padding: 4
        }}
      >

        <Typography variant="h6">
          UniLife
        </Typography>

        <Typography variant="body2">
          Making university life easier.
        </Typography>

        <Typography
          variant="body2"
          sx={{ marginTop: 2 }}
        >
          © 2026 UniLife
        </Typography>

      </Box>

    </Box>
  );
}


// Make HomePage available to other files
export default HomePage;