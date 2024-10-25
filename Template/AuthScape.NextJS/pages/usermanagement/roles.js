import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { apiService } from 'authscape';

export default function Home({currentUser}) {

    const roleNameRef = useRef(null);
    const [roles, setRoles] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
        await RefreshRoles();
    }
    fetchData();

  }, []);

  const RefreshRoles = async () => {
    let response = await apiService().get("/UserManagement/GetRoles");
    if (response != null && response.status == 200)
    {
        setRoles(response.data);
    }
  }


  return (
    <Box sx={{paddingTop:8}}>
        <Typography variant="h3" gutterBottom>
            Role Manager
        </Typography>
        <Stack direction="row" spacing={1} sx={{paddingTop:2}}>
            <TextField inputRef={roleNameRef} id="outlined-basic" label="New Role" variant="outlined" fullWidth={true} />
            <Button variant="contained" sx={{width:200}} onClick={async () => {

                let response = await apiService().post("/UserManagement/AddRole", { role: roleNameRef.current.value });
                if (response != null)
                {
                    await RefreshRoles();
                    // should refresh the getallroles dataset
                }

            }}>Add Role</Button>
        </Stack>

        <TableContainer component={Paper} sx={{marginTop:2}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {roles.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
  )
}
