import React, {useEffect, useState} from 'react';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Button, Card, CardActions, CardContent, CardMedia, Stack } from "@mui/material";
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { apiService } from 'authscape';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


//import {Comments} from './comments';


export const TicketDetail = ({ticketId, setIsLoading, currentUser, GoBackToViewTickets = null, customTabName = null, customTabElement = null}) => {
  
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState(null);
  const [ticketType, setTicketType] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [priorty, setPriority] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [ticketAttachments, setTicketAttachments] = useState([]);
  const [customTabPayload, setCustomTabPayload] = useState(null);

  const [ticketDescription, setTicketDescription] = useState(null);

  const [createdByList, setCreatedByList] = useState([]);
  const [selectedCreatedBy, setSelectedCreatedBy] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      let response = await apiService().get("/Ticket/GetTicket?ticketId=" + ticketId);
      if (response != null && response.status == 200)
      {
        setTicket(response.data);

        setIsLoading(false);
        setStatus(response.data.selectedTicketStatusId);
        setTicketType(response.data.selectedTicketTypeId);
        setPriority(response.data.selectedPriortyId);
        setSelectedCreatedBy(response.data.selectedCreatedBy);
        setParticipants(response.data.participants);
        setTicketAttachments(response.data.attachments);
        setCustomTabPayload(response.data.customTabPayload);
        setTicketDescription(response.data.description);
      }
    }

    if (ticketId != null)
    {
      fetchData();
    }

  }, [ticketId]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const refreshCreatedByList = async (query) => {

    let response = await apiService().get("/ticket/findUser?query=" + query);
    if (response != null && response.status == 200)
    {
      setCreatedByList(response.data);
    }
  }

  const DownloadFile = ({fileName, uri}) => {

    return (
      <Card
        sx={{
          border: "1px solid black",
          padding: "10px",
          margin: "10px",
          width: "200px",
          textAlign:"center",
          // display: "flex",
          // alignItems: "center",
          justifyContent: "space-between",
        }}>
          <Stack spacing={2}>
            <Box sx={{textAlign:"center"}}>
              <InsertDriveFileRoundedIcon sx={{fontSize:50}} />
            </Box>
            <Typography variant="h6" component="div">
              {fileName}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => {
              window.open(uri);
            }}>
              Download
            </Button>
          </Stack>
      </Card>
    )
  }



  return (
    <div>

      <Box sx={{width: '100%' }}>

      <IconButton aria-label="delete" size="small" sx={{position:"absolute", right: 20, top: 20}} onClick={() => {

          if (GoBackToViewTickets != null)
          {
            GoBackToViewTickets();
          }

          }}>
        <CloseRoundedIcon fontSize="inherit" sx={{width:40, height:40}} />
      </IconButton>
        

        <Box>
          <h2>{ticket != null && ticket.name}</h2>
        </Box>
    
        <Grid container spacing={2}>
          <Grid item xs={4}>

            <Box sx={{ minWidth: 120 }}>
              <Box>
                Status:
              </Box>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  InputLabelProps={{ shrink: true }}
                  onChange={async (val) =>{
                    setStatus(val.target.value);

                    await apiService().put("/ticket/UpdateStatus", {
                      id: ticket.id,
                      ticketStatusId: val.target.value
                    });

                  }}>

                    {ticket != null && ticket.ticketStatuses.map((status, index) => {
                      return (
                        <MenuItem key={index} value={status.id}>{status.name}</MenuItem>
                      )
                    })}
                  
                </Select>
              </FormControl>
            </Box>

            <Box sx={{paddingTop:2}}>
              <Box>
                Assigned to:
              </Box>

              {selectedCreatedBy != null &&
                <Autocomplete
                    disablePortal
                    options={createdByList}
                    value={selectedCreatedBy}
                    onChange={async (event, newValue) => {
                        setSelectedCreatedBy(newValue.id);
                    }}
                    renderInput={(params) => <TextField {...params} label={""} onChange={(val) => {
                      refreshCreatedByList(val.currentTarget.value);
                    }} />}
                  />
              }

              {ticket != null &&
              <>
                <Box sx={{paddingTop:1, fontSize:18}}>
                  {ticket.assignedFirstName + " " + ticket.assignedLastName} ({ticket.assignedEmail})
                </Box>
              </>
              }

            </Box>

            {/* <Box>
            Company
            </Box> */}

            <Box sx={{paddingTop:2}}>
              <Box sx={{ minWidth: 120 }}>
                <Box>
                  Priority:
                </Box>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={priorty}
                    label=""
                    onChange={async (val) =>{
                      setPriority(val.target.value);

                      await apiService().put("/ticket/UpdateTicketPriority", {
                        id: ticket.id,
                        priorityLevel: val.target.value
                      });

                    }}>
                      <MenuItem value={0}>None</MenuItem>
                      <MenuItem value={1}>Low</MenuItem>
                      <MenuItem value={2}>Medium</MenuItem>
                      <MenuItem value={3}>High</MenuItem>
                      <MenuItem value={4}>Urgent</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            

          </Grid>
          <Grid item xs={4}>
            
            <Box sx={{ minWidth: 120 }}>
              <Box>
                Ticket Type:
              </Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="ticketType"
                  value={ticketType}
                  label=""
                  onChange={async (val) =>{
                    setTicketType(val.target.value);

                    await apiService().put("/ticket/UpdateTicketType", {
                      id: ticket.id,
                      TicketTypeId: val.target.value
                    });

                  }}>
                    {ticket != null && ticket.ticketTypes.map((status, index) => {
                      return (
                        <MenuItem key={index} value={status.id}>{status.name}</MenuItem>
                      )
                    })}
                  
                </Select>
              </FormControl>
            </Box>

            <Box sx={{paddingTop:2}}>
              
              <Box>
                Participants:
              </Box>
              <Autocomplete
                  multiple={true}
                  disablePortal
                  value={participants}
                  options={createdByList}
                  onChange={async (event, newValue) => {

                    // alert(JSON.stringify(newValue));

                    await apiService().put("/ticket/UpdateParticipants", {
                      ticketId: ticketId,
                      participants: newValue
                    });

                      setParticipants(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} label={""} onChange={(val) => {
                    refreshCreatedByList(val.currentTarget.value);
                  }} />}
                />
              {/* <TextField id="lastUpdated" fullWidth={true} InputLabelProps={{ shrink: true }} disabled={true} label="Participants" variant="outlined" autoFocus={true} value={(ticket != null ? ticket.lastUpdated : "")} /> */}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Box>
                Created:
              </Box>
              <TextField id="created" fullWidth={true} InputLabelProps={{ shrink: true }} disabled={true} label="" variant="outlined" autoFocus={true} value={(ticket != null ? ticket.created : "")} />
            </Box>
            <Box sx={{paddingTop:2}}>
              <Box>
                Last Updated:
              </Box>
              <TextField id="lastUpdated" fullWidth={true} InputLabelProps={{ shrink: true }} disabled={true} label="" variant="outlined" autoFocus={true} value={(ticket != null ? ticket.lastUpdated : "")} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: '100%', marginTop:2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Description" {...a11yProps(0)} />
            <Tab label="Chat" {...a11yProps(1)} />
            <Tab label="Notes" {...a11yProps(2)} />
            <Tab label="Attachments" {...a11yProps(3)} />

            {customTabName != null &&
                <Tab label={customTabName} {...a11yProps(4)} />
            }

          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>

          <Box sx={{whiteSpace:"pre-wrap"}}>
            <Box dangerouslySetInnerHTML={{
                __html: ticketDescription,
            }}>
            </Box>
          </Box>

        </TabPanel>

        <TabPanel value={value} index={1}>

          {ticket != null &&
            <Comments ticketId={ticket.id} isDisabled={false} isNote={false} currentUser={currentUser} />
          }

        </TabPanel>
        <TabPanel value={value} index={2}>
          {ticket != null &&
            <Comments ticketId={ticket.id} isDisabled={false} isNote={true} currentUser={currentUser} />
          }
        </TabPanel>
        <TabPanel value={value} index={3}>
          {ticket != null &&
            <>
              {ticketAttachments.map((attachment) => {
                return (
                  <DownloadFile fileName={attachment.name} uri={attachment.url} />
                )
              })}

              {ticketAttachments.length == 0 &&
                <Box>
                  There are no attachments
                </Box>
              }
              
            </>
          }
        </TabPanel>

        {customTabName != null &&
            <TabPanel value={value} index={4}>
                {customTabElement(customTabPayload)}
            </TabPanel>
        }

      </Box>

    </div>
  )
}