import React, {useEffect, useState} from 'react';
import styles from '../styles/Home.module.css';
import {apiService, authService, StripeConnect, ReactDraft, PrivateLabelPageModule} from 'authscape';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Head from 'next/head';

export default function Home({loadedUser, setIsLoading, currentUser, setOpenLoginModal}) {

  const [paymentLink, setPaymentLink] = useState("");

  const [showInvoicePayment, setShowInvoicePayment] = useState(false);
  const [invoicePayload, setInvoicePayload] = useState(null);
  const [ticketId, setTicketId] = useState(null);

  return (
    <div className={styles.container}>

      <Head>
          <title>AuthScape | Home</title>
      </Head>

      <Box sx={{paddingBottom:2}}>
        homepage
      </Box>

      <Button variant="contained" sx={{marginRight:1}} onClick={async () => {
            await authService().login();
        }}>Login</Button>


      <Button variant="contained" sx={{marginRight:1}} onClick={async () => {
            await authService().logout();
        }}>Logout</Button>

    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  var props = await PrivateLabelPageModule(process.env.apiUri, req.headers.host);
  return { props: props };
}