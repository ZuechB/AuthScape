import React, {useEffect, useState} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CheckoutForm from './checkoutForm';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {apiService} from 'authscape';
import Grid from '@mui/material/Grid';

export default function StripePayment({title, description, amount = null, priceId = null, stripeCustomerId = null, isModal = true, logOffUserName, logOffEmail, paymentRequestType = 3, currentUser, isOpen, onModalClose, onResponse, payButtonText = "PAY NOW"}) {

    const stripePromise = loadStripe(process.env.stripePublicKey);
    const [options, setOptions] = useState(null);
    const [value, setValue] = useState(0);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(null);

    const paymentMethodOpened = async () => {

        let response = null;
        if (currentUser == null)
        {
            response = await apiService().post("/Payment/ConnectCustomerNoAuth", {
                paymentRequestType: paymentRequestType,
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
                paymentRequestType: paymentRequestType,
                amount: amount,
                priceId: priceId,
                stripeCustomerId: stripeCustomerId
            });
        }
        

        if (response != null && response.status == 200)
        {
            setOptions({
                clientSecret: response.data,
            });

            let responsePayments = await apiService().get("/Payment/GetPaymentMethods");
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

        if (isOpen)
        {
            paymentMethodOpened();
        }

    }, [isOpen]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const PaymentMethod = ({paymentMethod, clicked}) => {
        return (
            <Box fullWidth={true} sx={{height: 160, width:"100%", marginTop:2, backgroundColor:"#2196F3", position:"relative", border: "1px solid #2196F3", borderRadius: 1, display:"flex", flexDirection:"column", justifyContent:"center", textAlign:"center", cursor:"pointer"}}
                onClick={() => {
                    clicked(paymentMethod.id);
                }}>
                <Typography gutterBottom variant="body" component="div" sx={{fontSize:14, position:"absolute", left:15, top:10, color:"white"}}>
                    {paymentMethod.brand}
                </Typography>
                <Typography gutterBottom variant="body" component="div" sx={{verticalAlign:"middle", fontSize:18, color:"white"}}>
                    * * * * &nbsp; * * * * &nbsp; * * * * &nbsp; {paymentMethod.last4}
                </Typography>

                <Grid container spacing={1} sx={{position:"absolute", bottom:8, marginLeft:0, width: "100%"}}>
                    <Grid item xs={12} sx={{textAlign:"right", paddingRight:2}}>
                        <Typography gutterBottom variant="body" component="div" sx={{fontSize:12, marginLeft:2, marginTop:1, color:"#e9e9e9"}}>
                            EXPIRES
                        </Typography>

                        <Typography gutterBottom variant="body" component="div" sx={{fontSize:12, marginLeft:2, marginTop:"-9px", color:"white"}}>
                            {paymentMethod.expMonth}/{paymentMethod.expYear}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        );
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
    }

    const PaymentContent = () => {
        return (            
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Add Payment Method" {...a11yProps(0)} />
                        {paymentMethods.length > 0 &&
                            <Tab label="Existing Payment Method" {...a11yProps(1)} />
                        }
                    </Tabs>
                </Box>
                {paymentMethods.length > 0 &&
                <TabPanel value={value} index={1}>

                    <Select
                        sx={{marginTop:4}}
                        fullWidth={true}
                        id="demo-simple-select"
                        value={paymentMethod}
                        onChange={(val) => {
                            setPaymentMethod(val.target.value);
                        }}>
                            {paymentMethods != null && paymentMethods.map((paymentMethod, index) => {
                                return (
                                <MenuItem key={index} value={paymentMethod.id} fullWidth={true} sx={{width:"100%"}}>
                                    <PaymentMethod paymentMethod={paymentMethod} clicked={() => {
                                    }} />
                                </MenuItem>)
                            })}
                    </Select>

                    {/* <Button startIcon={<PaymentRoundedIcon/>} type="submit" variant="contained" disabled={paymentMethod == null} sx={{marginTop:2}} onClick={async () => {

                        if (invoiceId != null)
                        {
                            setIsLoading(true);
                            let response = await apiService().post("/Invoices/PayInvoice", {
                                InvoiceId: invoiceId,
                                WalletId: paymentMethod
                            });
                            setIsLoading(false);

                            if (response != null && response.status == 200)
                            {
                                window.location.reload();
                            }
                            else
                            {
                                alert("We had an issue with the payment method");
                            }
                        }

                    }}>{payButtonText}</Button> */}

                </TabPanel>
                }

                <TabPanel value={value} index={0}>
                    <div>
                        <Box mt={4} mb={2}>
                            {(options != null && process.env.stripePublicKey != null) &&
                                <Elements stripe={stripePromise} options={options}>
                                    <CheckoutForm payButtonText={payButtonText} clientSecret={options != null ? options.clientSecret : null} onResponse={onResponse} amount={amount} />
                                </Elements>
                            }
                        </Box>
                    </div>
                </TabPanel>
            </Box>
        )
    }

    return (
        <>
            {isModal &&
            <Dialog
                fullWidth={true}
                maxWidth={"sm"}
                open={isOpen}
                onClose={() => onModalClose()}>
                <DialogTitle>{title}
                
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            
                            onModalClose();
                        }}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {description}
                    <PaymentContent />
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
            }

            {!isModal &&
                <PaymentContent />
            }

        </>
    )
}
