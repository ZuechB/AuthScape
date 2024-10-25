import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export function SortableColumn(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ListItem disablePadding>
          <ListItemButton>
          <ListItemIcon>
              <MenuIcon />
          </ListItemIcon>
          <ListItemText primary={props.id} />
          </ListItemButton>
      </ListItem>
    </div>
  );
}