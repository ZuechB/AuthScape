import React, {useEffect, useState} from 'react';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { apiService } from 'authscape';

export default function Home({loadedUser, setIsLoading, currentUser}) {

//   const [paymentLink, setPaymentLink] = useState("");

  return (
    <Box>
        Stripe Connect

        <Box sx={{paddingTop:2}}>
          <Button variant="contained" onClick={async () => {

              let email = "Brandonzuech%2Bconnected@gmail.com";

              let response = await apiService().get("/TestStripe/Connect?email=" + email);
              if (response != null && response.status == 200)
              {
                alert(response.data);
              }

              alert(response.status)

          }}>Stripe Connect</Button>
        </Box>
    </Box>
  )
}
