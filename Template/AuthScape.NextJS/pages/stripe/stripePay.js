import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
// import StripePayment, { WhiteLabelPageModule } from 'authscape';
import { Button, TextField } from '@mui/material';
import StripeCheckout from '../../components/stripe/stripeCheckout';

export default function Home({setIsLoading, currentUser, oemCompanyId}) {

    const amountRef = useRef(null);
    const invoiceRef = useRef(null);


    const [amount, setAmount] = useState(null);
    const [invoiceId, setInvoiceId] = useState(null);

    return (
        <Box>
            <Box sx={{paddingBottom:2}}>
                Stripe Pay
            </Box>
            
            <StripeCheckout />
            <hr />

            <Box sx={{paddingTop:3}}>

                <Box>
                    Assign a price to change the state of the payment interface
                </Box>

                <Box sx={{marginTop:2}}>
                    <TextField inputRef={amountRef} label="Price" variant="outlined" />
                </Box>

                <Box sx={{marginTop:1}}>
                    <Button variant="contained" onClick={() => {

                        if (amountRef.current.value == null || amountRef.current.value == "")
                        {
                            setAmount(null);
                        }
                        else
                        {
                            setAmount(amountRef.current.value);
                        }

                    }}>Change Price</Button>
                </Box>

                <hr />

                <Box sx={{marginTop:2}}>
                    <TextField inputRef={invoiceRef} label="InvoiceId" variant="outlined" />
                </Box>

                <Box sx={{marginTop:1}}>
                    <Button variant="contained" onClick={() => {

                        if (invoiceRef.current.value == null || invoiceRef.current.value == "")
                        {
                            setInvoiceId(null);
                        }
                        else
                        {
                            setInvoiceId(invoiceRef.current.value);
                        }

                    }}>Set Invoice</Button>
                </Box>
            </Box>


        </Box>
    )
}

// export async function getServerSideProps({req, res }) {
//     var props = await WhiteLabelPageModule(process.env.apiUri, req.headers.host)
//     return { props: props };
// }