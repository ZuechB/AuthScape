import React, { useEffect, useState, useRef } from 'react';
import { Box, Paper } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import scrollIntoView from 'scroll-into-view-if-needed'
import Stack from '@mui/material/Stack';
import { apiService } from 'authscape';

export function Comments({ticketId, isNote, isDisabled, currentUser}) {

    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState("");
    // const [messageDialogOpen, setMessageDialogOpen] = useState(false);

    const reloadMessages = async () => {
        
        // setIsLoading(true);

        let response = await apiService().get("/Ticket/GetMessages?TicketId=" + ticketId + "&isNote=" + isNote);
        if (response != null && response.status == 200)
        {
            setComments(response.data);
        }

        const node = document.getElementById('messages');
        if (node != null)
        {
            scrollIntoView(node, { behavior: 'smooth', scrollMode: 'if-needed' })    
        }

        // setIsLoading(false);

    }

    useEffect(() => {
        
        if (ticketId != null)
        {
            const asyncPush = async () => {
                await reloadMessages();
            }
            asyncPush();
        }

    }, [ticketId]);

    const SendMessage = async () => {
        
        if (message !== "")
        {
            let response = await apiService().post("/Ticket/CreateMessage", {
                ticketId: ticketId,
                name: currentUser.firstName,
                message: message,
                isNote: isNote
            });

            if (response != null && response.status == 200)
            {
                await reloadMessages();
                // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                // let messages = comments.slice();
                // messages.push(message);
                // setComments(messages);
                setMessage("");
            }
        }
    }

    return (
        <Box sx={{display:"flex", flexDirection:"column", height:"100%"}}>
            <Box sx={{backgroundColor:"#F3F5F7", overflow:"auto", flex: "1 1 auto"}}>
                <Box>
                    {comments.length == 0 &&
                    <Box sx={{paddingLeft:4}}>
                        <QuestionAnswerOutlinedIcon sx={{fill:"gray", position:"relative", top:"4px", marginRight:2}} fontSize={"2px"} />
                        <Typography variant="subtitle2" color="text.secondary" component="span" sx={{marginTop:1}}>
                            Add your first {isNote ? "note" : "message"  }. {isNote ? "Your notes" : "The conversation history" } will appear here
                        </Typography>
                    </Box>
                    }
                    <Box sx={{overflow:"scroll", height:"300px"}}>
                        <Grid container>
                            <Grid item xs={12}>
                                <List>
                                    {comments != null && comments.map((comment, index) => {
                                        return (
                                        <ListItem key={index} sx={{marginTop:1}}>
                                            <Grid container>
                                                <Grid item xs={1}>
                                                    <Avatar />
                                                </Grid>
                                                <Grid item xs={11}>
                                                    <Stack direction="row" spacing={1}>
                                                        <Box sx={{fontSize:12}}>{comment.firstName}</Box>
                                                        <Box sx={{fontSize:12}}>{comment.created}</Box>
                                                    </Stack>
                                                    <Box sx={{fontSize:16}}>{comment.message}</Box>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        )
                                    })}

                                    <ListItem>
                                        <div id={"messages"}></div>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>

            <Box sx={{flex: "0 1 40px"}}>
                <Paper
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        disabled={isDisabled}
                        onKeyUp={(event) => {
                            if (event.key == "Enter")
                            {
                                SendMessage();
                            }
                        }}
                        placeholder={!isNote ? "Write your message here..." : "Write your notes here..."}
                        value={message}
                        onChange={(value) => {
                            setMessage(value.target.value);
                        }}
                    />
                    <IconButton disabled={isDisabled} type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => {
                        SendMessage();
                    }}>
                        <SendRoundedIcon />
                    </IconButton>
                </Paper>
            </Box>
        </Box>
    );
}