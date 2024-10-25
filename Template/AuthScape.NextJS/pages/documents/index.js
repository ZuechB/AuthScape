import React, {useEffect, useState, useRef} from 'react';
// import {DocumentManager} from 'authscape'
import { DocumentManager } from '../../components/documents/DocumentManager';
import { Box } from '@mui/material';

const Documents = ({loadedUser, currentUser, setIsLoading}) => {

  return (
    <>
      <DocumentManager loadedUser={loadedUser} setIsLoading={setIsLoading} disablePreview={true} />
    </>
  );

};

export default Documents;