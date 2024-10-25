import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
import {UserManagement} from 'authscape';

// import { UserManagement } from '../../components/UserManagement';

export default function Index({currentUser}) {

    const customFields = [
        {
            name: "Department / Group",
            isRequired: false
        },
        {
            name: "Business Phone",
            isRequired: true
        }
    ];

    return (
        <Box sx={{paddingTop:8}}>
            {currentUser.hasRole("Brand") == true ? "true" : "false"}
            <br/>
            {currentUser.hasPermission("Inventory Management") == true ? "true" : "false"}
        </Box>
    );
}