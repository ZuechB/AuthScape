import React, {useEffect, useState} from 'react';
import { Box } from '@mui/system';
// import Tickets from '../../components/tickets/Tickets';
import Tickets from 'authscape-tickets';

export default function Home({setIsLoading, currentUser}) {

  return (
    <Box>
      <Tickets setIsLoading={setIsLoading} currentUser={currentUser} />
    </Box>
  )
}
