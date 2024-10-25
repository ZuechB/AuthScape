import React, {useEffect, useState, useRef} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

export function SharedListItem ({value, labelId}) {

    const [checked, setChecked] = useState(false);

    const handleToggle = (value) => () => {
        setChecked(!checked);
    };

    const onButtonClicked = () => {
        setChecked(!checked)
    }

    return (
        <ListItem
            key={value}
            secondaryAction={
            <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked}
                inputProps={{ 'aria-labelledby': labelId }}
            />
            }
            disablePadding>
            <ListItemButton onClick={onButtonClicked}>
            <ListItemAvatar>
                <Avatar
                alt={`Avatar n°${value + 1}`}
                src={`/static/images/avatar/${value + 1}.jpg`}
                />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
        </ListItem>
    )
}