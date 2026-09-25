import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';


function TaskSidebar({
  lists,
  selectedListId,
  onSelectList,
  onMoveList
}) {

  // Store the list that is being dragged
  const [draggedListId, setDraggedListId] = useState(null);


  // Start dragging a list
  function handleDragStart(listId) {
    setDraggedListId(listId);
  }


  // Drop the list in a new position
  function handleDrop(targetListId) {

    if (
      draggedListId === null ||
      draggedListId === targetListId
    ) {
      return;
    }

    onMoveList(draggedListId, targetListId);
    setDraggedListId(null);
  }


  return (
    <Box className="tasks-sidebar">

      <Typography className="sidebar-title">
        MY LISTS
      </Typography>


      {lists.length === 0 && (
        <Typography className="empty-message">
          No lists yet
        </Typography>
      )}


      {lists.map((list) => (

        <Box
          key={list.id}
          draggable

          className={
            selectedListId === list.id
              ? 'list-item active-list'
              : 'list-item'
          }

          onClick={() => onSelectList(list.id)}

          onDragStart={() =>
            handleDragStart(list.id)
          }

          onDragOver={(event) =>
            event.preventDefault()
          }

          onDrop={() =>
            handleDrop(list.id)
          }

          onDragEnd={() =>
            setDraggedListId(null)
          }
        >
          {list.name}
        </Box>

      ))}

    </Box>
  );
}


export default TaskSidebar;