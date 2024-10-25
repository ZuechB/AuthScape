import React, {useEffect, useState} from 'react';
import { Box } from '@mui/system';
import { ViewInvoices } from '../../components/invoices/ViewInvoices';
import InvoiceComponent from "../../components/invoices/invoiceComponent";
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Home({loadedUser, setIsLoading, currentUser}) {

  const [data, setData] = useState(null);

  return (
    <Box>

        <ViewInvoices title={"Invoices"} disablePayment={true} buttonNameType={"Invoice"} currentUser={currentUser} loadedUser={loadedUser} onViewInvoice={(id, secret) => {
          setData({invoiceId: id, secret: secret});
        }}/>

        <Dialog
          fullScreen
          open={data != null ? true : false}
          onClose={() => {
            setData(null);
          }}>

          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Invoices
              </Typography>

              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  setData(null);
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

            {data != null &&
              <InvoiceComponent title={"Invoices"} disablePayment={false} currentUser={currentUser} loadedUser={loadedUser} setIsLoading={setIsLoading} editorMode={true} invoiceId={data.invoiceId} secret={data.secret} />
            }

        </Dialog>

        

    </Box>
  )
}
