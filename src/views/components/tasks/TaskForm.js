import React from 'react';

import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';


function TaskForm({
  title,
  description,
  deadline,
  priority,
  today,
  formTitle,
  saveButtonText,
  onTitleChange,
  onDescriptionChange,
  onDeadlineChange,
  onPriorityChange,
  onSave,
  onCancel
}) {

  return (
    <Box className="new-task-form">

      <Typography variant="h6">
        {formTitle}
      </Typography>


      <TextField
        label="Task name"
        fullWidth
        autoFocus
        value={title}
        onChange={(event) =>
          onTitleChange(event.target.value)
        }
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSave();
          }
        }}
      />


      <TextField
        label="Description"
        fullWidth
        multiline
        rows={2}
        value={description}
        onChange={(event) =>
          onDescriptionChange(event.target.value)
        }
      />


      <Box className="task-form-row">

        {/* Deadline */}
        <Box className="date-field">

          <Typography className="field-label">
            Deadline
          </Typography>

          <TextField
            type="date"
            fullWidth
            value={deadline}
            inputProps={{
              min: today
            }}
            onChange={(event) =>
              onDeadlineChange(event.target.value)
            }
          />

        </Box>


        {/* Priority */}
        <Box className="priority-field">

          <Typography className="field-label">
            Priority
          </Typography>

          <FormControl
            fullWidth
            className="priority-select"
          >

            <Select
              value={priority}
              onChange={(event) =>
                onPriorityChange(event.target.value)
              }
            >

              <MenuItem value="Low">
                Low
              </MenuItem>

              <MenuItem value="Medium">
                Medium
              </MenuItem>

              <MenuItem value="High">
                High
              </MenuItem>

            </Select>

          </FormControl>

        </Box>

      </Box>


      <Box className="task-form-buttons">

        <Button onClick={onCancel}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
        >
          {saveButtonText}
        </Button>

      </Box>

    </Box>
  );
}


export default TaskForm;