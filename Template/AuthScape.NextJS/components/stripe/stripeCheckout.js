import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
import StripePayment, { WhiteLabelPageModule } from 'authscape';
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import {apiService} from 'authscape';

export default function Home({currentUser, paymentMethodType = 3, amount}) {

    const [options, setOptions] = useState(null);



    const paymentMethodOpened = async () => {

        let response = null;
        if (currentUser == null)
        {
            response = await apiService().post("/Payment/ConnectCustomerNoAuth", {
                paymentMethodType: paymentMethodType,
                amount: amount,
                priceId: priceId,
                name: logOffUserName,
                email: logOffEmail,
                stripeCustomerId: stripeCustomerId
            });
        }
        else
        {
            response = await apiService().post("/Payment/ConnectCustomer", {
                paymentMethodType: paymentMethodType,
                amount: amount,
                priceId: priceId,
                stripeCustomerId: stripeCustomerId
            });
        }
        
        if (response != null && response.status == 200)
        {
            setOptions({
                clientSecret: response.data.clientSecret,
                stripePublicKey: response.data.stripePublicKey
            });

            setStripePromise(loadStripe(response.data.stripePublicKey))

            setWalletId(response.data.walletId);

            let responsePayments = await apiService().get("/Payment/GetPaymentMethods?paymentMethodType=" + paymentMethodType);

            if (responsePayments != null && responsePayments.status == 200)
            {
                if (responsePayments.data.length > 0)
                {
                    setValue(1);
                }
                setPaymentMethods(responsePayments.data);
            }
        }
    }


    useEffect(() => {

        paymentMethodOpened();
  
    }, []);

    return (
        <Dialog
            open={true}
            fullWidth={true}
            onClose={() => {
                // setShowAddPayment(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {"Add Payment Method"}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => {
                // setShowAddPayment(false);
                }}
                sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
                }}>
                <CloseRounded />
            </IconButton>


            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{paddingBottom:2}}>
                Enter your payment details in the provided fields, verify the information, and click ‘Add Payment Method’ to save.
                </DialogContentText>

                {(options != null && stripePromise != null) &&
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm payButtonText={payButtonText} invoiceId={invoiceId} clientSecret={options != null ? options.clientSecret : null} onResponse={async (response, id, paymentMethod) => {
                        
                        await onResponse(response, id, paymentMethod);
                        await paymentMethodOpened();
                        setShowAddPayment(false);

                        }} paymentMethodType={paymentMethodType} walletId={walletId} currentUser={currentUser} amount={amount} />
                    </Elements>
                }
            </DialogContent>
        </Dialog>
    )
}