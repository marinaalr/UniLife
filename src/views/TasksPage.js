import React, { useEffect, useState } from "react";

// Import Material UI components
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

// Import icons for editing and deleting tasks
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";


// Import the dashboard navigation bar
import DashboardNavbar from "./components/DashboardNavbar";

// Import CSS for this page
import "./TasksPage.css";


function TasksPage() {

  // Store all tasks
  const [tasks, setTasks] = useState([]);

  // Show or hide the new task form
  const [showNewTask, setShowNewTask] = useState(false);

  // Store information for the new task
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  // Store which task is being edited
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Load tasks from the database when the page opens
  useEffect(() => {

    async function loadTasks() {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
      }
    }

    loadTasks();

  }, []);

  // Save tasks to the database
  async function saveTasks(updatedTasks) {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tasks: updatedTasks,
      }),
    });

    const data = await response.json();

    console.log("Save status:", response.status);
    console.log("Save response:", data);
  }

  // Create a new task
  function createTask() {

    // A task must have a title
    if (title.trim() === "") {
      return;
    }

    // Update a task if we are editing
    if (editingTaskId !== null) {

      const updatedTasks = tasks.map((task) => {

        if (task.id === editingTaskId) {
          return {
            ...task,
            title: title,
            description: description,
            deadline: deadline,
          };
        }

        return task;
      });

      setTasks(updatedTasks);
      saveTasks(updatedTasks);

      // Stop editing
      setEditingTaskId(null);

      // Clear the form
      setTitle("");
      setDescription("");
      setDeadline("");

      // Close the form
      setShowNewTask(false);

      return;
    }

    // Create the task object
    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
      deadline: deadline,
      completed: false,
    };

    // Add the task to the array
    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    saveTasks(updatedTasks);

    // Clear the form
    setTitle("");
    setDescription("");
    setDeadline("");

    // Close the form
    setShowNewTask(false);
  }


  // Close the form without creating a task
  function cancelNewTask() {
    setTitle("");
    setDescription("");
    setDeadline("");
    setEditingTaskId(null);
    setShowNewTask(false);
  }

  // Mark a task as completed or not completed
  function toggleTask(taskId) {

    // Go through all tasks
    const updatedTasks = tasks.map((task) => {

      // Find the task that was clicked
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    // Save the updated tasks
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  // Delete a task
  function deleteTask(taskId) {

    // Ask the user before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    // Stop if the user clicks Cancel
    if (!confirmDelete) {
      return;
    }

    // Keep all tasks except the task that should be deleted
    const updatedTasks = tasks.filter(
      (task) => task.id !== taskId
    );

    // Save the updated tasks
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  // Start editing a task
  function editTask(task) {

    // Put the task information in the form
    setTitle(task.title);
    setDescription(task.description);
    setDeadline(task.deadline);

    // Remember which task is being edited
    setEditingTaskId(task.id);

    // Open the form
    setShowNewTask(true);
  }

  return (
    <>
      {/* Dashboard navigation */}
      <DashboardNavbar />

      {/* Main page */}
      <Box className="task-page">


        {/* Top section */}
        <Box className="task-header">

          {/* Title and subtitle */}
          <Box>
            <Typography variant="h3" className="task-page-title">
              Tasks
            </Typography>

            <Typography className="task-page-subtitle">
              Keep track of your university work
            </Typography>
          </Box>


          {/* Open the new task form */}
          <Button
            variant="contained"
            onClick={() => setShowNewTask(true)}
          >
            + New task
          </Button>

        </Box>


        {/* Large background container */}
        <Box className="task-board">


          {/* New task form */}
          {showNewTask && (
            <Box className="new-task-card">

              <Typography variant="h5">
                {editingTaskId !== null ? "Edit task" : "Add task"}
              </Typography>


              {/* Task title */}
              <TextField
                label="Task name"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />


              {/* Task description */}
              <TextField
                label="Description"
                multiline
                rows={3}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />


              {/* Task deadline */}
              <Box>
                <Typography className="input-label">
                  Deadline
                </Typography>

                <TextField
                  type="date"
                  fullWidth
                  value={deadline}
                  onChange={(event) => setDeadline(event.target.value)}
                />
              </Box>


              {/* Form buttons */}
              <Box className="task-form-buttons">

                <Button onClick={cancelNewTask}>
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  onClick={createTask}
                >
                  {editingTaskId !== null ? "Save changes" : "Add task"}
                </Button>

              </Box>

            </Box>
          )}


          {/* Message when there are no tasks */}
          {!showNewTask && tasks.length === 0 && (
            <Typography className="no-tasks">
              No tasks yet.
            </Typography>
          )}


          {/* Show all tasks */}
          {editingTaskId === null && tasks.map((task) => (
            <Box
              className={`task-card ${task.completed ? "completed-task" : ""}`}
              key={task.id}
            >

              {/* Checkbox for completing the task */}
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />


              {/* Task information */}
              <Box className="task-content">

                {/* Task title */}
                <Typography variant="h6">
                  {task.title}
                </Typography>


                {/* Task description */}
                {task.description && (
                  <Typography className="task-description">
                    {task.description}
                  </Typography>
                )}


                {/* Task deadline */}
                {task.deadline && (
                  <Typography className="task-deadline">
                    Due: {task.deadline}
                  </Typography>
                )}

              </Box>

              {/* Edit the task */}
              <IconButton
                className="task-action-button edit-task-button"
                onClick={() => editTask(task)}
                aria-label="Edit task"
              >
                <EditOutlinedIcon />
              </IconButton>

              {/* Delete the task */}
              <IconButton
                className="task-action-button delete-task-button"
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>

            </Box>
          ))}

        </Box>

      </Box>
    </>
  );
}


// Export the page
export default TasksPage;