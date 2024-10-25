import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ReactGrid } from "@silevis/reactgrid";
import {isMacOs} from 'react-device-detect';
import * as signalR from '@microsoft/signalr';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import LineWeightRoundedIcon from '@mui/icons-material/LineWeightRounded';
import PivotTableChartRoundedIcon from '@mui/icons-material/PivotTableChartRounded';
import ViewWeekRoundedIcon from '@mui/icons-material/ViewWeekRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {DndContext} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';
// import { SortableColumn } from './Mapping/sortableColumn';

export const SpreadsheetViewer = forwardRef(({loadedUser, currentUser, documentId, url, sx, hideToolbar = false, onFocusLocationChanged = null, advanceQuery = null, onChange = null, hubUrl = null}, ref) => {
    
    const [data, setData] = useState(null);
    const [rows, setRows] = useState(null);

    const [columns, setColumns] = useState(null);

    const [cellChangesIndex, setCellChangesIndex] = useState(() => -1);
    const [cellChanges, setCellChanges] = useState(() => []);

    const highlightsRef = useRef([]);
    const userIdRef = useRef(0);


    const returnedRef = useRef([]);
    

    const [showStickyDialog, setShowStickyDialog] = useState(false);

    const leftColumnRef = useRef(null);
    const rightColumnRef = useRef(null);
    const topRowRef = useRef(null);
    const bottomRowRef = useRef(null);

    const [leftColumnSticky, setLeftColumnSticky] = useState(null);
    const [rightColumnSticky, setRightColumnSticky] = useState(null);
    const [topRowSticky, setTopRowSticky] = useState(null);
    const [bottomRowSticky, setBottomRowSticky] = useState(null);
    
    const [highlights, setHighlights] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [requestedChanges, setRequestedChanges] = useState([]);

    const [hubConnection, setHubConnection] = useState(null);

    const getRows = () => {
        return returnedRef.current;
    }

    useImperativeHandle(ref, () => ({
        getRows
    }));

    useEffect(() => {

        if (requestedChanges != null && requestedChanges.length > 0)
        {
            // go into each request
            for (let index = 0; index < requestedChanges.length; index++) {
                const request = requestedChanges[index];
                
                
                // go into each row
                for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {

                    
                    // alert(request.rowId + "==" + rows[rowIndex].rowId)
                    // found our row!
                    if (request.rowId == rows[rowIndex].rowId)
                    {
                        // look into each cell of the row
                        for (let cellIndex = 0; cellIndex < rows[rowIndex].cells.length; cellIndex++) {
                            
                            if (rows[rowIndex].cells[cellIndex].columnId == request.fieldName)
                            {
                                switch(rows[rowIndex].cells[cellIndex].type)
                                {
                                    case "text":
                                        rows[rowIndex].cells[cellIndex].text = request.value;
                                        break;
                                    case "checkbox":
                                        rows[rowIndex].cells[cellIndex].checked = Boolean(request.value);
                                        break;
                                    case "date":
                                        rows[rowIndex].cells[cellIndex].date = Date.parse(request.value);
                                        break;
                                    case "dropdown":
                                        rows[rowIndex].cells[cellIndex].selectedValue = request.value;
                                        break;
                                    case "email":
                                        rows[rowIndex].cells[cellIndex].text = request.value;
                                        break;
                                    case "chevron":
                                        rows[rowIndex].cells[cellIndex].text = request.value;
                                        break;
                                    case "header":
                                        rows[rowIndex].cells[cellIndex].text = request.value;
                                        break;
                                    case "number":
                                        rows[rowIndex].cells[cellIndex].text = parseFloat(request.value);
                                        break;
                                    case "time":
                                        rows[rowIndex].cells[cellIndex].text = Date.parse(request.value);
                                        break;
                                    case "image":
                                        rows[rowIndex].cells[cellIndex].url = request.value;
                                        break;
                                }
                            }
                        }
                        break;
                    }
                }
            }

            setRows((rowUpdate) => rowUpdate);

            // clear our selected changes
            setRequestedChanges([]);
        }

    }, [requestedChanges]);


    const validateAllCells = (cells) => {

        let hasData = false;
        cells.forEach(element => {

            if (element.text != "" && element.text != null)
            {
                hasData = true;
            }

        });

        return hasData
    }

    const getSpreadSheetRows = (headerCell, rows) => {

        // returnedRef
        returnedRef.current = [];

        let dataRows = [
            {
                rowId: "header",
                cells: headerCell,
            }
        ];

        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];

            if (rows != null && row.cells.length > 0 && advanceQuery != null && advanceQuery.rules.length > 0)
            {
                row.cells.forEach(element => {

                    advanceQuery.rules.forEach(rule => {

                        if (rule.field == element.columnId)
                        {
                            if (rule.operator == "contains")
                            {
                                if (element.text.toLowerCase().includes(rule.value.toLowerCase()))
                                {
                                    if (validateAllCells(row.cells))
                                    {
                                        dataRows.push({
                                            rowId: row.rowId,
                                            cells: row.cells
                                        });

                                        returnedRef.current.push(row);
                                    }
                                }
                            }
                            else if (rule.operator == "notContains")
                            {
                                if (!element.text.toLowerCase().includes(rule.value.toLowerCase()))
                                {
                                    if (validateAllCells(row.cells))
                                    {
                                        dataRows.push({
                                            rowId: row.rowId,
                                            cells: row.cells
                                        });

                                        returnedRef.current.push(row);
                                    }
                                }
                            }
                        }
                    });
                });
            }
            else
            {
                if (validateAllCells(row.cells))
                {
                    dataRows.push({
                        rowId: row.rowId,
                        cells: row.cells
                    });

                    returnedRef.current.push(row);
                }
            }
        }
        
        return dataRows;
    }

    const handleUndoChanges = () => {
        if (cellChangesIndex >= 0) {
            setRows((prevPeople) =>
            undoChanges(cellChanges[cellChangesIndex], prevPeople)
          );
        }
    };
    
    const handleRedoChanges = () => {
        if (cellChangesIndex + 1 <= cellChanges.length - 1) {
            setRows((prevPeople) =>
            redoChanges(cellChanges[cellChangesIndex + 1], prevPeople)
          );
        }
    };

    useEffect(() => {

        if (url)
        {
            setLeftColumnSticky(parseInt(localStorage.getItem("leftColumn")));
            setRightColumnSticky(parseInt(localStorage.getItem("rightColumn")));
            setTopRowSticky(parseInt(localStorage.getItem("topRow")));
            setBottomRowSticky(parseInt(localStorage.getItem("bottomRow")));

            const fetchData = async () => {
                let response = await apiService().get(url);
                if (response != null && response.status == 200)
                {
                    setData(response.data);
                    setRows(response.data.rows)
                    setColumns(response.data.columns);
                }
            }
            fetchData();
        }

    }, [url]);


    // useEffect(() => {

    //     if (rows != null && advanceQuery != null)
    //     {
    //         let newRows = [...rows];

    //         let index = 0;
    //         rows.forEach(row => {

    //             row.cells.forEach(element => {

    //                 advanceQuery.rules.forEach(rule => {

    //                     if (rule.field == element.columnId)
    //                     {

    //                         if (element.text.toLowerCase().includes(rule.value))
    //                         {
    //                             newRows.push(element);
    //                             index++;
    //                         }


    //                         //alert(rule.field + " - " + rule.operator + " - " + rule.value);
    //                     }
    //                 });

    //             });
    //         });



            


    //         setRows(newRows);
            
    //         // newRows.forEach(row => {
    //         //     alert(JSON.stringify(row));
    //         // });

    //         // alert("found " + index + " empty fields")
    //     }

    // }, [advanceQuery]);

    const getSessions = async () => {

        let response = await apiService().get("/AuthScapeSpreadSheet/GetActiveSessions?documentId=" + documentId);
        var sessionData = response.data;

        let _sessions = [];

        if (sessionData != null && sessionData.length > 0)
        {
            sessionData.forEach((element) => {

                if (_sessions.find(s => s.userId == element.userId) == null)
                {
                    if (element.userId == userIdRef.current)
                    {
                        _sessions.push({
                            userId: element.userId,
                            name: element.name,
                            borderColor: "#3579f8"
                        });
                    }
                    else
                    {
                        _sessions.push({
                            userId: element.userId,
                            name: element.name,
                            borderColor: element.borderColor
                        });
                    }
                }
            });
        }
        
        assignHighlights(highlightsRef.current);
        setSessions(_sessions);
    }

    const assignHighlights = (clonedAray) => {

        let _sessions = [];

        clonedAray.forEach((element) => {
            
            _sessions.push({
                rowId: element.rowId,
                columnId: element.columnId,
                borderColor: element.borderColor
            });

        });

        setHighlights(_sessions);
    }

    const onFocusClicked = (userId, color, rowId, columnId) => {

        let isFound = false;

        let _highlights = highlightsRef.current;

        for (let index = 0; index < _highlights.length; index++) {
            const element = _highlights[index];

            if (element.userId == userId)
            {
                element.rowId = rowId;
                element.columnId = columnId;
                element.borderColor = color;

                isFound = true;
            }
        }

        if (isFound == false)
        {
            let newRecord = { userId: userId, columnId: columnId, rowId: rowId, borderColor: color };
            _highlights.push(newRecord);
        }
        
        highlightsRef.current = _highlights; 
        assignHighlights(highlightsRef.current);
    }

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    useEffect(() => {

        if (loadedUser)
        {
            userIdRef.current = currentUser.id;

            if (hubUrl == null)
            {
                return;
            }

            const connection = new signalR.HubConnectionBuilder().withUrl(hubUrl).build();

            connection.on("onUpdateUserSession", () => {

                getSessions();

            });

            connection.on("onClickSpreadsheet", (userId, color, rowId, columnId) => {

                if (userIdRef.current != userId)
                {
                    onFocusClicked(userId, color, rowId, columnId);
                }
            });

            connection.on("onChangeValue", (userId, rowId, fieldName, value) => {

                if (userIdRef.current != userId)
                {
                    setRequestedChanges((prevMessages) => [...prevMessages, {userId, rowId, fieldName, value}]);
                }
            });

            connection.start().then((result => {

                var randomColor = getRandomColor();
                connection.invoke("Connect", (currentUser.firstName + " " + currentUser.lastName), documentId, currentUser.id, randomColor);
                setHubConnection(connection);

                // get the init users, after that we need to hook it
                getSessions();
            }));
            
        }

    }, [loadedUser])

    const addEmptyRow = () => {
        // Create a new empty row
        const emptyRow = Array.from({ length: columns.length }, () => ({ value: "" }));
        setData(prevData => [...prevData, emptyRow]);
    };

    const applyNewValue = (
        changes,
        prevPeople,
        usePrevValue = false
      ) => {
        changes.forEach((change) => {
          const personIndex = change.rowId;
          const fieldName = change.columnId;
          const cell = usePrevValue ? change.previousCell : change.newCell;
          prevPeople[personIndex][fieldName] = cell.text;
        });
        return [...prevPeople];
    };

    const undoChanges = (
        changes,
        prevPeople
      ) => {
        const updated = applyNewValue(changes, prevPeople, true);
        setCellChangesIndex(cellChangesIndex - 1);
        return updated;
    };

    const redoChanges = (
        changes,
        prevPeople
      ) => {
        const updated = applyNewValue(changes, prevPeople);
        setCellChangesIndex(cellChangesIndex + 1);
        return updated;
    };

    const handleChanges = (changes) => { 
        setRows((prevPeople) => applyChangesToPeople(changes, prevPeople));
    };

    const applyChangesToPeople = (
        changes,
        prevDetails) => {
            changes.forEach((change) => {
                const dataRowId = change.rowId;
                const fieldName = change.columnId;

                // find the row and column
                let dataRow = prevDetails.find((d) => d.rowId === dataRowId);
                let cellItem = dataRow.cells.find(s => s.columnId.toLowerCase() == fieldName.toLowerCase());

                if (cellItem.readOnly)
                {
                    return;
                }

                let rowBuilder = {};
                for (let index = 0; index < dataRow.cells.length; index++) {
                    const element = dataRow.cells[index];

                    rowBuilder[element.columnId] = element.text;
                }
                
                let JSONBuilder = {};
                if (cellItem.type == "text")
                {
                    JSONBuilder[cellItem.columnId] = cellItem.text;
                    cellItem.text = change.newCell.text;

                    if (onChange != null)
                    {
                        onChange(rowBuilder, dataRowId, fieldName, change.newCell.text);
                    }

                    try
                    {
                        hubConnection.invoke("CellChanged", documentId, userIdRef.current, dataRowId, fieldName, change.newCell.text.toString());
                    }
                    catch(exp) 
                    { 
                        console.error(exp);
                    }
                }
                else if (cellItem.type == "number")
                {
                    JSONBuilder[cellItem.columnId] = cellItem.value;
                    cellItem.value = change.newCell.value;

                    if (onChange != null)
                    {
                        onChange(rowBuilder, dataRowId, fieldName, change.newCell.value);
                    }
                    
                    try
                    {
                        hubConnection.invoke("CellChanged", documentId, userIdRef.current, dataRowId, fieldName, change.newCell.value.toString());
                    }
                    catch(exp) 
                    { 
                        console.error(exp);
                    }
                }
                else if (cellItem.type == "checkbox")
                {
                    JSONBuilder[cellItem.columnId] = cellItem.checked;
                    cellItem.checked = change.newCell.checked;

                    if (onChange != null)
                    {
                        onChange(rowBuilder, dataRowId, fieldName, change.newCell.checked);
                    }

                    try
                    {
                        hubConnection.invoke("CellChanged", documentId, userIdRef.current, dataRowId, fieldName, change.newCell.checked.toString());
                    }
                    catch(exp) 
                    { 
                        console.error(exp);
                    }
                }
                else if (cellItem.type == "dropdown")
                {
                    cellItem.isOpen = change.newCell.isOpen;
                        
                    if (change.newCell.selectedValue && change.newCell.selectedValue !== change.previousCell.selectedValue) 
                    {
                        JSONBuilder[cellItem.columnId] = cellItem.selectedValue;
                        cellItem.selectedValue = change.newCell.selectedValue;
                        
                        if (onChange != null)
                        {
                            onChange(rowBuilder, dataRowId, fieldName, change.newCell.selectedValue);
                        }

                        try
                        {
                            hubConnection.invoke("CellChanged", documentId, userIdRef.current, dataRowId, fieldName, change.newCell.selectedValue.toString());
                        }
                        catch(exp) 
                        { 
                            console.error(exp);
                        }
                    }
                }
                else if (cellItem.type == "image")
                {
                    JSONBuilder[cellItem.columnId] = cellItem.url;
                    cellItem.url = change.newCell.url;

                    if (onChange != null)
                    {
                        onChange(rowBuilder, dataRowId, fieldName, change.newCell.url);
                    }

                    try
                    {
                        hubConnection.invoke("CellChanged", documentId, userIdRef.current, dataRowId, fieldName, change.newCell.url.toString());
                    }
                    catch(exp) 
                    { 
                        console.error(exp);
                    }
                }
              });

        return [...prevDetails];
    };

    const handleColumnResize = (ci, width) => {
        setColumns((prevColumns) => {
            const columnIndex = prevColumns.findIndex(el => el.columnId === ci);
            const resizedColumn = prevColumns[columnIndex];
            const updatedColumn = { ...resizedColumn, width };
            prevColumns[columnIndex] = updatedColumn;
            return [...prevColumns];
        });
    }

    const stringAvatar = (name, color) => {
        return {
          sx: {
            bgcolor: color,
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    const getaListOfColumns = () => {
        
        let arrayItem = [];
        for (let index = 0; index < columns.length; index++) {
            const column = columns[index];
            arrayItem.push(column.columnId);
        }
        return arrayItem;
    }

    return (
        <Box>
            {!hideToolbar &&
            <AppBar position="static" elevation={0} sx={{backgroundColor:"white"}}>
                <Toolbar disableGutters sx={{color:"black"}}>
                    <Box sx={{ flexGrow: 1}}>

                        <Button variant={"text"} startIcon={<VisibilityOffRoundedIcon/>} sx={{color:"black"}}>
                            Hide Fields
                        </Button>

                        <Button variant={"text"} startIcon={<PivotTableChartRoundedIcon/>} sx={{color:"black", paddingLeft:4}} onClick={() => {
                            setShowStickyDialog(true);
                        }}>
                            Sticky
                        </Button>

                        <Button variant={"text"} startIcon={<FilterListRoundedIcon/>} sx={{color:"black", paddingLeft:4}}>
                            Filter
                        </Button>

                        <Button variant={"text"} startIcon={<SwapVertRoundedIcon/>} sx={{color:"black", paddingLeft:4}}>
                            Sort
                        </Button>

                        <Button variant={"text"} startIcon={<LineWeightRoundedIcon/>} sx={{color:"black", paddingLeft:4}}>
                            Row Height
                        </Button>

                        <Button variant={"text"} startIcon={<ViewWeekRoundedIcon/>} sx={{color:"black", paddingLeft:4}}>
                            Reorder Columns
                        </Button>
                        
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Stack direction="row" spacing={2}>
                            {sessions.map((user) => {
                                return <Tooltip title={user.name}><Avatar {...stringAvatar(user.name, user.borderColor)} alt={user.name}></Avatar></Tooltip>
                            })}                    
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
            }

            {(leftColumnSticky != null && rightColumnSticky != null && topRowSticky != null && bottomRowSticky != null && data != null && columns != null) &&
            <Box sx={{ ...sx}}>
                {(data != null && rows != null) &&
                    <Box className="reactgrid-gold" onKeyDown={(e) => {
                        const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

                        if ((!isMacOs && e.ctrlKey) || e.metaKey) {
                            switch (e.key) {
                                case "z":
                                handleUndoChanges();
                                return;
                                case "y":
                                handleRedoChanges();
                                return;
                            }
                        }
                    }}>
                        <ReactGrid
                            rows={getSpreadSheetRows(data.headerCell, rows)}
                            highlights={highlights}
                            columns={columns}
                            enableFillHandle={true}
                            onFocusLocationChanged={(location) => {

                                try
                                {
                                    hubConnection.invoke("FocusLocationChanged", documentId, userIdRef.current, location.rowId, location.columnId);
                                }
                                catch(exp) 
                                { 
                                    console.error(exp);
                                }

                                if (onFocusLocationChanged != null)
                                {
                                    onFocusLocationChanged(location.rowId, location.columnId);
                                }
                            }}
                            onCellsChanged={handleChanges}
                            enableRowSelection={true}
                            enableColumnSelection={true}
                            enableRangeSelection={true}
                            //onContextMenu={simpleHandleContextMenu}
                            onColumnResized={handleColumnResize}
                            stickyTopRows={topRowSticky}
                            stickyBottomRows={bottomRowSticky}
                            stickyLeftColumns={leftColumnSticky}
                            stickyRightColumns={rightColumnSticky}
                        />
                    </Box>
                }
            </Box>
            }

            <Dialog
                open={showStickyDialog}
                onClose={() => {
                    setShowStickyDialog(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                {"Sticky"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Stick chosen rows and columns at the top or bottom rows or left and right columns. Sticky rows or columns will remain visible at all times.
                </DialogContentText>
                    
                    <TableContainer sx={{paddingTop:4}}>
                        <Table aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="left">Left Column</TableCell>
                                <TableCell align="left">Right Column</TableCell>
                                <TableCell align="left">Top Row</TableCell>
                                <TableCell align="left">Bottom Row</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell sx={{paddingTop:0}}>
                                    <TextField inputRef={leftColumnRef} type="number" defaultValue="0" variant="outlined" />
                                </TableCell>
                                <TableCell sx={{paddingTop:0}}>
                                    <TextField inputRef={rightColumnRef} type="number" defaultValue="0" variant="outlined" />
                                </TableCell>
                                <TableCell sx={{paddingTop:0}}>
                                    <TextField inputRef={topRowRef} type="number" defaultValue="0" variant="outlined" />
                                </TableCell>
                                <TableCell sx={{paddingTop:0}}>
                                    <TextField inputRef={bottomRowRef} type="number" defaultValue="0" variant="outlined" />
                                </TableCell>
                            </TableBody>
                        </Table>
                    </TableContainer>


                </DialogContent>
                <DialogActions>
                <Button onClick={() => {

                    setShowStickyDialog(false);

                }}>Cancel</Button>
                <Button onClick={() => {

                    localStorage.setItem("leftColumn", leftColumnRef.current.value);
                    localStorage.setItem("rightColumn", rightColumnRef.current.value);
                    localStorage.setItem("topRow", topRowRef.current.value);
                    localStorage.setItem("bottomRow", bottomRowRef.current.value);

                    window.location.reload();
                    // setLeftColumnSticky(leftColumnRef.current.value);
                    // setRightColumnSticky(rightColumnRef.current.value);
                    // setTopRowSticky(topRowRef.current.value);
                    // setBottomRowSticky(bottomRowRef.current.value);                    

                    setShowStickyDialog(false);

                }} autoFocus>
                    Apply
                </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={false}
                onClose={() => {
                    setShowStickyDialog(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                {"Reorder Columns"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Assign the column order from left to right.
                </DialogContentText>


                {columns != null &&
                <List>
                    <DndContext onDragEnd={(event) => {
                        const {over} = event;

                        alert(over.id);
                        // If the item is dropped over a container, set it as the parent
                        // otherwise reset the parent to `null`
                        //setParent(over ? over.id : null);
                    }}>
                        <SortableContext items={getaListOfColumns()}>

                            {columns.map((item) => {
                                return (
                                    <SortableColumn key={item.columnId} id={item.columnId} />
                                )
                            })}

                        </SortableContext>
                    </DndContext>
                </List>
                }


                </DialogContent>
                <DialogActions>
                <Button onClick={() => {

                    setShowStickyDialog(false);

                }}>Cancel</Button>
                <Button onClick={() => {

                    

                }} autoFocus>
                    Apply
                </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
});
