import React, { useState, useRef, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import {apiService, EditableDatagrid, AutoSaveTextField } from "authscape";
import StripePayment from 'authscape';
import { useRouter } from 'next/router'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from '../../components/confirmationModal';
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Index = ({title = "Invoice", currentUser, loadedUser, setIsLoading, editorMode, invoiceId, secret, disablePayment = false}) => {
    
    const router = useRouter();

    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [selectedLocationId, setSelectedLocationId] = useState(null);

    const [notesTimeoutToken, setNotesTimeoutToken] = useState(null);

    const [showCompanySearch, setShowCompanySearch] = useState(false);
    const [showLocationSearch, setShowLocationSearch] = useState(false);
    const [showInvoicePaymentModal, setShowInvoicePaymentModal] = useState(false);
    const [lineItemAmount, setLineItemAmount] = useState(null);
    const [clientName, setClientName] = useState(null);
    const [locationName, setLocationName] = useState(null);
    const [lineItemQty, setLineItemQty] = useState(1);
    const [searchCompanyList, setSearchCompanyList] = useState([]);
    const [searchLocationList, setSearchLocationList] = useState([]);
    const [showInvoiceSentModal, setShowInvoiceSentModal] = useState(false);
    const [showConfirmDeleteLineItem, setShowConfirmDeleteLineItem] = useState(null);
    const [deleteLineItemId, setDeleteLineItemId] = useState(false);

    const [dataGridRefreshKey, setDataGridRefreshKey] = useState(0);

    const [openPayInvoice, setOpenPayInvoice] = useState(false);

    const [paymentGatewayCustomerId, setPaymentGatewayCustomerId] = useState(null);
    

    const [startBillingDate, setStartBillingDate] = useState(null);
    const [endBillingDate, setEndBillingDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);


    const [stringStartDate, setStringStartDate] = useState(null);
    const [stringEndDate, setStringEndDate] = useState(null);
    const [stringDueDate, setStringDueDate] = useState(null);


    const [showNewLocationDialog, setShowNewLocationDialog] = useState(false);
    const [newAddress, setNewAddress] = useState(null);
    const [newCity, setNewCity] = useState(null);
    const [newState, setNewState] = useState(null);
    const [newPostalCode, setPostalCode] = useState(null);

    
    const [lineItems, setLineItems] = useState([]);

    const [newLineItemModalIsOpen, setNewLineItemModalIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    const [balanceDue, setBalanceDue] = useState(0.00);
    const [total, setTotal] = useState(0.00);
    const [amountPaid, setAmountPaid] = useState(0.00);
    const [invoiceStatus, setInvoiceStatus] = useState(1);
    const [foundInvoice, setFoundInvoice] = useState(false);


    const [shipToCompany, setShipToCompany] = useState(null);
    const [shipToLocation, setShipToLocation] = useState(null);

    
    const filter = createFilterOptions();
    const [lineItemNameValue, setLineItemNameValue] = useState(null);
    const [selectedLineItemName, setSelectedLineItemName] = useState(null);
    const [listOfOptions, setListOfOptions] = useState([]);


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    }));

    const AddLineItemClicked = async () => {

        if (selectedLineItemName != null)
        {
            setIsLoading(true);
            let response = await apiService().put("/Invoices/AddLineItem", {
                invoiceId: parseInt(invoiceId),
                invoiceLineItemNameId: selectedLineItemName,
                price: parseFloat(lineItemAmount),
                qty: parseInt(lineItemQty)
            });
            setIsLoading(false);

            if (response != null && response.status == 200)
            {
                setDataGridRefreshKey(dataGridRefreshKey + 1);
            }
        }
        else
        {
            alert("Please provide a product or service name");
        }
    }

    const refreshCompanyList = async (companyName) => {

        let response = await apiService().get("/Companies/GetCompanyByName?companyName=" + companyName);
        if (response != null && response.status == 200)
        {
            setSearchCompanyList(response.data);
        }
    }

    const refreshLocationList = async (locationName) => {

        let response = await apiService().get("/Locations?locationName=" + locationName + "&companyId=" + selectedCompanyId);
        if (response != null && response.status == 200)
        {
            setSearchLocationList(response.data);
        }
    }

    const onSaveStartDate = async (dateTime) => {

        setIsLoading(true);
        let response = await apiService().put("/Invoices/SetStartDate", {
            invoiceId: invoiceId,
            dateSelection: new Date(dateTime)
        });
        if (response != null && response.status == 200)
        {
            setIsLoading(false);
            setSearchLocationList(response.data);
        }
    }

    const onSaveEndDate = async (dateTime) => {
        setIsLoading(true);
        let response = await apiService().put("/Invoices/SetEndDate", {
            invoiceId: invoiceId,
            dateSelection: new Date(dateTime)
        });
        if (response != null && response.status == 200)
        {
            setIsLoading(false);
        }
    }

    const onSaveDueDate = async (dateTime) => {
        setIsLoading(true);
        let response = await apiService().put("/Invoices/SetDueDate", {
            invoiceId: invoiceId,
            dateSelection: new Date(dateTime)
        });
        if (response != null && response.status == 200)
        {
            setIsLoading(false);
        }
    }

    const reloadData = async () => {
        if (invoiceId == undefined && secret == undefined) return;
        
        let invoiceDetailResponse = await apiService().get("/Invoices/GetInvoiceDetail?invoiceId=" + invoiceId + "&secret=" + secret);

        let lineItemResponse = await apiService().get("/Invoices/GetLineItemNames");
        if (lineItemResponse != null && lineItemResponse.status == 200)
        {
            setListOfOptions(lineItemResponse.data);
        }

        if (invoiceDetailResponse != null && invoiceDetailResponse.status == 200)
        {
            setFoundInvoice(true);
        }

        setBalanceDue(invoiceDetailResponse.data.balanceDue);
        setTotal(invoiceDetailResponse.data.total);
        setAmountPaid(invoiceDetailResponse.data.amountPaid);
        setClientName(invoiceDetailResponse.data.clientName);
        setInvoiceStatus(invoiceDetailResponse.data.invoiceState);
        // setInvoiceId(invoiceDetailResponse.data.id);
        setSelectedCompanyId(invoiceDetailResponse.data.companyId);
        setLocationName(invoiceDetailResponse.data.locationName);

        setShipToCompany(invoiceDetailResponse.data.shipToCompany);
        setShipToLocation(invoiceDetailResponse.data.shipToAddress);

        setStartBillingDate(invoiceDetailResponse.data.startDate);
        setEndBillingDate(invoiceDetailResponse.data.endDate);
        setDueDate(invoiceDetailResponse.data.dueDate);

        setPaymentGatewayCustomerId(invoiceDetailResponse.data.paymentGatewayCustomerId);

        setStringStartDate(invoiceDetailResponse.data.stringStartDate);
        setStringEndDate(invoiceDetailResponse.data.stringEndDate);
        setStringDueDate(invoiceDetailResponse.data.stringDueDate);


        let listArray = [];
        if (invoiceDetailResponse.data.invoiceLineItems != null)
        {
            for (let index = 0; index < invoiceDetailResponse.data.invoiceLineItems.length; index++) {
                const lineItem = invoiceDetailResponse.data.invoiceLineItems[index];

                listArray.push({
                    id: lineItem.id,
                    name: lineItem.name,
                    description: lineItem.description,
                    qty: lineItem.qty,
                    price: lineItem.price,
                    total: lineItem.total,
                    kWH: lineItem.kWH,
                    paidDateTime: lineItem.paidDateTimeString
                })
            }
        }
        setLineItems(listArray);
    }


    useEffect(() => {
        
        if (router.isReady)
        {
            reloadData();
        }

    }, [router.isReady, dataGridRefreshKey]);


    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      
      const usdPrice = {
        type: 'number',
        width: 130,
        valueFormatter: ({ value }) => currencyFormatter.format(value),
        cellClassName: 'font-tabular-nums',
      };


      const GetColumnData = () => {

        let documentColumns = [
            { field: 'name', flex:1, headerName: 'Name', width: 150, editable: editorMode ? true : false, headerClassName: 'invoiceHeaderColumn' },
            { field: 'description', flex:1, headerName: 'Description', width: 150, editable: editorMode ? true : false, headerClassName: 'invoiceHeaderColumn' },
            { field: 'qty', flex:1, headerName: 'Quantity', width: 150, editable: editorMode ? true : false, headerClassName: 'invoiceHeaderColumn' },
            { field: 'price', flex:1, headerName: 'Price', width: 150, editable: editorMode ? true : false, headerClassName: 'invoiceHeaderColumn', ...usdPrice  },
            { field: 'total', flex:1, headerName: 'Total', width: 150, editable: false, headerClassName: 'invoiceHeaderColumn', ...usdPrice  },
            // { field: 'paidDate', flex:1, headerName: 'Paid Date', width: 150, editable: false, headerClassName: 'invoiceHeaderColumn' },
        ];

        if (editorMode)
        {
            documentColumns.push({
                field: "actions",
                type: "actions",
                width: 200,
                headerName: "Archive",
                headerClassName: 'invoiceHeaderColumn',
                cellClassName: "actions",
                getActions: ({ id, row }) => {
                return [
                    <GridActionsCellItem key={id}
                    icon={<DeleteRoundedIcon />}
                    label="Archive"
                    className="textPrimary"
                    onClick={async () => {
                        setShowConfirmDeleteLineItem(row.id);
                    }}
                    />,
                ];
                },
            });
        }

        return documentColumns;
    }

    
    return (
    <Box sx={{padding:4, paddingTop:1}}>
        {!foundInvoice &&
            <Box sx={{textAlign:"center", paddingTop:10}}>
                <Typography variant="h4" gutterBottom component="div">{title} not found</Typography>
            </Box>
        }

        {foundInvoice &&
        <>


        <div>
          {/* <Layout currentUser={currentUser}> */}
            <div className="card shadow mb-4">

                <Grid container spacing={2} sx={{paddingTop:4, paddingBottom: 4}}>
                    <Grid item xs={6}>

                        <Grid container spacing={2} sx={{paddingTop:4, paddingBottom: 4}}>
                            <Grid item xs={6}>
                            
                                <Typography variant="h3" gutterBottom>
                                    To:
                                </Typography>

                                {editorMode &&
                                <>
                                    <Typography variant="h4" gutterBottom component="div" 
                                    onClick={() => {
                                        setShowCompanySearch(true);
                                    }}
                                    sx={{
                                        cursor:"pointer",
                                        "&:hover": {
                                            textDecoration:"underline"
                                        }}}>
                                            
                                        {clientName != null ? clientName : "Not Specified"} <EditRoundedIcon />
                                    </Typography>


                                    <Typography variant="h6" gutterBottom component="div" 
                                    onClick={() => {
                                        setShowLocationSearch(true);
                                    }}
                                    sx={{
                                        cursor:"pointer",
                                        "&:hover": {
                                            textDecoration:"underline"
                                        }}}>
                                            
                                        {locationName != null ? locationName : "Not Specified"} <EditRoundedIcon />
                                    </Typography>
                                </>
                                }

                                {!editorMode &&
                                <>
                                    <Box>
                                        <Typography variant="h4" gutterBottom component="div" >{clientName != null ? clientName : "Not Specified"}</Typography>
                                    </Box>
                                    <Box sx={{paddingTop:1}}>
                                        <Typography variant="h6" gutterBottom component="div" >{locationName != null ? locationName : "Not Specified"}</Typography>
                                    </Box>
                                    {!disablePayment &&
                                    <Box>
                                        <Box sx={{paddingTop:2}}>
                                            <Typography variant="h6" gutterBottom component="span">Billing Period:</Typography>
                                            <Typography variant="h6" gutterBottom component="span"> {stringStartDate != null ? stringStartDate : "Not Specified"} - </Typography>
                                            <Typography variant="h6" gutterBottom component="span">{stringEndDate != null ? stringEndDate : "Not Specified"}</Typography>
                                        </Box>
                                        <Box sx={{paddingTop:2}}>
                                            <Typography variant="h6" gutterBottom component="div">Due Date: {stringDueDate != null ? stringDueDate : "Not Specified"}</Typography>
                                        </Box>
                                    </Box>
                                    }
                                </>
                                }

                                {(editorMode) &&
                                <>
                                    {!disablePayment &&
                                    <Box sx={{marginTop:4, marginBottom:2}}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        label="Billing Start Date"
                                                        fullWidth={true}
                                                        value={new Date(stringStartDate)}
                                                        onChange={(newValue) => {
                                                            setStartBillingDate(newValue);
                                                            onSaveStartDate(newValue);
                                                        }}
                                                        renderInput={(params) => <TextField {...params} sx={{marginRight:2}} />}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        sx={{marginLeft:2}}
                                                        fullWidth={true}
                                                        label="Billing End Date"
                                                        value={new Date(stringEndDate)}
                                                        onChange={(newValue) => {
                                                            setEndBillingDate(newValue);
                                                            onSaveEndDate(newValue);
                                                        }}
                                                        renderInput={(params) => <TextField {...params} sx={{marginRight:2}} />}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        sx={{marginLeft:2}}
                                                        fullWidth={true}
                                                        label="Due Date"
                                                        value={new Date(stringDueDate)}
                                                        onChange={(newValue) => {
                                                            setDueDate(newValue);
                                                            onSaveDueDate(newValue);
                                                        }}
                                                        renderInput={(params) => <TextField {...params} sx={{marginTop:2}} />}
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    }

                                    <Box sx={{marginTop:4}}>
                                        <AutoSaveTextField value={invoiceId} label={"Notes"} timeout={2000} isMultiLine={true} rows={4} fullWidth={true} onChanged={async (text) => {
                                            
                                            let response = await apiService().put("/Invoices/SetNotes", {
                                                invoiceId: invoiceId,
                                                notes: text
                                            });

                                            if (response != null && response.status == 200)
                                            {
                                                alert("saved!");
                                            }

                                        }} />
                                    </Box>
                                </>
                                }
                            </Grid>
                            {(shipToCompany != null && shipToLocation != null) &&
                                <Grid item xs={6}>
                                    <Typography variant="h3" gutterBottom>
                                        Ship To:
                                    </Typography>
                                    <Box>
                                        <Typography variant="h4" gutterBottom component="div" >{shipToCompany != null ? shipToCompany : "Not Specified"}</Typography>
                                    </Box>
                                    <Box sx={{paddingTop:1}}>
                                        <Typography variant="h6" gutterBottom component="div" >{shipToLocation != null ? shipToLocation : "Not Specified"}</Typography>
                                    </Box>
                                </Grid>
                            }
                        </Grid>

                    </Grid>
                    <Grid item xs={6} sx={{textAlign:"right", fontSize:"30px"}}>

                        {!disablePayment &&
                        <Box>
                            Balance Due: ${balanceDue && balanceDue.toFixed(2)}
                        </Box>
                        }

                        <Box sx={{paddingTop:2}}>
                            <Typography variant="h4" gutterBottom component="div">
                                Status:&nbsp; 
                                {(invoiceStatus == 0 || invoiceStatus == 1) && "Open"}
                                {/* {invoiceStatus == 1 && "Open"} */}
                                {invoiceStatus == 2 && "Paid"}
                                {invoiceStatus == 3 && "On Hold"}
                                {invoiceStatus == 4 && "Archived"}
                            </Typography>
                            {(amountPaid != null && !disablePayment) &&
                                <Typography variant="h5" gutterBottom component="div" sx={{paddingTop:2}}>
                                    Amount Paid: ${amountPaid.toFixed(2)}
                                </Typography>
                            }

                            {total != null &&
                                <Typography variant="h5" gutterBottom component="div">
                                    Total: ${total.toFixed(2)}
                                </Typography>
                            }
                        </Box>

                        {!disablePayment &&
                        <Box>
                            <Button startIcon={<PaymentRoundedIcon/>} variant="contained" disabled={balanceDue <= 0} sx={{marginTop:2, width:200, height:50}} onClick={() => {
                                setOpenPayInvoice(true);
                            }}>Pay Invoice</Button>
                            


                            {editorMode &&
                            <Button startIcon={<MailRoundedIcon/>} variant="contained" disabled={balanceDue <= 0} sx={{marginTop:2, marginLeft:2, width:200, height:50}} onClick={async () => {

                                setIsLoading(true);
                                let response = await apiService().post("/Invoices/SendInvoice?invoiceId=" + invoiceId);
                                if (response != null && response.status == 200)
                                {
                                    setShowInvoiceSentModal(true);
                                }
                                setIsLoading(false);

                            }}>Send Invoice</Button>
                            }
                        </Box>
                        }

                    </Grid>
                </Grid>
                <hr />
                <Box>
                    <Grid container spacing={2} sx={{paddingTop:2, paddingBottom:2}}>
                        <Grid item xs={6}>
                            <Typography variant="h6" component="div">
                                Line Items:
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                                Products and Services you are billed for
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{textAlign:"right"}}>
                            {editorMode &&
                                <Button startIcon={<AddRoundedIcon/>} variant="contained" sx={{marginTop:2}} onClick={() => {
                                    setNewLineItemModalIsOpen(true);
                                }}>Add Line Item</Button>
                            }
                        </Grid>
                    </Grid>

                    <EditableDatagrid key={dataGridRefreshKey} loadedUser={loadedUser} url={"/Invoices/GetLineItems"} columns={GetColumnData()} params={{
                        invoiceId: invoiceId
                    }} onCellEdited={async (cell) => {

                        let response = await apiService().post("/Invoices/ChangeLineItemValue", {
                            invoiceId: invoiceId,
                            id: cell.id,
                            field: cell.field,
                            value: cell.value
                        });

                        if (response != null && response.status == 200)
                        {
                            setDataGridRefreshKey(dataGridRefreshKey + 1);
                        }

                    }} />

                </Box>
            </div>
        </div>

        <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={newLineItemModalIsOpen}
        onClose={() => {
            setNewLineItemModalIsOpen(false);
        }}>
            <DialogTitle>New Line Item</DialogTitle>
            <DialogContent>
            <Box sx={{marginTop:1}}>

                    {/* <TextField id="outlined-basic" label="Name" variant="outlined" sx={{width:"100%", marginBottom:2}} onChange={(env) => {
                        setLineItemName(env.currentTarget.value)
                    }} /> */}
                    
                    <Autocomplete
                        value={lineItemNameValue}
                        onChange={async (event, newValue) => {
                            if (typeof newValue === 'string') {
                                setLineItemNameValue(newValue);
                            } else if (newValue && newValue.inputValue) {

                                let response = await apiService().post("/Invoices/CreateLineItemName", {
                                    Name: newValue.inputValue
                                });
                                if (response != null && response.status == 200)
                                {
                                    setLineItemNameValue(response.data.name);
                                    setSelectedLineItemName(response.data.id);
                                }

                            } else {
                                
                                setLineItemNameValue(newValue);
                                setSelectedLineItemName(newValue.id);
                            }
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            const { inputValue } = params;
                            // Suggest the creation of a new value
                            const isExisting = options.some((option) => inputValue === option.name);
                            if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    inputValue,
                                    name: `Add "${inputValue}"`,
                                });
                            }

                            return filtered;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        id="free-solo-with-text-demo"
                        options={listOfOptions}
                        getOptionLabel={(option) => {
                            // Value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return option;
                            }
                            // Add "xxx" option created dynamically
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            // Regular option
                            return option.name;
                        }}
                        renderOption={(props, option) => <li {...props}>{option.name}</li>}
                        sx={{ width: "100%" }}
                        freeSolo
                        renderInput={(params) => (
                            <TextField {...params} label="Name" />
                        )}
                    />

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    //value={}
                                    onChange={(env) => {
                                        setLineItemAmount(env.currentTarget.value);
                                    }}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="Amount"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">Quantity</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={lineItemQty}
                                    onChange={(env) => {
                                        setLineItemQty(env.currentTarget.value);
                                    }}
                                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                                    label="Amount"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
            </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => {
                setNewLineItemModalIsOpen(false);
            }}>Close</Button>

            <Button variant="contained" onClick={async () => {
                await AddLineItemClicked();
                setNewLineItemModalIsOpen(false);
            }}>Add Line Item</Button>

            </DialogActions>
        </Dialog>

        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={showCompanySearch}
            onClose={() => {
                setShowCompanySearch(false);
            }}>
        <DialogTitle>Search for company</DialogTitle>
        <DialogContent>
            <Paper sx={{marginTop:1, marginBottom:20}}>
                <Autocomplete
                    disablePortal
                    options={searchCompanyList}
                    onChange={async (event, newValue) => {

                        setSelectedCompanyId(newValue.id);

                    }}
                    renderInput={(params) => <TextField {...params} label={"Company Name"} onChange={(val) => {
                        refreshCompanyList(val.currentTarget.value);
                    }} />}
                />
            </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setShowCompanySearch(false);
          }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={async () => {

            let response = await apiService().put("/Invoices/AssignCompanyToInvoice", {
                InvoiceId: parseInt(invoiceId),
                CompanyId: selectedCompanyId
            });
            if (response != null && response.status == 200)
            {
                setShowCompanySearch(false);
                window.location.reload();
            }

          }}>Save Changes</Button>
        </DialogActions>
        </Dialog>



        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={showLocationSearch}
            onClose={() => {
                setShowLocationSearch(false);
            }}>
            <DialogTitle>Search for location</DialogTitle>
            <DialogContent sx={{marginTop:1, marginBottom:20}}>
                {/* <Paper sx={{marginTop:1, marginBottom:20}}> */}
                    <Autocomplete
                    sx={{marginTop:1}}
                        disablePortal
                        options={searchLocationList}
                        onChange={async (event, newValue) => {

                            if (newValue != null)
                            {
                                setSelectedLocationId(newValue.id);
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label={"location Name"} onChange={(val) => {
                            refreshLocationList(val.currentTarget.value);
                        }} />}
                    />
                {/* </Paper> */}
                <Button variant="text" onClick={() => {
                    setShowNewLocationDialog(true);
                }}>Add new location</Button>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => {
                setShowLocationSearch(false);
            }}>
                Cancel
            </Button>
            <Button variant="contained" onClick={async () => {

                let response = await apiService().put("/Invoices/AssignLocationToInvoice", {
                    InvoiceId: parseInt(invoiceId),
                    LocationId: selectedLocationId
                });
                if (response != null && response.status == 200)
                {
                    setShowLocationSearch(false);
                    window.location.reload();
                }

            }}>Save Changes</Button>
            </DialogActions>
        </Dialog>



        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={showNewLocationDialog}
            onClose={() => {
                setShowNewLocationDialog(false);
            }}>
            <DialogTitle>Create location</DialogTitle>
            <DialogContent sx={{marginTop:1, marginBottom:2}}>
                <Box sx={{marginTop:1}}>
                    <TextField id="outlined-basic" label="Address" fullWidth={true} variant="outlined" onChange={(val) => {
                        setNewAddress(val.currentTarget.value);
                    }} />
                    <Grid container spacing={1} sx={{marginTop:1}}>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" label="City" variant="outlined" fullWidth={true} onChange={(val) => {
                                setNewCity(val.currentTarget.value);
                            }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" label="State" variant="outlined" fullWidth={true} onChange={(val) => {
                                setNewState(val.currentTarget.value);
                            }} />        
                        </Grid>
                    </Grid>
                    <TextField id="outlined-basic" label="Postal Code" variant="outlined" fullWidth={true} sx={{marginTop:1}} onChange={(val) => {
                        setPostalCode(val.currentTarget.value);
                    }} />
                </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => {
                setShowNewLocationDialog(false);
            }}>
                Cancel
            </Button>
            <Button variant="contained" onClick={async () => {

                let response = await apiService().post("/location", {
                    companyId: selectedCompanyId,
                    address: newAddress,
                    city: newCity,
                    state: newState,
                    postalCode: newPostalCode
                });
                if (response != null && response.status == 200)
                {
                    let responseAssign = await apiService().put("/Invoices/AssignLocationToInvoice", {
                        InvoiceId: parseInt(invoiceId),
                        LocationId: response.data
                    });
                    if (responseAssign != null && responseAssign.status == 200)
                    {
                        setShowLocationSearch(false);
                        window.location.reload();
                    }
                }

            }}>Add Location</Button>
            </DialogActions>
        </Dialog>




        <Dialog
            open={showInvoiceSentModal}
            onClose={() => {
                setShowInvoiceSentModal(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
            {"Invoice Sent"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Invoice has been sent to all contacts associated with the invoice
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => {
                setShowInvoiceSentModal(false);
            }} autoFocus>
                OK
            </Button>
            </DialogActions>
        </Dialog>

        <ConfirmationModal 
            title={"Are you sure you want to remove this item?"}
            description={"When this item is removed it will not be able to be recovered."}
            okTitle={"Yes"}
            cancelTitle={"No"}
            cancelClicked={() => {
                setShowConfirmDeleteLineItem(null);
            }}
            okClicked={async () => {
                setShowConfirmDeleteLineItem(null);

                let response = await apiService().delete("/Invoices/RemoveLineItem?id=" + showConfirmDeleteLineItem);
                if (response != null && response.status == 200)
                {
                    setDataGridRefreshKey(dataGridRefreshKey + 1);
                }
            }}
            open={showConfirmDeleteLineItem != null ? true : false} />



        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={openPayInvoice}
            onClose={() => {
                setOpenPayInvoice(false);
            }}>
            <DialogTitle>Pay Invoice</DialogTitle>
            <DialogContent sx={{marginTop:1, marginBottom:2}}>
                <Box sx={{marginTop:1}}>
                    <StripePayment
                        loadedUser={loadedUser} // required (need to change that)
                        currentUser={currentUser} // if you want to attach to a users account
                        amount={balanceDue} // the amount you want to charge
                        invoiceId={invoiceId}
                        //payButtonText={"Pay"}
                        onResponse={async (response, id, paymentMethod) => {

                            switch (response) {
                                case 'succeeded':

                                    //alert("succeeded: " + id + " paymentMethod: " + paymentMethod);
                                break;

                                case 'paid':
                                    //alert("paid: " + " paymentIntent: " + id);
                                    setOpenPayInvoice(false);
                                    setDataGridRefreshKey(dataGridRefreshKey + 1);
                                break;
                        
                                case 'processing':
                                    alert("processing: " + id);
                                break;
                        
                                case 'requires_payment_method':
                                    alert("requires_payment_method");
                                break;
                        
                                default:
                                    alert("failed");
                                break;
                            }
                        }}
                    />
                </Box>
            </DialogContent>
        </Dialog>

        </>
        }
    </Box>
    )
}

export default Index;
