# UniLife

## Project Description

UniLife is a web application developed to provide university students with a centralized platform for organizing and managing various aspects of their academic and social lives. 

The application provides features for managing campus events, organizing tasks, and keeping track of upcoming activities and deadlines. 

The goal of UniLife is to offer a structured and convenient digital environment that brings together essential academic and social activities in one place. 


## Team Members

| **Name** | **GitHub Username** |
|---|---|
| Marina Alramo | @marinaalr |
| Christina Outra | @christinaoutra |
| Ludvig Kågefors | @ludvigkagefors |

## Declarations

I, Marina Alramo, declare that I am the sole author of the content that I add to this repository. 

I, Christina Outra, declare that I am the sole author of the content that I add to this repository. 

I, Ludvig Kågefors, declare that I am the sole author of the content that I add to this repository. 


## Features

### User Management

- Create a user account
- Log in and log out
- Manage personal profiles

### Event Management

- Create campus events
- View available events
- Edit and delete own events

### Task Management

- Create personal tasks
- Edit existing tasks
- Mark tasks as completed
- Delete tasks
- Set and update deadlines

### Personal Dashboard

- View upcoming events
- View pending tasks
- View approaching deadlines

### Notifications

- Receive notifications about upcoming events
- Receive reminders about approaching task deadlines


## Main Entities / Objects

### User

Stores account and profile information, including:
- Username
- Name
- Email
- Profile picture
- University
- Field of study
- Biography

### Event

Represents campus events and contains information such as: 
- Title
- Description
- Date
- Location

### Task

Represents personal academic or organizational tasks, including: 

- Title
- Description
- Deadline
- Status


## How It Works

UniLife brings together academic and social activities within a single web application. 

### Events

Users can create, view, edit, and delete their own events. 

### Tasks

Users can organize their academic and organizational responsibilities by creating tasks, setting deadlines, and tracking their progress. 

### User Profiles

Users can manage their profiles including their name, profile picture, university, field of study, and a short biography. 



## Technologies

The project is developed using the following technologies: 

- ReactJS
- Material UI (MUI)
- Node.js
- ExpressJS
- React Router
- ESLint
- MongoDB
- Mongoose


## Project Structure
The project is organized into separate components to distinguish between the user interface, application logic, and data handling.

- **Components**: Reusable React components used to build the user interface. 
- **Views**: Pages that make up the frontend application. 
- **Controllers**: Coordinate application logic and handle requests.
- **Services**: Handle frontend operations and communication with the backend API. 
- **Models**: Define the structure of application data stored in the database.
- **Routes**: Define backend API endpoints. 
- **Middleware**: Processes requests before they reach the relevant route handlers. 
- **Server**: Configures and starts the Express.js backend and establishes the database connection.


## How to Run the Project

Follow the steps below to run UniLife

### Clone the Repository

Clone the repository: 
```bash
git clone https://github.com/marinaalr/UniLife.git
```

Navigate to the project directory:
```bash
cd UniLife
```

### Installation

Install the project dependencies: 
```bash
npm install
```

### Running the Application

Make sure MongoDB is installed and running on your computer.

Start the backend server in one terminal:

```bash
node server/server.js
```

Open a second terminal and start the frontend application:

```bash
npm start
```

The application will be available in the browser at:

```bash
http://localhost:3000
```

### Build

To create a production build of the frontend, run: 
```bash
npm run build
```

### Code Quality

To check the source code using ESLint, run:

```bash
npm run lint
```

