import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));
  
  export default function MenuPopup({anchorEl, items = [], open, onHide}) {

    const handleClose = () => {
      onHide();
    };
  
    return (
        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}>
              {items}

            {/* {items.map((item) => {
              return (
                <MenuItem onClick={() => {
                  handleClose();
                  onSelect(item);
                }} disableRipple>
                  {item.icon}
                  {item.name}
                </MenuItem>
              )
            })} */}


{/* 
            <MenuItem onClick={() => {
              handleClose();
              window.location.href = "/invoice/detail?invoiceId=" + invoiceId
            }} disableRipple>
            <EditIcon />
            Edit
            </MenuItem>


            <MenuItem onClick={handleClose} disableRipple>
            <ArchiveIcon />
            Archive
            </MenuItem>


            <Divider sx={{ my: 0.5 }} />


            <MenuItem onClick={() => {
              handleClose();
              window.location.href = "/invoice/detail?invoiceId=" + invoiceId
            }} disableRipple>
            <MoreHorizIcon />
            View
            </MenuItem> */}

            
        </StyledMenu>
    );
  }