import React, { useState } from 'react';

import Navbar from './components/Navbar';

import {
  Box,
  Button,
  TextField,
  Typography
} from '@mui/material';

import TaskSidebar from './components/tasks/TaskSidebar';
import TaskList from './components/tasks/TaskList';
import TaskDialogs from './components/tasks/TaskDialogs';

import './TasksPage.css';


function TasksPage() {

  // Store all lists
  const [lists, setLists] = useState([]);

  // Store the selected list
  const [selectedListId, setSelectedListId] = useState(null);

  // Store the new list name
  const [newListName, setNewListName] = useState('');

  // Show or hide the new list form
  const [showNewList, setShowNewList] = useState(false);

  // Show or hide the new task form
  const [showNewTask, setShowNewTask] = useState(false);

  // Store information for a new task
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');

  // Store the selected filter
  const [filter, setFilter] = useState('All');

  // Store the task that is being edited
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Store information while editing a task
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [editTaskDeadline, setEditTaskDeadline] = useState('');
  const [editTaskPriority, setEditTaskPriority] = useState('Medium');

  // Store list editing information
  const [editingListName, setEditingListName] = useState(false);
  const [editListName, setEditListName] = useState('');

  // Show or hide the invalid date message
  const [showDateError, setShowDateError] = useState(false);

  // Store what should be deleted
  const [deleteType, setDeleteType] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);


  // Get today's date
  const today = new Date().toLocaleDateString('en-CA');


  // Find the selected list
  const selectedList = lists.find(
    (list) => list.id === selectedListId
  );


  // Create a new list
  function createList() {

    if (newListName.trim() === '') {
      return;
    }

    const newList = {
      id: Date.now(),
      name: newListName.trim(),
      tasks: []
    };

    setLists([...lists, newList]);

    setSelectedListId(newList.id);

    setNewListName('');
    setShowNewList(false);
  }


  // Select a list
  function selectList(listId) {

    setSelectedListId(listId);

    setFilter('All');
    setShowNewTask(false);
    setEditingListName(false);

    cancelEditingTask();
  }


  // Move a list
  function moveList(draggedListId, targetListId) {

    const draggedIndex = lists.findIndex(
      (list) => list.id === draggedListId
    );

    const targetIndex = lists.findIndex(
      (list) => list.id === targetListId
    );

    if (draggedIndex === -1 || targetIndex === -1) {
      return;
    }

    const updatedLists = [...lists];

    const [movedList] = updatedLists.splice(
      draggedIndex,
      1
    );

    updatedLists.splice(
      targetIndex,
      0,
      movedList
    );

    setLists(updatedLists);
  }


  // Move a task
  function moveTask(draggedTaskId, targetTaskId) {

    if (!selectedList) {
      return;
    }

    const updatedLists = lists.map((list) => {

      if (list.id !== selectedListId) {
        return list;
      }

      const updatedTasks = [...list.tasks];

      const draggedIndex = updatedTasks.findIndex(
        (task) => task.id === draggedTaskId
      );

      const targetIndex = updatedTasks.findIndex(
        (task) => task.id === targetTaskId
      );

      if (draggedIndex === -1 || targetIndex === -1) {
        return list;
      }

      const [movedTask] = updatedTasks.splice(
        draggedIndex,
        1
      );

      updatedTasks.splice(
        targetIndex,
        0,
        movedTask
      );

      return {
        ...list,
        tasks: updatedTasks
      };
    });

    setLists(updatedLists);
  }


  // Start editing a list name
  function startEditingList() {

    if (!selectedList) {
      return;
    }

    setEditListName(selectedList.name);
    setEditingListName(true);
  }


  // Save the edited list name
  function saveListName() {

    if (editListName.trim() === '' || !selectedList) {
      return;
    }

    const updatedLists = lists.map((list) => {

      if (list.id === selectedList.id) {
        return {
          ...list,
          name: editListName.trim()
        };
      }

      return list;
    });

    setLists(updatedLists);

    setEditingListName(false);
    setEditListName('');
  }


  // Cancel editing the list name
  function cancelEditingList() {

    setEditingListName(false);
    setEditListName('');
  }


  // Ask before deleting a list
  function askDeleteList() {

    if (!selectedList) {
      return;
    }

    setDeleteType('list');
  }


  // Delete the selected list
  function deleteList() {

    if (!selectedList) {
      return;
    }

    const updatedLists = lists.filter(
      (list) => list.id !== selectedList.id
    );

    setLists(updatedLists);

    if (updatedLists.length > 0) {
      setSelectedListId(updatedLists[0].id);
    } else {
      setSelectedListId(null);
    }

    setEditingListName(false);
  }


  // Create a new task
  function createTask() {

    if (taskTitle.trim() === '' || !selectedList) {
      return;
    }

    if (taskDeadline && taskDeadline < today) {
      setShowDateError(true);
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      deadline: taskDeadline,
      priority: taskPriority,
      completed: false
    };

    const updatedLists = lists.map((list) => {

      if (list.id === selectedList.id) {
        return {
          ...list,
          tasks: [...list.tasks, newTask]
        };
      }

      return list;
    });

    setLists(updatedLists);

    clearNewTaskForm();
  }


  // Clear and close the new task form
  function clearNewTaskForm() {

    setTaskTitle('');
    setTaskDescription('');
    setTaskDeadline('');
    setTaskPriority('Medium');

    setShowNewTask(false);
  }


  // Start editing a task
  function startEditingTask(task) {

    setEditingTaskId(task.id);

    setEditTaskTitle(task.title);
    setEditTaskDescription(task.description);
    setEditTaskDeadline(task.deadline);
    setEditTaskPriority(task.priority);
  }


  // Save an edited task
  function saveEditedTask() {

    if (editTaskTitle.trim() === '') {
      return;
    }

    if (editTaskDeadline && editTaskDeadline < today) {
      setShowDateError(true);
      return;
    }

    const updatedLists = lists.map((list) => {

      if (list.id === selectedListId) {

        const updatedTasks = list.tasks.map((task) => {

          if (task.id === editingTaskId) {
            return {
              ...task,
              title: editTaskTitle.trim(),
              description: editTaskDescription.trim(),
              deadline: editTaskDeadline,
              priority: editTaskPriority
            };
          }

          return task;
        });

        return {
          ...list,
          tasks: updatedTasks
        };
      }

      return list;
    });

    setLists(updatedLists);

    cancelEditingTask();
  }


  // Cancel editing a task
  function cancelEditingTask() {

    setEditingTaskId(null);

    setEditTaskTitle('');
    setEditTaskDescription('');
    setEditTaskDeadline('');
    setEditTaskPriority('Medium');
  }


  // Change completed status
  function toggleTask(taskId) {

    const updatedLists = lists.map((list) => {

      if (list.id === selectedListId) {

        const updatedTasks = list.tasks.map((task) => {

          if (task.id === taskId) {
            return {
              ...task,
              completed: !task.completed
            };
          }

          return task;
        });

        return {
          ...list,
          tasks: updatedTasks
        };
      }

      return list;
    });

    setLists(updatedLists);
  }


  // Ask before deleting a task
  function askDeleteTask(taskId) {

    setDeleteTaskId(taskId);
    setDeleteType('task');
  }


  // Delete a task
  function deleteTask(taskId) {

    const updatedLists = lists.map((list) => {

      if (list.id === selectedListId) {
        return {
          ...list,
          tasks: list.tasks.filter(
            (task) => task.id !== taskId
          )
        };
      }

      return list;
    });

    setLists(updatedLists);

    if (editingTaskId === taskId) {
      cancelEditingTask();
    }
  }


  // Confirm the delete action
  function confirmDelete() {

    if (deleteType === 'list') {
      deleteList();
    }

    if (
      deleteType === 'task' &&
      deleteTaskId !== null
    ) {
      deleteTask(deleteTaskId);
    }

    closeDeleteDialog();
  }


  // Close the delete message
  function closeDeleteDialog() {

    setDeleteType(null);
    setDeleteTaskId(null);
  }


  // Check if a task is overdue
  function isOverdue(task) {

    if (!task.deadline || task.completed) {
      return false;
    }

    return task.deadline < today;
  }


  // Get tasks based on the selected filter
  function getFilteredTasks() {

    if (!selectedList) {
      return [];
    }

    if (filter === 'Active') {
      return selectedList.tasks.filter(
        (task) => !task.completed
      );
    }

    if (filter === 'Completed') {
      return selectedList.tasks.filter(
        (task) => task.completed
      );
    }

    return selectedList.tasks;
  }


  // Calculate task progress
  const totalTasks = selectedList
    ? selectedList.tasks.length
    : 0;

  const completedTasks = selectedList
    ? selectedList.tasks.filter(
        (task) => task.completed
      ).length
    : 0;

  const progress = totalTasks === 0
    ? 0
    : (completedTasks / totalTasks) * 100;

  const filteredTasks = getFilteredTasks();


  return (
    <>
      <Navbar />


      <Box className="tasks-page">

        {/* Page header */}
        <Box className="tasks-header">

          <Box>

            <Typography variant="h4">
              Tasks
            </Typography>

            <Typography className="tasks-subtitle">
              Keep track of your university work
            </Typography>

          </Box>


          <Button
            variant="contained"
            onClick={() => setShowNewList(true)}
          >
            + New list
          </Button>

        </Box>


        {/* New list form */}
        {showNewList && (

          <Box className="new-list-form">

            <TextField
              label="List name"
              size="small"
              autoFocus
              value={newListName}

              onChange={(event) =>
                setNewListName(event.target.value)
              }

              onKeyDown={(event) => {

                if (event.key === 'Enter') {
                  createList();
                }

              }}
            />


            <Button
              onClick={() => {
                setShowNewList(false);
                setNewListName('');
              }}
            >
              Cancel
            </Button>


            <Button
              variant="contained"
              onClick={createList}
            >
              Create
            </Button>

          </Box>

        )}


        {/* Main Tasks layout */}
        <Box className="tasks-content">

          <TaskSidebar
            lists={lists}
            selectedListId={selectedListId}
            onSelectList={selectList}
            onMoveList={moveList}
          />


          <TaskList
            selectedList={selectedList}

            completedTasks={completedTasks}
            totalTasks={totalTasks}
            progress={progress}

            filter={filter}
            filteredTasks={filteredTasks}

            showNewTask={showNewTask}
            editingTaskId={editingTaskId}

            editingListName={editingListName}
            editListName={editListName}

            taskTitle={taskTitle}
            taskDescription={taskDescription}
            taskDeadline={taskDeadline}
            taskPriority={taskPriority}

            editTaskTitle={editTaskTitle}
            editTaskDescription={editTaskDescription}
            editTaskDeadline={editTaskDeadline}
            editTaskPriority={editTaskPriority}

            today={today}

            onFilterChange={setFilter}

            onDeleteList={askDeleteList}
            onStartEditingList={startEditingList}
            onEditListNameChange={setEditListName}
            onSaveListName={saveListName}
            onCancelEditingList={cancelEditingList}

            onShowNewTask={() =>
              setShowNewTask(true)
            }

            onTaskTitleChange={setTaskTitle}
            onTaskDescriptionChange={setTaskDescription}
            onTaskDeadlineChange={setTaskDeadline}
            onTaskPriorityChange={setTaskPriority}

            onCreateTask={createTask}
            onCancelNewTask={clearNewTaskForm}

            onToggleTask={toggleTask}
            onStartEditingTask={startEditingTask}
            onDeleteTask={askDeleteTask}
            onMoveTask={moveTask}

            onEditTaskTitleChange={setEditTaskTitle}
            onEditTaskDescriptionChange={setEditTaskDescription}
            onEditTaskDeadlineChange={setEditTaskDeadline}
            onEditTaskPriorityChange={setEditTaskPriority}

            onSaveEditedTask={saveEditedTask}
            onCancelEditingTask={cancelEditingTask}

            isOverdue={isOverdue}
          />

        </Box>

      </Box>


      {/* Task messages */}
      <TaskDialogs
        showDateError={showDateError}

        onCloseDateError={() =>
          setShowDateError(false)
        }

        deleteType={deleteType}

        onCloseDelete={closeDeleteDialog}

        onConfirmDelete={confirmDelete}
      />

    </>
  );
}


export default TasksPage;