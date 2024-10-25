import React, { useState, useRef, useEffect } from "react";
import { Datatable } from "authscape";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Fab from "@mui/material/Fab";
import { apiService, FileUploader } from "authscape";
import MenuPopup from "../../components/menuPopup";
import MenuItem from "@mui/material/MenuItem";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import Divider from "@mui/material/Divider";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import { Box, Stack } from "@mui/material";

export const ViewInvoices = ({ title = "Invoices", disablePayment=false, buttonNameType = "Invoice", currentUser, loadedUser, onViewInvoice }) => {
    const [invoiceId, setInvoiceId] = useState(null);
    const [invoiceSecret, setInvoiceSecret] = useState(null);
    const [showInvoiceSentModal, setShowInvoiceSentModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [createNewInvoiceDialog, setCreateNewInvoiceDialog] = useState(false);
    const [isMenuPopup, setIsMenuPopup] = useState(false);
    const [showThankYouUploadDialog, setShowThankYouUploadDialog] =
        useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchUserList, setSearchUserList] = useState([]);

    const [selectedUserId, setSelectedUserId] = useState(null);

    const invoiceDataTable = useRef(null);

    const [value, setValue] = useState(1);
    const handleChange = (newValue) => {
        setValue(newValue);

        setTimeout(() => {
            invoiceDataTable.current.reload(true);
        }, 300);
    };

    const getInvoiceColumns = () => {
        const columns = [
            // {
            //     name: 'Invoice Number',
            //     selector: (row) => row.id,
            //     sortable: false,
            // },
            // {
            //     name: "Total",
            //     selector: (row) => row.total.toFixed(2),
            //     sortable: false,
            //     grow: true,
            // },
            {
                name: "Client",
                selector: (row) => row.company.title,
                sortable: false,
            },
            {
                name: "Location",
                selector: (row) => row.locationName,
                sortable: false,
                width: "400px",
            },
            {
                name: "State",
                // selector: (row) => row.invoiceState,
                sortable: false,
                cell: (data) => {
                    return (
                        <span>
                            {(data.invoiceState == 0 ||
                                data.invoiceState == 1) &&
                                "Open"}
                            {data.invoiceState == 2 && "Paid"}
                            {data.invoiceState == 3 && "On Hold"}
                        </span>
                    );
                },
            },
            
            
        ];

        if (!disablePayment)
        {
            columns.push({
                name: "Billing Period",
                selector: (row) => row.billingPeriod,
                sortable: false,
                width: "300px",
            },
            {
                name: "Due Date",
                selector: (row) => row.dueDateString,
                sortable: false,
                grow: true,
            });
        }


        columns.push({
            name: "",
            sortable: false,
            cell: (data) => {
                return (
                    <>
                        {currentUser != null && currentUser.role == 4 && (
                            <Fab
                                color="primary"
                                aria-label="add"
                                onClick={(env) => {
                                    setInvoiceSecret(data.secret);
                                    setInvoiceId(data.id);
                                    setIsMenuPopup(true);
                                    setAnchorEl(env.currentTarget);
                                }}
                            >
                                <MoreHorizRoundedIcon />
                            </Fab>
                        )}
                        {currentUser != null && currentUser.role != 4 && (
                            <Button
                                variant="contained"
                                onClick={() => {
                                    onViewInvoice(data.id, data.secret);
                                }}
                            >
                                View {buttonNameType}
                            </Button>
                        )}
                    </>
                );
            },
        });




        const pendingColumns = [
            {
                name: "File Name",
                selector: (row) => row.fileName,
                sortable: false,
            },
            {
                name: "Created",
                selector: (row) => row.createdString,
                sortable: false,
            },
            {
                name: "Upload Status",
                selector: (row) => {
                    if (row.hasScanned) {
                        return "Completed";
                    } else {
                        return "In Progress";
                    }
                },
                sortable: false,
            },
            {
                name: "",
                sortable: false,
                cell: (row) => {
                    const { id } = row;
                    return (
                        <>
                            <Button
                                variant="contained"
                                startIcon={<DeleteIcon />}
                                onClick={async () => {
                                    await apiService().delete(
                                        "/Invoices/DeleteInvoiceFile?id=" + id
                                    );
                                    setShowDeleteModal(true);
                                    handleChange(value);
                                }}
                            >
                                Delete
                            </Button>
                        </>
                    );
                },
            },
        ];

        return value === 4 ? pendingColumns : columns;
    };

    const refreshUserList = async (name) => {
        let response = await apiService().get(
            "/Invoices/SearchLocation?name=" + name
        );
        if (response != null && response.status == 200) {
            setSearchUserList(response.data);
        }
    };

    return (
        <div>
            <div>
                <div className="card shadow mb-4">
                    {currentUser != null && (
                        <Grid
                            container
                            spacing={2}
                            sx={{ paddingTop: 4, paddingBottom: 4 }}
                        >
                            <Grid item xs={9}>
                                <h1>{title}</h1>
                            </Grid>
                            <Grid item xs={3} sx={{ textAlign: "right" }}>
                                <Box sx={{textAlign:"right"}}>
                                    <Stack direction="row">
                                        <Button
                                            startIcon={<AddRoundedIcon />}
                                            variant="contained"
                                            sx={{marginRight:2}}
                                            onClick={async () => {
                                                setCreateNewInvoiceDialog(true);
                                            }}
                                        >
                                            Create {buttonNameType}
                                        </Button>

                                        <FileUploader url={"/InvoiceUpload/Upload"} params={null} multiple={true} variant='custom' onUploadCompleted={() => {
                                                // setUpdate(!update);
                                                // handleClose();
                                                window.location.reload();
                                            }}>

                                            <Button color="primary" variant="contained" startIcon={<PublishRoundedIcon/>} sx={{marginLeft:2}}>Upload {buttonNameType}</Button>

                                        </FileUploader>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                    )}

                    {/* <Stack direction="row" spacing={2}>
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1, width:"100%" }}
                    placeholder="Search Invoice #"
                    inputProps={{ 'aria-label': 'Search Invoice #' }}
                />
            </Stack> */}

                    <hr />

                    <Grid
                        container
                        spacing={2}
                        sx={{ paddingTop: 4, paddingBottom: 4 }}
                    >
                        <Grid item xs={12}>
                            <Tabs
                                onChange={() => handleChange(value)}
                                value={value}
                                aria-label="Tabs where each tab needs to be selected manually"
                            >
                                <Tab
                                    value={1}
                                    label="Open"
                                    onClick={() => setValue(1)}
                                />
                                <Tab
                                    value={2}
                                    label="Paid"
                                    onClick={() => setValue(2)}
                                />
                                <Tab
                                    value={3}
                                    label="On Hold"
                                    onClick={() => setValue(3)}
                                />
                                <Tab
                                    value={4}
                                    label="Draft"
                                    onClick={() => setValue(4)}
                                />
                            </Tabs>
                        </Grid>
                        {/* <Grid item xs={6} sx={{textAlign:"right"}}>
                    <ToggleButtonGroup
                        color="primary"
                        value={timeframe}
                        exclusive
                        onChange={handleTimeframe}>
                        <ToggleButton value="all">All</ToggleButton>
                        <ToggleButton value="weekly">Weekly</ToggleButton>
                        <ToggleButton value="monthly">Monthly</ToggleButton>
                    </ToggleButtonGroup>
                </Grid> */}
                    </Grid>

                    {currentUser != null && (
                        <Datatable
                            url={"/Invoices/GetInvoices"}
                            columns={getInvoiceColumns()}
                            ref={invoiceDataTable}
                            customStyles={{
                                rows: {
                                    style: {
                                        minHeight: "72px", // override the row height
                                    },
                                },
                                headCells: {
                                    style: {
                                        paddingLeft: "8px", // override the cell padding for head cells
                                        paddingRight: "8px",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        backgroundColor: "#22335405",
                                        borderTop: "1px solid #0000001f",
                                    },
                                },
                                cells: {
                                    style: {
                                        paddingLeft: "8px", // override the cell padding for data cells
                                        paddingRight: "8px",
                                    },
                                },
                            }}
                            params={{
                                invoiceState: value,
                                pending: value === 4 ? true : false,
                            }}
                            className="dataTables_wrapper dt-bootstrap4 no-footer"
                        />
                    )}
                </div>
            </div>
            <MenuPopup
                anchorEl={anchorEl}
                open={isMenuPopup}
                items={[
                    <MenuItem
                        key={1}
                        onClick={() => {
                            setIsMenuPopup(false);
                            onViewInvoice(invoiceId, invoiceSecret);
                        }}
                        disableRipple
                    >
                        <EditRoundedIcon />
                        Edit
                    </MenuItem>,
                    <MenuItem
                        key={2}
                        onClick={async () => {
                            let response = await apiService().put(
                                "/Invoices/ArchiveInvoice?invoiceId=" +
                                    invoiceId,
                                {}
                            );
                            if (response != null && response.status == 200) {
                                setIsMenuPopup(false);
                                invoiceDataTable.current.reload(true);
                            }
                        }}
                        disableRipple
                    >
                        <ArchiveRoundedIcon />
                        Archive
                    </MenuItem>,
                    <Divider key={3} sx={{ my: 0.5 }} />,
                    <MenuItem
                        key={4}
                        onClick={async () => {
                            setIsMenuPopup(false);
                            let response = await apiService().post(
                                "/Invoices/SendInvoice?invoiceId=" + invoiceId
                            );
                            if (response != null && response.status == 200) {
                                setShowInvoiceSentModal(true);
                            }
                        }}
                        disableRipple
                    >
                        <SendRoundedIcon />
                        Send Invoice
                    </MenuItem>,
                ]}
                onHide={() => {
                    setIsMenuPopup(false);
                    setAnchorEl(null);
                }}
            />
            <Dialog
                open={showInvoiceSentModal}
                onClose={() => {
                    setShowInvoiceSentModal(false);
                }}
                fullWidth={true}
                maxWidth={"sm"}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Invoice Sent"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Invoice has been sent to all contacts associated with
                        the invoice
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setShowInvoiceSentModal(false);
                        }}
                        autoFocus
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            {/* DELETE MODAL */}
            <Dialog
                open={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                }}
                fullWidth={true}
                maxWidth={"sm"}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Invoice Deleted"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Uploaded and pending invoice has been deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setShowDeleteModal(false);
                        }}
                        autoFocus
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={createNewInvoiceDialog}
                onClose={() => {
                    setCreateNewInvoiceDialog(false);
                }}
                fullWidth={true}
                maxWidth={"sm"}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Create an Invoice
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Search for Location
                    </DialogContentText>

                    <Paper sx={{ marginTop: 2, marginBottom: 30 }}>
                        <Autocomplete
                            disablePortal
                            options={searchUserList}
                            onChange={async (event, newValue) => {
                                setSelectedUserId(newValue.id);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={"Location Address"}
                                    onChange={(val) => {
                                        refreshUserList(
                                            val.currentTarget.value
                                        );
                                    }}
                                />
                            )}
                        />
                    </Paper>

                    {/* <Box>
                    Or
                </Box>

                <Paper sx={{marginTop:2, marginBottom:20}}>
                    <Autocomplete
                        disablePortal
                        options={searchUserList}
                        onChange={async (event, newValue) => {

                            setSelectedUserId(newValue.id);

                        }}
                        renderInput={(params) => <TextField {...params} label={"Location"} onChange={(val) => {
                            refreshUserList(val.currentTarget.value);
                        }} />}
                    />
                </Paper> */}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={async () => {
                            setCreateNewInvoiceDialog(false);
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={async () => {
                            let response = await apiService().post(
                                "/Invoices/CreateInvoice",
                                { locationId: selectedUserId }
                            );
                            window.location.href =
                                "/invoice/detail?invoiceId=" +
                                response.data.item1 +
                                "&secret=" +
                                response.data.item2;

                            setCreateNewInvoiceDialog(false);
                        }}
                        autoFocus
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullWidth={true}
                maxWidth={"sm"}
                open={showThankYouUploadDialog}
                onClose={() => {
                    setShowThankYouUploadDialog(false);
                }}
            >
                <DialogTitle>Invoices Uploaded</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Thank you for uploading your invoices, we will email you
                        as soon as they are processed.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setShowThankYouUploadDialog(false);
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
