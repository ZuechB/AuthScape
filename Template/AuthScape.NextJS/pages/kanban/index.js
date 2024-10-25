import React, {useEffect, useState} from 'react';
// import {Kanban} from 'authscape';

import Kanban from 'authscape-kanban';
// import { Kanban } from '../../components/Kanban/Kanban';
import Menu from '@mui/material/Menu';
import Head from 'next/head';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, AvatarGroup, Box, Divider, Button, Chip, Grid, IconButton, Stack } from '@mui/material';

import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

import containerStyles from 'authscape/dist/Container.module.css';
import itemStyles from 'authscape/dist/Item.module.css';

export default function Index({loadedUser}) {

  const menu = ({anchorEl, open, handleMoreClose}) => {
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMoreClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem onClick={handleMoreClose}>Edit</MenuItem>
        <MenuItem onClick={handleMoreClose}>Share</MenuItem>
        <Divider />
        <MenuItem onClick={handleMoreClose}>Delete</MenuItem>
      </Menu>
    )
  }

  const cardTemplate = ({props}) => {
    return (
      <Box>
        <Box>
          <Chip label="3 Days" sx={{backgroundColor:"#f9eee3", color:"#D58D49"}} />
        </Box>

        <Box sx={{position:"absolute", right: "20px", top:"20px"}}>
          <IconButton aria-label="more" onClick={props.moreClicked}>
            <MoreHorizRoundedIcon />
          </IconButton>
        </Box>
        
        <Box sx={{color:"#0D062D", fontSize:18, fontWeight:"bold", paddingTop:2}}>
        {props.name}
        </Box>

        <Box sx={{color:"#0D062D", paddingTop:1}}>
          5 Products
          {/* {props.id} */}
          {props.description}
        </Box>

        <Box sx={{color:"#0D062D"}}>
          {props.description}
        </Box>

        

        <Box sx={{paddingTop:2}}>
          <Stack direction="row" spacing={2}>
            <AvatarGroup>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" 
              sx={{
                width:"30px",
                height:"30px"
              }} />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" 
              sx={{
                width:"30px",
                height:"30px"
              }} />
            </AvatarGroup>
            <Box>
              <Button className={"removeDisabled"} startIcon={<TextsmsOutlinedIcon/>} sx={{color:"#000"}} disabled={true} variant="text">2 Comments</Button>
            </Box>
            <Box>
              <Button className={"removeDisabled"} startIcon={<InsertDriveFileOutlinedIcon/>} sx={{color:"#000"}} disabled={true} variant="text">1 File</Button>
            </Box>
          </Stack>
        </Box>

      </Box>
    )
  }

  return (
    <>
      <Head>
        <title>AuthScape | Kanban</title>
      </Head>

      <Kanban 
        Menu={menu}
        identifier={1}
        CardTemplate={cardTemplate}
        containerStyles={containerStyles}
        itemStyles={itemStyles} 
        onCardChangedState={(columnId, cardId) => {

          alert(columnId + " = " + cardId);


        }} />
    </>
  )
}