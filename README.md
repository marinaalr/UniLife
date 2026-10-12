# UniLife

## Project Description

UniLife is a web application developed to provide university students with a centralized platform for organizing and managing various aspects of their academic and social lives. 

The application enables users to discover and participate in campus events, organize personal tasks, and receive relevant notifications. Users can also customize their profiles to present information about themselves. 

Administrators have additional permissions to manage user accounts and oversee the content published within the application, including the moderation of events. 

Overall, UniLife is intended to offer a structured and convenient digital environment that brings together essential academic and social activities in one place. 


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
- Allow administrators to manage and moderate events

### Event Participation

- Join events
- Leave events
- View events the user is participating in

### Task Management

- Create personal tasks
- Edit existing tasks
- Mark tasks as completed
- Delete tasks
- Set and update deadlines
- Track task progress

### Personal Dashboard

- View upcoming events
- View joined events
- View pending tasks
- View approaching deadlines

### Search and Filtering

- Search for events
- Filter events by keywords, categories, dates, and locations

### Notifications

- Receive notifications about upcoming events
- Receive updates concerning joined events
- Receive reminders about approaching task deadlines

### Administration and Moderation

- Manage users
- Moderate events
- Remove inappropriate events or content


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
- Creator
- Participants

### Task

Represents personal academic or organizational tasks, including: 

- Title
- Description
- Deadline
- Status
- Assigned user


## How It Works

UniLife brings together academic and social activities within a single web application. 

### Events

Users can discover available campus events, view event information, and participate in events that interest them. 

### Tasks

Users can organize their academic and organizational responsibilities by creating tasks, setting deadlines, and tracking their progress. 

### User Profiles

Users can manage their profiles including their name, profile picture, university, field of study, and a short biography. 

### Administration

Administrators have additional permissions that allow them to manage users and moderate events and content. 


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
The project follows an MVC structure to seperate the user interface, application logic, and data handling. 
- Components: Reusable Recat components.
- Views: Pages and user interfaces. 
- Controllers: Handle application logic. 
- Services: Handle frontend operations and communication with the backend. 
- Models: Define application data and support database operations.
- Routes: Define backend API endpoints. 
- Middleware: Processes requests before they reach the relevant route handlers. 
- Server: Configures and starts the Express.js backend.  


## How to Run the Project

To run UniLife locally, follow the steps below.

### Clone the Repository

Clone the repository by using: 
```bash
git clone https://github.com/marinaalr/UniLife.git
```

Navigate to the project directory:
```bash
cd UniLife
```

### Installation

Install the required project dependencies by running: 
```bash
npm install
```

### Running the Application

Make sure MongoDB is installed and running on your computer.

Start the backend server in one terminal:

```bash
node server/server.js
```

Open a second terminal and start the React application:

```bash
npm start
```

The application will then be available in the browser at:

```bash
http://localhost:3000
```

### Build

To create a production build of the application, run: 
```bash
npm run build
```

### Code Quality

Run ESLint using: 
```bash
npx eslint src
```

```bash
npx eslint server
```