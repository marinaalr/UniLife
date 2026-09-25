import React from 'react';

import {
  Box,
  Checkbox,
  IconButton,
  Typography
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  isOverdue,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd
}) {

  return (
    <Box
      className="task-row"
      draggable

      onDragStart={() =>
        onDragStart(task.id)
      }

      onDragOver={(event) => {
        event.preventDefault();
        onDragOver(task.id);
      }}

      onDrop={() =>
        onDrop(task.id)
      }

      onDragEnd={onDragEnd}
    >

      <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />


      <Box className="task-info">

        <Typography
          className={
            task.completed
              ? 'task-name completed-task'
              : 'task-name'
          }
        >
          {task.title}
        </Typography>


        {task.description && (
          <Typography className="task-description">
            {task.description}
          </Typography>
        )}


        <Box className="task-details">

          <span
            className={
              `priority priority-${task.priority.toLowerCase()}`
            }
          >
            {task.priority}
          </span>


          {task.deadline && (

            <span
              className={
                isOverdue(task)
                  ? 'deadline overdue'
                  : 'deadline'
              }
            >

              {isOverdue(task)
                ? `Overdue · ${task.deadline}`
                : task.deadline}

            </span>

          )}

        </Box>

      </Box>


      <Box className="task-actions">

        <IconButton
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          <EditIcon sx={{ fontSize: 18 }} />
        </IconButton>


        <IconButton
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          <DeleteIcon />
        </IconButton>

      </Box>

    </Box>
  );
}


export default TaskItem;