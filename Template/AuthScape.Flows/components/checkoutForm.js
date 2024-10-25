import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';

const CheckoutForm = ({payButtonText, clientSecret, onResponse, amount}) => {

  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {

    setIsPaymentProcessing(true);

    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.

      setIsPaymentProcessing(false);
      return;
    }


    if (amount == null)
    {
      const {error} = await stripe.confirmSetup({
        //`Elements` instance that was used to create the Payment Element
        elements,
        redirect:"if_required",
        // confirmParams: {
        //   return_url: process.env.WebsiteBaseUri + '/confirmSetup?redirectUrl=' + encodeURIComponent(window.location.search),
        // },
      });
  
      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setIsPaymentProcessing(false);
        setErrorMessage(error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
  
        setIsPaymentProcessing(false);
  
        let response = null;
  
        response = await stripe.retrieveSetupIntent(clientSecret);

        //
        
        let setupIntent = response.setupIntent;
  
        switch (setupIntent.status) {
          case 'succeeded':
  
            // need to store the payment intent with the customer if they are logged in... currentUser
            onResponse("succeeded", setupIntent.id, setupIntent.payment_method);
            break;
  
          case 'processing':
            onResponse("processing", setupIntent.id, setupIntent.payment_method);
            break;
  
          case 'requires_payment_method':
            onResponse("requires_payment_method", null);
            break;
  
          default:
            onResponse("failed", null);
            break;
        }
      }

    }
    else
    {
      const {error} = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        redirect:"if_required",
        confirmParams: {
          return_url: process.env.WebsiteBaseUri + '/confirmPayment?redirectUrl=' + encodeURIComponent(window.location.search),
        },
      });
  
      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setIsPaymentProcessing(false);
        setErrorMessage(error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
  
  
        setIsPaymentProcessing(false);
  
        let response = null;
  
        if (amount == null)
        {
          response = await stripe.retrieveSetupIntent(clientSecret);
        }
        else
        {
          response = await stripe.retrievePaymentIntent(clientSecret);
        }
        
        let paymentIntent = response.paymentIntent;
  
        switch (paymentIntent.status) {
          case 'succeeded':
  
            // need to store the payment intent with the customer if they are logged in... currentUser
            onResponse("succeeded", paymentIntent.id);
            break;
  
          case 'processing':
            onResponse("processing", paymentIntent.id);
            break;
  
          case 'requires_payment_method':
            onResponse("requires_payment_method", null);
            break;
  
          default:
            onResponse("failed", null);
            break;
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button startIcon={<PaymentRoundedIcon/>} type="submit" fullWidth={true} variant="contained" disabled={(!stripe || isPaymentProcessing)} sx={{marginTop:2}}>{payButtonText}</Button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
};

export default CheckoutForm;