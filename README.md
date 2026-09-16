# UniLife

## Project Description

UniLife is a web application developed to provide university students with a centralized platform for organizing and managing various aspects of their academic and social lives. 

The application enables users to discover and participate in campus events, organize personal tasks, and receive relevant notifications. Users can also customize their profiles and indicate their interests, allowing them to identify activities that correspond to their individual preferences. 

In addition, administrators are granted extended permissions to manage user accounts and oversee the content published within the application, including the moderation of events. 

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
- Specify personal interests

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
- Name
- Email
- User role
- Interests

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

### Personalization

Users can manage their profiles and specify their interests in order to discover activities that are relevant to them. 

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


## Project Structure
The project follows an MVC (Model-View-Controller) inspired structure. 

### Components

Contains reusable React components used throughout the application.

### Models

Defines the data models used by the application.

### Model Data

Contains predefined data used by the application. 

### Views

Contains the different views presented to users. 

### Controllers

Handles application logic and interactions between different parts of the application. 