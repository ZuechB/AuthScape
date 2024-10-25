import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Box } from '@mui/material';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import { display, flex } from '@xstyled/styled-components';




const DraggableField = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      flex:"row",
      display:"flex"
    };
  
    return (
      <Box ref={setNodeRef} style={style} sx={{paddingTop:1}}>
        <Box {...listeners} {...attributes} style={{ cursor: 'grab' }}>
          <DragHandleRoundedIcon sx={{marginTop:2}} />
        </Box>
        <Box sx={{width:"100%"}}>
            {children}
        </Box>
      </Box>
    );
  };
  

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);

  const addField = (type) => {
    setFormFields([...formFields, { type, id: Date.now() }]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setFormFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return <TextField key={field.id} label="Text Field" variant="outlined" fullWidth />;
      case 'select':
        return (
          <FormControl key={field.id} fullWidth>
            <InputLabel>Select Field</InputLabel>
            <Select>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
            </Select>
          </FormControl>
        );
      case 'checkbox':
        return <FormControlLabel key={field.id} control={<Checkbox />} label="Checkbox" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={() => addField('text')}>Add Text Field</Button>
      <Button variant="contained" onClick={() => addField('select')}>Add Select Field</Button>
      <Button variant="contained" onClick={() => addField('checkbox')}>Add Checkbox</Button>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={formFields} strategy={verticalListSortingStrategy}>
          {formFields.map((field) => (
            <DraggableField key={field.id} id={field.id}>
              {renderField(field)}
            </DraggableField>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default FormBuilder;
