import React, {useEffect, useState} from 'react';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/router';
import { YesNoDialog, apiService, EditableDatagrid } from 'authscape';
//import { TicketDetail } from './ticketDetail';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

export default function Tickets({setIsLoading, currentUser, customTabName = null, customTabElement = null }) {

  const [archiveTicketId, setArchiveTicketId] = useState(null);
  const [ticketStatuses, setTicketStatuses] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketTypeId, setTicketTypeId] = useState(null);
  const [dataGridRefreshKey, setDataGridRefreshKey] = useState(0);
  const [statusId, setStatusId] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const router = useRouter();

  useEffect(() => {

    if (router.query.id != null)
    {
      setSelectedTicketId(router.query.id);
    }

  }, [router.isReady])
  
  const columns = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'title', flex: 1, headerName: 'Customer', width: 200 },
    { field: 'ticketStatus', headerName: 'Status', width: 150 },
    { field: 'ticketType', headerName: 'Ticket Type', width: 150 },
    { field: 'created', headerName: 'Created', width: 150 },
    { field: 'ticketParticipants', headerName: 'Participants', width: 150 },
    { field: 'messages', headerName: 'Messages', width: 150 },
    {
      field: "actions",
      type: "actions",
      width: 200,
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem key={id}
            icon={<VisibilityRoundedIcon />}
            label="View"
            onClick={() => {
              setSelectedTicketId(row.id);
            }}
          />,
          <GridActionsCellItem key={id}
            icon={<DeleteRoundedIcon />}
            label="Delete"
            className="textPrimary"
            onClick={() => {
              setArchiveTicketId(row.id);
            }}
          />,
        ];
      },
    }
  ];

  useEffect(() => {

      let fetchStatusesAndTypes = async () => {
        let responseStatus = await apiService().get("/Ticket/GetStatuses");
        if (responseStatus != null && responseStatus.status == 200)
        {
          setTicketStatuses(responseStatus.data);
        }

        let responseType = await apiService().get("/Ticket/GetTicketTypes");
        if (responseType != null && responseType.status == 200)
        {
          setTicketTypes(responseType.data);
        }
      }

      fetchStatusesAndTypes();
      setTicketStatuses();

  }, []);


  useEffect(() => {

      let newKey = dataGridRefreshKey + 1;
      setDataGridRefreshKey(newKey);

  }, [ticketTypeId, statusId]);
  
  return (
  <Box>
      <Grid container spacing={2} sx={{paddingTop:2, paddingBottom:2}}>
        <Grid item xs={4}>

          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Ticket Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={statusId}
                label="ticketStatus"
                onChange={(event) => {
                  setStatusId(event.target.value);
                }}>

                <MenuItem value={null}>Not Assigned</MenuItem>

                {ticketStatuses != null && ticketStatuses.map((tStatus) => {
                  return (
                    <MenuItem value={tStatus.id}>{tStatus.name}</MenuItem>
                  )                
                })}

              </Select>
            </FormControl>
          </Box>

        </Grid>
        <Grid item xs={4}>

          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Ticket Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ticketTypeId}
                label="TicketType"
                onChange={(event) => {
                  setTicketTypeId(event.target.value);
                }}>

                <MenuItem value={null}>Not Assigned</MenuItem>

                {ticketTypes != null && ticketTypes.map((tTicketType) => {
                  return (
                    <MenuItem value={tTicketType.id}>{tTicketType.name}</MenuItem>
                  )                
                })}

              </Select>
            </FormControl>
          </Box>

        </Grid>
      </Grid>

      <Box sx={{height: 600, width: '100%' }}>
        <EditableDatagrid 
          height={"80vh"}
          key={dataGridRefreshKey} 
          url={"/ticket/GetTickets"}
          params={{
            ticketStatusId: statusId,
            ticketTypeId: ticketTypeId
          }}
          columns={columns}
        />
      </Box>


      <Dialog
        open={selectedTicketId != null ? true : false}
        onClose={() => {

          let newKey = dataGridRefreshKey + 1;
          setDataGridRefreshKey(newKey);

          setSelectedTicketId(null);
        }}
        fullWidth={true}
        maxWidth={"lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
          <Box sx={{padding:2, width:"100%"}}>
              <TicketDetail ticketId={selectedTicketId} setIsLoading={setIsLoading} currentUser={currentUser} customTabName={customTabName} customTabElement={customTabElement} GoBackToViewTickets={() =>
              {
                let newKey = dataGridRefreshKey + 1;
                setDataGridRefreshKey(newKey);
                setSelectedTicketId(null);
              }} />
          </Box>
        </DialogContent>
      </Dialog>


      <YesNoDialog open={archiveTicketId != null ? true : false} title={"Remove Ticket"} message={"Are you sure you want to close this ticket?"} 
        YesAction={async () => {
          await apiService().delete("/Ticket/ArchiveTicket?id=" + archiveTicketId);

          let newKey = dataGridRefreshKey + 1;
          setDataGridRefreshKey(newKey);
          setArchiveTicketId(null);
          setSelectedTicketId(null);

        }} 
        NoAction={() => {
          
          let newKey = dataGridRefreshKey + 1;
          setDataGridRefreshKey(newKey);
          setArchiveTicketId(null);
          setSelectedTicketId(null);

        }} />
  </Box>
  )
}