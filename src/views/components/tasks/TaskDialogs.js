import React from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';


function TaskDialogs({
  showDateError,
  onCloseDateError,
  deleteType,
  onCloseDelete,
  onConfirmDelete
}) {

  return (
    <>

      {/* Invalid deadline message */}
      <Dialog
        open={showDateError}
        onClose={onCloseDateError}
        PaperProps={{
          sx: {
            borderRadius: '18px',
            padding: '12px',
            minWidth: '360px'
          }
        }}
      >

        <Box className="dialog-icon error-dialog-icon">
          <ErrorOutlineRoundedIcon />
        </Box>

        <DialogTitle className="custom-dialog-title">
          Invalid deadline
        </DialogTitle>


        <DialogContent>

          <DialogContentText className="custom-dialog-text">
            Please choose today or a future date.
          </DialogContentText>

        </DialogContent>


        <DialogActions className="custom-dialog-actions">

          <Button
            variant="contained"
            onClick={onCloseDateError}
          >
            OK
          </Button>

        </DialogActions>

      </Dialog>


      {/* Delete confirmation */}
      <Dialog
        open={deleteType !== null}
        onClose={onCloseDelete}
        PaperProps={{
          sx: {
            borderRadius: '18px',
            padding: '12px',
            minWidth: '380px'
          }
        }}
      >

        <Box className="dialog-icon delete-dialog-icon">
          <DeleteOutlineRoundedIcon />
        </Box>


        <DialogTitle className="custom-dialog-title">

          {deleteType === 'list'
            ? 'Delete list?'
            : 'Delete task?'}

        </DialogTitle>


        <DialogContent>

          <DialogContentText className="custom-dialog-text">

            {deleteType === 'list'
              ? 'Are you sure you want to delete this list? All tasks in the list will also be deleted.'
              : 'Are you sure you want to delete this task?'}

          </DialogContentText>

        </DialogContent>


        <DialogActions className="custom-dialog-actions">

          <Button onClick={onCloseDelete}>
            Cancel
          </Button>


          <Button
            variant="contained"
            color="error"
            onClick={onConfirmDelete}
          >
            Delete
          </Button>

        </DialogActions>

      </Dialog>

    </>
  );
}


export default TaskDialogs;