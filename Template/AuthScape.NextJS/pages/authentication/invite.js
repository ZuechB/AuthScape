import React, {useEffect, useState} from 'react';
import { Box, Button } from '@mui/material';
import { apiService, authService } from 'authscape';

export default function Invite({currentUser}) {

    return (
        <Box >
            <Button variant="contained" onClick={async () => {

                let invitedUsers = [];


                invitedUsers.push({
                    firstName: "Brandon",
                    lastName: "Zuech",
                    email: "adasdasddda@asdaasdasd.com",
                    companyId: 1,
                });


                let sendUserInvites = await authService().inviteUsers(invitedUsers);

                // let sendUserInvites = await apiService().post(
                //     process.env.authorityUri + "/Invite/InviteUsers",
                //     invitedUsers
                // );


                alert(sendUserInvites.data);


            }}>Invite User</Button>
        </Box>
    )
}
