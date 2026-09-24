// Import the Navbar component
import Navbar from './components/Navbar';
import universityImage from '../assets/university.jpg';

// Import Material UI components
import { Box, Typography, Button, Card, CardContent} from '@mui/material';


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

        {/* Center the welcome text */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #dbeafe, #ede9fe)",
            padding: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 6
          }}
        >

        <Box>
          {/* Main heading */}
          <Typography variant="h2" sx= {{ fontWeight: 700, color: "#172554" }}>
            Welcome to UniLife
          </Typography>

          {/* Short description */}
          <Typography
            variant="h6"
            sx={{ marginTop: 2, color: "#475569"}}
          >
            Stay organized, discover campus events, and connect with students.
          </Typography>

        <Box
            sx={{ 
              display: "flex", 
              justifyContent: "center", 
              gap: 2, 
              marginTop: 4 
            }}
          >
            <Button
               variant="contained"
               sx={{ borderRadius: "10px", fontWeight: 600 }}
            >
              Get Started
            </Button>

          <Button variant="outlined" sx={{ borderRadius: "10px", fontWeight: 600}}>
            Learn More
          </Button>
        </Box>
      </Box>

      <Box
        component="img"
        src={universityImage}
        alt="University"
        sx={{
          width: "45%",
          borderRadius: "20px",
          objectFit: "cover"
        }}
      />
    </Box>

          {/* FEATURE SECTION */}
      <Box
        sx={{
          padding: 6,
          backgroundColor: "#ffffff"
        }}
      >

        {/* Section heading */}
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: "#172554"
          }}
        >
          How UniLife helps you
        </Typography>

        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            marginTop: 1,
            color: "#64748b"
          }}
        >
          Everything you need for university life, in one place.
        </Typography>

        {/* Feature cards */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            marginTop: 5
          }}
        >

          {/* Events */}
          <Card
            sx={{
              width: 300,
              borderRadius: "16px",
              padding: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}
          >
            <CardContent>

              <Typography
                sx={{
                  fontSize: "35px",
                  marginBottom: 1
                }}
              >
                📅
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#172554"
                }}
              >
                Plan your events
              </Typography>

              <Typography
                sx={{
                  marginTop: 1,
                  color: "#64748b"
                }}
              >
                Discover campus events, study sessions and activities.
              </Typography>

            </CardContent>
          </Card>


          {/* Organization */}
          <Card
            sx={{
              width: 300,
              borderRadius: "16px",
              padding: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}
          >
            <CardContent>

              <Typography
                sx={{
                  fontSize: "35px",
                  marginBottom: 1
                }}
              >
                ✓
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#172554"
                }}
              >
                Stay organized
              </Typography>

              <Typography
                sx={{
                  marginTop: 1,
                  color: "#64748b"
                }}
              >
                Manage your tasks, deadlines and everyday university life.
              </Typography>

            </CardContent>
          </Card>


          {/* Connect */}
          <Card
            sx={{
              width: 300,
              borderRadius: "16px",
              padding: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}
          >
            <CardContent>

              <Typography
                sx={{
                  fontSize: "35px",
                  marginBottom: 1
                }}
              >
                👥
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#172554"
                }}
              >
                Connect with students
              </Typography>

              <Typography
                sx={{
                  marginTop: 1,
                  color: "#64748b"
                }}
              >
                Meet new people, join activities and build your campus community.
              </Typography>

            </CardContent>
          </Card>

        </Box>
      </Box>

            {/* DASHBOARD PREVIEW */}
      <Box
        sx={{
          padding: 6,
          backgroundColor: "#eff6ff",
          textAlign: "center"
        }}
      >

        {/* Section heading */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "#172554"
          }}
        >
          Everything in one place
        </Typography>

        <Typography
          variant="h6"
          sx={{
            marginTop: 1,
            color: "#64748b"
          }}
        >
          A simple and modern dashboard to help you manage your university life.
        </Typography>

        {/* Dashboard preview */}
        <Box
          sx={{
            maxWidth: 900,
            margin: "40px auto 0",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: 4,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            textAlign: "left"
          }}
        >

          {/* Dashboard title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#172554",
              marginBottom: 3
            }}
          >
            UniLife Dashboard
          </Typography>

          {/* Dashboard cards */}
          <Box
            sx={{
              display: "flex",
              gap: 2
            }}
          >

            <Card
              sx={{
                flex: 1,
                borderRadius: "14px",
                backgroundColor: "#eff6ff"
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700 }}
                >
                  📅 Events
                </Typography>

                <Typography
                  sx={{
                    marginTop: 1,
                    color: "#64748b"
                  }}
                >
                  View your upcoming events.
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                flex: 1,
                borderRadius: "14px",
                backgroundColor: "#f0fdf4"
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700 }}
                >
                  ✓ Tasks
                </Typography>

                <Typography
                  sx={{
                    marginTop: 1,
                    color: "#64748b"
                  }}
                >
                  Keep track of your tasks.
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                flex: 1,
                borderRadius: "14px",
                backgroundColor: "#f5f3ff"
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700 }}
                >
                  👥 Friends
                </Typography>

                <Typography
                  sx={{
                    marginTop: 1,
                    color: "#64748b"
                  }}
                >
                  Connect with other students.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* CALL TO ACTION */}
      <Box
        sx={{
          margin: 4,
          padding: 5,
          borderRadius: "24px",
          background: "linear-gradient(135deg, #ddd6fe, #dbeafe)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#172554"
            }}
          >
            Ready to make university life easier?
          </Typography>

          <Typography
            sx={{
              marginTop: 1,
              color: "#475569"
            }}
          >
            Join UniLife and get access to events, tasks, and a vibrant student community.
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            borderRadius: "12px",
            padding: "12px 28px",
            fontWeight: 700,
            whiteSpace: "nowrap"
          }}
        >
          Get Started
        </Button>
      </Box>


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