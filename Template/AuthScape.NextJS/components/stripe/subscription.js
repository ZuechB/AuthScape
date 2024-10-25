import React, {useEffect, useState} from 'react';
import {Elements, useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import Typography from '@mui/material/Typography';
import { Select, Grid, MenuItem, Box, Button, Tab, Tabs, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import {apiService} from 'authscape';
import WalletRoundedIcon from '@mui/icons-material/WalletRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

  const CheckoutForm = ({payButtonText, invoiceId, clientSecret, currentUser, paymentMethodType, walletId, onResponse, amount}) => {

    

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

        //setIsPaymentProcessing(false);
        return;
      }


      if (amount == null || currentUser != null)
      {
        const {error} = await stripe.confirmSetup({
          //`Elements` instance that was used to create the Payment Element
          elements,
          redirect:"if_required",
          // confirmParams: {
          //   return_url: process.env.websiteBaseUri + '/confirmSetup?redirectUrl=' + encodeURIComponent(window.location.search),
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
    
          //setIsPaymentProcessing(false);
    
          let response = null;
    
          response = await stripe.retrieveSetupIntent(clientSecret);

          let setupIntent = response.setupIntent;
    
          switch (setupIntent.status) {
            case 'succeeded':

              // need to store the payment intent with the customer if they are logged in... currentUser
              let addPaymentMethodResponse = await apiService().post("/Payment/AddPaymentMethod", {
                walletId: walletId,
                paymentMethodType: paymentMethodType,
                stripePaymentMethod: setupIntent.payment_method
              });

              if (addPaymentMethodResponse != null && addPaymentMethodResponse.status == 200)
              {
                onResponse("succeeded", setupIntent.id, setupIntent.payment_method);

                if (amount != null)
                {
                  if (invoiceId != null)
                  {
                    let response = await apiService().post("/Invoices/PayInvoice", {
                        invoiceId: invoiceId,
                        walletPaymentMethodId: addPaymentMethodResponse.data
                    });
                    if (response != null && response.status == 200)
                    {
                      onResponse("paid", null);
                    }
                    else
                    {
                      onResponse("failed", null);
                    }
                  }
                  else
                  {
                    // charge the customer
                    let response = await apiService().post("/Payment/Charge", {
                        paymentMethodType: paymentMethodType,
                        walletPaymentMethodId: addPaymentMethodResponse.data,
                        amount: amount
                    });
                    
                    if (response != null && response.status == 200)
                    {
                        onResponse("paid", response.data.stripePaymentIntentId);
                    }
                    else
                    {
                      onResponse("failed", null);
                    }
                  }
                }
                
              }
              else
              {
                onResponse("failed", null);
              }
              
              break;
    
            case 'processing':
              onResponse("processing", setupIntent.id, setupIntent.payment_method);
              setIsPaymentProcessing(false);
              break;
    
            case 'requires_payment_method':
              onResponse("requires_payment_method", null);
              setIsPaymentProcessing(false);
              break;
    
            default:
              onResponse("failed", null);
              setIsPaymentProcessing(false);
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
            return_url: process.env.websiteBaseUri + '/confirmPayment?redirectUrl=' + encodeURIComponent(window.location.search),
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
              setIsPaymentProcessing(false);
              break;
    
            case 'requires_payment_method':
              onResponse("requires_payment_method", null);
              setIsPaymentProcessing(false);
              break;
    
            default:
              onResponse("failed", null);
              setIsPaymentProcessing(false);
              break;
          }

          
        }
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <Button startIcon={<PaymentRoundedIcon/>} type="submit" fullWidth={true} variant="contained" disabled={(!stripe || isPaymentProcessing)} sx={{marginTop:2, padding:2}}>{payButtonText != null ? payButtonText : (amount != null ? "Pay Now" : "Add Payment Method")}</Button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    )
  };

  export default function Subscription({amount = null, priceId = null, isSubscription = false, stripeCustomerId = null, logOffUserName, invoiceId = null, logOffEmail, paymentMethodType = 3, currentUser, onResponse, payButtonText = null}) {

    const [options, setOptions] = useState(null);
    const [walletId, setWalletId] = useState(null);
    const [value, setValue] = useState(0);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [stripePromise, setStripePromise] = useState(null);

    const [showAddPayment, setShowAddPayment] = useState(false);
    const [showRemovePaymentMethod, setShowRemovePaymentMethod] = useState(null);

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

    const PaymentMethod = ({paymentMethod, clicked}) => {
        return (
            <Box fullWidth={true} sx={{height: 160, marginTop:2, backgroundColor:"#2196F3", position:"relative", border: "1px solid #2196F3", borderRadius: 1, display:"flex", flexDirection:"column", justifyContent:"center", textAlign:"center"}}>
                  <Box sx={{position:"absolute", top: 5, right: 5}}>
                    <IconButton aria-label="delete" size="large" onClick={() => {
                       setShowRemovePaymentMethod(paymentMethod);
                    }}>
                      <DeleteRoundedIcon sx={{color:"white"}} />
                    </IconButton>
                  </Box>
                <Typography gutterBottom variant="body" component="div" sx={{fontSize:18, position:"absolute", left:15, top:10, color:"white"}}>
                    {paymentMethod.brand} {paymentMethod.bankName }
                </Typography>
                <Typography gutterBottom variant="body" component="div" sx={{verticalAlign:"middle", fontSize:18, color:"white"}}>
                    * * * * &nbsp; * * * * &nbsp; * * * * &nbsp; {paymentMethod.last4}
                </Typography>

                <Grid container spacing={1} sx={{position:"absolute", bottom:8, marginLeft:0, width: "100%"}}>
                    <Grid item xs={12} sx={{textAlign:"right", paddingRight:2}}>
                        <Typography gutterBottom variant="body" component="div" sx={{fontSize:12, marginLeft:2, marginTop:1, color:"#e9e9e9"}}>
                          {paymentMethod.accountType == null ? "EXPIRES" : "Account Type"}
                        </Typography>

                        <Typography gutterBottom variant="body" component="div" sx={{fontSize:12, marginLeft:2, marginTop:"-9px", color:"white"}}>
                            {paymentMethod.accountType != null ?
                            <>
                              {paymentMethod.accountType}
                            </>                            
                            :
                            <>
                              {paymentMethod.expMonth}/{paymentMethod.expYear}
                            </>
                            }
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        );
    };

    const PaymentContent = () => {
        return (            
            <Box sx={{ width: '100%' }}>

                {currentUser != null &&
                <Box>
                  <Box sx={{fontWeight:"bold", fontSize:20, paddingBottom:2}}>
                    Active Subscriptions
                  </Box>
                  <Box sx={{paddingBottom:4}}>
                    Card UI for subscriptions
                  </Box>

                  <Box sx={{fontWeight:"bold", fontSize:20, paddingBottom:2}}>
                    Payment Methods
                  </Box>
                  <hr/>

                  <Box>
                    <Box>
                      <Grid container spacing={2}>

                        <Grid item xs={3}>
                          <Box fullWidth={true} sx={{height: 160, marginTop:2, backgroundColor:"#2196F3", position:"relative", border: "1px solid #2196F3", borderRadius: 1, display:"flex", flexDirection:"column", justifyContent:"center", textAlign:"center"}}>
                              <Typography gutterBottom variant="body" component="div" sx={{fontSize:18, position:"absolute", left:15, top:10, color:"white"}}>
                              <WalletRoundedIcon sx={{position:"relative", top:6}} /> {"Wallet"}
                              </Typography>
                              <Typography gutterBottom variant="body" component="div" sx={{verticalAlign:"middle", fontSize:18, color:"white"}}>
                                  Credit: $0.00
                              </Typography>

                              <Grid container spacing={1} sx={{position:"absolute", bottom:14, marginLeft:0, width: "100%"}}>
                                  <Grid item xs={12} sx={{textAlign:"center"}}>
                                    <Button startIcon={<AddRoundedIcon/>} variant="outlined" sx={{color:"white", borderColor:"white"}}
                                    onClick={() => {
                                      alert("Add Money now")
                                    }}
                                    >Add Money</Button>
                                  </Grid>
                              </Grid>
                          </Box>
                        </Grid>

                        {paymentMethods != null && paymentMethods.map((paymentMethod, index) => {
                            return (
                              <Grid item xs={3} key={index}>
                                <PaymentMethod paymentMethod={paymentMethod} clicked={() => {
                                }} />
                              </Grid>
                            )
                        })}


                        <Grid item xs={3}>
                          <Box fullWidth={true} sx={{height: 160, marginTop:2, backgroundColor:"#1E6FB1", position:"relative", border: "1px solid #2196F3", borderRadius: 1, display:"flex", flexDirection:"column", justifyContent:"center", textAlign:"center", cursor:"pointer"}}
                          onClick={() => {
                            setShowAddPayment(true);
                          }}>
                              <Typography gutterBottom variant="body" component="div" sx={{verticalAlign:"middle", fontSize:18, color:"white"}}>
                                <AddRoundedIcon sx={{position:"relative", top:6}}/> ADD NEW CARD
                              </Typography>
                          </Box>
                        </Grid>


                      </Grid>
                    </Box>
                  </Box>
                  

                  <Box sx={{fontWeight:"bold", fontSize:20, paddingBottom:2, paddingTop:4}}>
                    Payment History
                  </Box>
                  <hr/>

                  <Box>
                    Your history of payments
                  </Box>


                  <Dialog
                    open={showAddPayment}
                    fullWidth={true}
                    onClose={() => {
                      setShowAddPayment(false);
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
                        setShowAddPayment(false);
                      }}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}>
                      <CloseIcon />
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



                  <Dialog
                    open={showRemovePaymentMethod != null ? true : false}
                    fullWidth={true}
                    maxWidth={"xs"}
                    onClose={() => {
                      setShowRemovePaymentMethod(null);
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Remove Payment Method"}
                    </DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={() => {
                        setShowRemovePaymentMethod(null);
                      }}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}>
                      <CloseIcon />
                    </IconButton>

                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <Box sx={{paddingBottom:2}}>
                          Are you sure you want to remove this payment method?
                        </Box>

                        {showRemovePaymentMethod != null &&
                          <Box>
                            {/* <Box>
                              {showRemovePaymentMethod.id}
                            </Box> */}
                            <Box>
                              Exp Month: {showRemovePaymentMethod.expMonth}
                            </Box>
                            <Box>
                              Exp Year: {showRemovePaymentMethod.expYear}
                            </Box>
                            <Box>
                              Last 4: {showRemovePaymentMethod.last4}
                            </Box>
                            <Box>
                              Brand: {showRemovePaymentMethod.brand}
                            </Box>
                          </Box>
                          }

                      </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                      <Button autoFocus onClick={() => {
                        setShowRemovePaymentMethod(null);
                      }}>
                        Cancel
                      </Button>

                      <Button autoFocus onClick={async () => {
                        setShowRemovePaymentMethod(null);

                        let response = await apiService().delete("/Payment/RemovePaymentMethod?id=" + showRemovePaymentMethod.id);
                        if (response != null && response.status == 200)
                        {
                          await paymentMethodOpened();
                          setShowRemovePaymentMethod(null);
                        }
                      }}>
                        Remove
                      </Button>
                    </DialogActions>

                  </Dialog>
                </Box>
                }
            </Box>
        )
    }

    return (
        <PaymentContent />
    )
}
