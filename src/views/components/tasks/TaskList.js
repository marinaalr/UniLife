import React, { useState } from 'react';

import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import TaskItem from './TaskItem';
import TaskForm from './TaskForm';


function TaskList({
  selectedList,
  completedTasks,
  totalTasks,
  progress,
  filter,
  filteredTasks,
  showNewTask,
  editingTaskId,
  editingListName,
  editListName,
  taskTitle,
  taskDescription,
  taskDeadline,
  taskPriority,
  editTaskTitle,
  editTaskDescription,
  editTaskDeadline,
  editTaskPriority,
  today,
  onFilterChange,
  onDeleteList,
  onStartEditingList,
  onEditListNameChange,
  onSaveListName,
  onCancelEditingList,
  onShowNewTask,
  onTaskTitleChange,
  onTaskDescriptionChange,
  onTaskDeadlineChange,
  onTaskPriorityChange,
  onCreateTask,
  onCancelNewTask,
  onToggleTask,
  onStartEditingTask,
  onDeleteTask,
  onMoveTask,
  onEditTaskTitleChange,
  onEditTaskDescriptionChange,
  onEditTaskDeadlineChange,
  onEditTaskPriorityChange,
  onSaveEditedTask,
  onCancelEditingTask,
  isOverdue
}) {

  // Store the task that is being dragged
  const [draggedTaskId, setDraggedTaskId] = useState(null);


  // Start dragging a task
  function handleTaskDragStart(taskId) {
    setDraggedTaskId(taskId);
  }


  // Drop a task in a new position
  function handleTaskDrop(targetTaskId) {

    if (
      draggedTaskId === null ||
      draggedTaskId === targetTaskId
    ) {
      return;
    }

    onMoveTask(draggedTaskId, targetTaskId);
    setDraggedTaskId(null);
  }


  if (!selectedList) {

    return (
      <Box className="task-panel">

        <Box className="empty-panel">

          <Typography variant="h5">
            No list selected
          </Typography>

          <Typography className="task-count">
            Create a list to start adding tasks.
          </Typography>

        </Box>

      </Box>
    );
  }


  return (
    <Box className="task-panel">

      {/* Selected list header */}
      <Box className="task-panel-header">

        {editingListName ? (

          <Box className="edit-list-form">

            <TextField
              size="small"
              autoFocus
              value={editListName}

              onChange={(event) =>
                onEditListNameChange(event.target.value)
              }

              onKeyDown={(event) => {

                if (event.key === 'Enter') {
                  onSaveListName();
                }

                if (event.key === 'Escape') {
                  onCancelEditingList();
                }

              }}
            />


            <Button
              size="small"
              onClick={onCancelEditingList}
            >
              Cancel
            </Button>


            <Button
              size="small"
              variant="contained"
              onClick={onSaveListName}
            >
              Save
            </Button>

          </Box>

        ) : (

          <Box>

            <Box className="list-title-row">

              <Typography variant="h5">
                {selectedList.name}
              </Typography>

              <IconButton
                size="small"
                onClick={onStartEditingList}
                title="Edit list name"
              >
                <EditIcon sx={{ fontSize: 18 }} />
              </IconButton>

            </Box>


            <Typography className="task-count">
              {completedTasks} of {totalTasks} completed
            </Typography>

          </Box>

        )}


        <IconButton
          onClick={onDeleteList}
          title="Delete list"
        >
          <DeleteIcon />
        </IconButton>

      </Box>


      {/* Progress bar */}
      <Box className="progress-background">

        <Box
          className="progress-value"
          style={{
            width: `${progress}%`
          }}
        />

      </Box>


      {/* Filters */}
      <Box className="task-filters">

        <Button
          variant={
            filter === 'All'
              ? 'contained'
              : 'text'
          }
          onClick={() => onFilterChange('All')}
        >
          All
        </Button>


        <Button
          variant={
            filter === 'Active'
              ? 'contained'
              : 'text'
          }
          onClick={() => onFilterChange('Active')}
        >
          Active
        </Button>


        <Button
          variant={
            filter === 'Completed'
              ? 'contained'
              : 'text'
          }
          onClick={() => onFilterChange('Completed')}
        >
          Completed
        </Button>

      </Box>


      {/* Empty task message */}
      {filteredTasks.length === 0 && (
        <Typography className="empty-message">
          No tasks here yet.
        </Typography>
      )}


      {/* Tasks */}
      {filteredTasks.map((task) => (

        <Box
          className="task-container"
          key={task.id}
        >

          {editingTaskId === task.id ? (

            <TaskForm
              formTitle="Edit task"
              saveButtonText="Save changes"

              title={editTaskTitle}
              description={editTaskDescription}
              deadline={editTaskDeadline}
              priority={editTaskPriority}
              today={today}

              onTitleChange={onEditTaskTitleChange}
              onDescriptionChange={onEditTaskDescriptionChange}
              onDeadlineChange={onEditTaskDeadlineChange}
              onPriorityChange={onEditTaskPriorityChange}

              onSave={onSaveEditedTask}
              onCancel={onCancelEditingTask}
            />

          ) : (

            <TaskItem
              task={task}

              onToggle={onToggleTask}
              onEdit={onStartEditingTask}
              onDelete={onDeleteTask}

              isOverdue={isOverdue}

              onDragStart={handleTaskDragStart}

              onDragOver={() => {}}

              onDrop={handleTaskDrop}

              onDragEnd={() =>
                setDraggedTaskId(null)
              }
            />

          )}

        </Box>

      ))}


      {/* Add task button */}
      {!showNewTask && (

        <Button
          className="add-task-button"
          onClick={onShowNewTask}
        >
          + Add task
        </Button>

      )}


      {/* New task form */}
      {showNewTask && (

        <TaskForm
          formTitle="Add task"
          saveButtonText="Add task"

          title={taskTitle}
          description={taskDescription}
          deadline={taskDeadline}
          priority={taskPriority}
          today={today}

          onTitleChange={onTaskTitleChange}
          onDescriptionChange={onTaskDescriptionChange}
          onDeadlineChange={onTaskDeadlineChange}
          onPriorityChange={onTaskPriorityChange}

          onSave={onCreateTask}
          onCancel={onCancelNewTask}
        />

      )}

    </Box>
  );
}


export default TaskList;