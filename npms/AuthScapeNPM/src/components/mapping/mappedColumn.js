import React, {useEffect, useState, useRef} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import NewMappingColumn from './newMappingColumn';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import Stack from '@mui/material/Stack';
// import MatchExistingMappedColumn from './matchExisting';
// import { apiService } from 'authscape';

export function MappedColumn({companyId, documentId, documentType, documentMappingId, name, toName, isMapped, toOptions, onResponse}) {

  const notMatchedColor = "#ffe5e5";
  const matchedColor = "#fff";

  return (
    <Card sx={{marginTop:1}}>
      <CardContent sx={{position:"relative", backgroundColor: isMapped ? notMatchedColor : matchedColor}}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Box sx={{position:"absolute", top:"10px", right:"10px"}}>
          {isMapped ? 
          <Stack direction="row" spacing={1}>
            <LinkOffIcon />
            <Typography variant="body2" sx={{paddingTop:0.5}}>Not Matched</Typography>
          </Stack> : 
          <Stack direction="row" spacing={1}>
            <LinkIcon />
            <Typography variant="body2" sx={{paddingTop:0.5}}>Matched</Typography>
          </Stack>
          }
        </Box>
        <Typography variant="body2" color="text.secondary">
          {!isMapped && <>This column is matched with {toName}</>}
          {isMapped && <>This column is not matched. If not matched it will not import</>}
          
        </Typography>
      </CardContent>
      <CardActions sx={{backgroundColor: isMapped ? notMatchedColor : matchedColor}}>
        {!isMapped ? 
          <>
            <Button startIcon={<LinkOffIcon />} size="small" sx={{paddingLeft:3}} onClick={async () => {
                
                let response = await apiService().delete(
                  "/DocumentMapping/RemoveMatch?companyId=" + companyId + 
                  "&documentId=" + documentId + 
                  "&documentMappingId=" + documentMappingId);

                if (response != null && response.status == 200)
                {
                  onResponse();
                }

            }}>Remove Match</Button>
          </>
          :
          <>
            <MatchExistingMappedColumn companyId={companyId} documentId={documentId} documentMappingId={documentMappingId} fromName={name} toOptions={toOptions} onResponse={onResponse} />
            <NewMappingColumn name={name} companyId={companyId} documentType={documentType} documentId={documentId} documentMappingId={documentMappingId} onResponse={onResponse} />
          </>  
        }        
      </CardActions>
    </Card>
  );
}