import { Box, Button, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
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
import { apiService } from 'authscape';

// remove when publishing
// import {PhotoEditor} from './photoEditor';
// import {SpreadSheetRichTextEditor} from './spreadsheetRichTextEditor';

const SpreadsheetViewer = forwardRef(({
    currentUser, documentId, url, sx, leftColumnSticky = 0, rightColumnSticky = 0, topRowSticky = 0, bottomRowSticky = 0, hideToolbar = false, onFocusLocationChanged = null, noPhotoText = "No Photo", photoWidth = 130, advanceQuery = null, onChange = null, onAddPhoto = null, onPhotoDelete = null, hubUrl = null, onLoading = null, usePagination = null
  }, ref) =>
{
    const hasLoadedSignalR = useRef(false);

    const [data, setData] = useState(null);
    const [rows, setRows] = useState(null);


    const [rawRows, setRawRows] = useState([]);



    const [rowHeight, setRowHeight] = useState(null);

    const [columns, setColumns] = useState(null);

    const [showPhotoUploadDialog, setShowPhotoUploadDialog] = useState(null);
    const [editDescriptionDialog, setEditDescriptionDialog] = useState(null);

    const [photoEditorKey, setPhotoEditorKey] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
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

    // const [leftColumnSticky, setLeftColumnSticky] = useState(null);
    // const [rightColumnSticky, setRightColumnSticky] = useState(null);
    // const [topRowSticky, setTopRowSticky] = useState(null);
    // const [bottomRowSticky, setBottomRowSticky] = useState(null);
    
    const [highlights, setHighlights] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [requestedChanges, setRequestedChanges] = useState([]);

    const [hubConnection, setHubConnection] = useState(null);

    const [paginationParam, setPaginationParam] = useState(usePagination)

    const getRows = () => {
        return returnedRef.current;
    }

    const getRowData = (rowId) => {

        let _rowId = 0;
        if (rowId == null || rowId == "" || isNaN(rowId))
        {
            _rowId = 0;
        }
        else
        {
            _rowId = rowId;
        }

        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {

            if (_rowId == rows[rowIndex].rowId)
            {
                return rows[rowIndex];
            }
        }
    }

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
                                    case "dateElement":
                                        rows[rowIndex].cells[cellIndex].date = Date.parse(request.date);
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
                                        rows[rowIndex].cells[cellIndex].value = parseFloat(request.value);

                                        // rows[rowIndex].cells[cellIndex].format = new Intl.NumberFormat('en-US', {
                                        //     style: 'currency',
                                        //     currency: 'USD',
                                        // });


                                        break;
                                    case "money":
                                        rows[rowIndex].cells[cellIndex].value = parseFloat(request.value);
                                        break;
                                    case "time":
                                        rows[rowIndex].cells[cellIndex].date = Date.parse(request.date);
                                        break;
                                    case "image":
                                        rows[rowIndex].cells[cellIndex].url = request.value;
                                        break;
                                    case "richtext":
                                        rows[rowIndex].cells[cellIndex].hasText = request.hasText;
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

            if (element.readOnly)
            {
                element.nonEditable = element.readOnly;
            }

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
        
        let modifiedCells = [];
        let newHeaderCells = [...headerCell];
        newHeaderCells.forEach(element => {

            if (element.isHidden == false)
            {
                modifiedCells.push(element);
            }
        });

        let dataRows = [
            {
                rowId: "header",
                cells: modifiedCells,
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
                                            cells: row.cells,
                                            height: row.height,
                                            reorderable: row.reorderable
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
                                            cells: row.cells,
                                            height: row.height,
                                            reorderable: row.reorderable
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
                        cells: row.cells,
                        height: row.height,
                        reorderable: row.reorderable
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

    const setupSignalR = () => {

        if (hasLoadedSignalR.current)
        {
            return;
        }

        hasLoadedSignalR.current = true;

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

    const AdjustForHiddenColumns = (data) => {


        let hiddenFields = [];


        let newColumns = [];
        data.columns.forEach(column => {

            if (column.isHidden == false)
            {
                newColumns.push(column);
            }
            else
            {
                hiddenFields.push(column.columnId);
            }
        });
        data.columns = newColumns;







        // remove the hidden columns
        data.rows.forEach(row => {

            let newCells = [];
            row.cells.forEach(cell => {

                if (!hiddenFields.includes(cell.columnId))
                {
                    newCells.push(cell);
                }
               
            });

            row.cells = newCells;
        });


        

        return data;
    }

    const reloadData = async () => {
        let response = await apiService().post(url
        , paginationParam
        );
        if (response != null && response.status == 200)
        {
            let data1 = structuredClone(response.data);

            // get the data together in case we need to reference it
            setRawRows(data1.rows);

            setData(response.data);

            // if the column is marked as hidden, the system will hide it
            let modifiedData = AdjustForHiddenColumns(response.data);

            // set the rows
            setRows(modifiedData.rows);
            
            // set the columns
            setColumns(modifiedData.columns);

            setTotalCount(modifiedData.totalCount);
            if (modifiedData.rows.length > 0)
            {
                setRowHeight(modifiedData.rows[0].height);
            }

            setupSignalR();

            if (onLoading != null)
            {
                onLoading(false);
            }
        }
    }

    useImperativeHandle(ref, () => ({
        reloadData,
        getRows
    }));

    useEffect(() => {

        if (url && currentUser != null)
        {
            if (onLoading != null)
            {
                onLoading(true);
            }

            // setLeftColumnSticky(parseInt(localStorage.getItem("leftColumn")));
            // setRightColumnSticky(parseInt(localStorage.getItem("rightColumn")));
            // setTopRowSticky(parseInt(localStorage.getItem("topRow")));
            // setBottomRowSticky(parseInt(localStorage.getItem("bottomRow")));

            const fetchData = async () => {
                await reloadData();
            }
            fetchData();
        }

    }, [url, currentUser]);

    useEffect(() => {
        const fetchData = async () => {
            await reloadData();
        }
        fetchData();
    }, [paginationParam])

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
            changes.forEach(async (change) => {
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
                rawRows.forEach(row => {
                    if (row.rowId == dataRowId)
                    {
                        for (let index = 0; index < row.cells.length; index++) {
                            const element = row.cells[index];
        
                            rowBuilder[element.columnId] = element.text;
                        }
                    }
                });


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
                // else if (cellItem.type == "money")
                // {
                //     JSONBuilder[cellItem.columnId] = cellItem.value;
                //     cellItem.value = change.newCell.value;

                //     if (onChange != null)
                //     {
                //         onChange(rowBuilder, dataRowId, fieldName, change.newCell.value);
                //     }
                    
                //     try
                //     {
                //         hubConnection.invoke("CellChanged", documentId, userIdRef.current, dataRowId, fieldName, change.newCell.value.toString());
                //     }
                //     catch(exp) 
                //     { 
                //         console.error(exp);
                //     }
                // }
                else if (cellItem.type == "dateElement")
                {
                    JSONBuilder[cellItem.columnId] = cellItem.value;
                    cellItem.value = change.newCell.value;

                    if (onChange != null)
                    {
                        onChange(rowBuilder, dataRowId, fieldName, change.newCell.value);
                    }
                    
                    try
                    {
                        hubConnection.invoke("CellChanged", documentId, userIdRef.current, dataRowId, fieldName, change.newCell.value);
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
                else if (cellItem.type == "button")
                {
                    // JSONBuilder[cellItem.columnId] = cellItem.checked;
                    // cellItem.checked = change.newCell.checked;

                    if (onChange != null)
                    {
                        onChange(rowBuilder, dataRowId, fieldName, change.newCell);
                    }

                    // try
                    // {
                    //     hubConnection.invoke("CellChanged", documentId, userIdRef.current, dataRowId, fieldName, change.newCell.checked.toString());
                    // }
                    // catch(exp) 
                    // { 
                    //     console.error(exp);
                    // }
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
                else if (cellItem.type == "richtext")
                {
                    cellItem.hasText = change.newCell.hasText;
                    cellItem.text = change.newCell.text;
                        
                    JSONBuilder[cellItem.columnId] = cellItem.hasText;
                    JSONBuilder[cellItem.columnId] = cellItem.text;

                    cellItem.hasText = change.newCell.hasText;
                    cellItem.text = change.newCell.text;

                    if (onChange != null)
                    {
                        onChange(rowBuilder, dataRowId, fieldName, change.newCell.text);
                    }

                    // try
                    // {
                    //     hubConnection.invoke("CellChanged", documentId, userIdRef.current, dataRowId, fieldName, change.newCell.hasText.toString());
                    // }
                    // catch(exp) 
                    // { 
                    //     console.error(exp);
                    // }

                }
                else if (cellItem.type == "image")
                {
                    // let blobToUrl = URL.createObjectURL(change.newCell.photo);

                    // JSONBuilder[cellItem.columnId] = cellItem.url;
                    // cellItem.url = blobToUrl;

                    if (onChange != null)
                    {
                        const response = await fetch(change.newCell.photo.url);
                        let blobFile = await response.blob();
                        
                        await onChange(rowBuilder, dataRowId, fieldName, {
                            blob: blobFile,
                            id: change.newCell.photo.id,
                            status: change.newCell.photo.status
                        });

                        // reload the page
                        // await reloadData();
                    }

                    // try
                    // {
                    //     hubConnection.invoke("CellChanged", documentId, userIdRef.current, dataRowId, fieldName, change.newCell.url.toString());
                    // }
                    // catch(exp) 
                    // { 
                    //     console.error(exp);
                    // }
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

    function ImageCell(rowId, urls, photo, status) {
        this.type = 'image';
        this.urls = urls;
        this.photo = photo;
        this.status = status
        this.rowId = rowId;
    }

    const ImageCellTemplate = {
        // Render method for the cell
        render: function(cell, isInEditMode, onCellChanged) {

            const urls = cell.urls; // Get the image URL from the cell properties
            // const photo = cell.photo; // Get the image URL from the cell properties

            let width = "130px";
            // get the width of the photo
            // columns.forEach(element => {
            //     if (element.columnId == cell
            // });

            return (
                <Box>
                    {(urls != null && urls.length > 0) &&
                        <img src={urls[0].url} width={photoWidth + "px"} style={{objectFit:"contain", cursor:"pointer"}} height={rowHeight} onClick={() => {
                                setShowPhotoUploadDialog({
                                    urls: urls,
                                    cell: cell,
                                    rowId: (cell.rowId != null ? parseInt(cell.rowId) : 0),
                                    onCellChanged: onCellChanged,
                                    status: "modified"
                                });
                        }} />
                    }

                    {(urls == null || urls.length == 0) &&
                        <Box width={photoWidth + "px"} height={rowHeight} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', cursor:"pointer"}}
                            onClick={() => {
                                setShowPhotoUploadDialog({
                                    urls: urls,
                                    cell: cell,
                                    rowId: (cell.rowId != null ? parseInt(cell.rowId) : 0),
                                    onCellChanged: onCellChanged,
                                    status: "new"
                                });
                            }}
                        >
                            {noPhotoText}
                        </Box>
                    }

                </Box>
            )
        },
        getCompatibleCell: function(uncertainCell) {
            const text = uncertainCell.text || '';
            const urls = uncertainCell.urls || '';
            const photo = uncertainCell.photo || '';
            const status = uncertainCell.status || '';
            const rowId = uncertainCell.rowId || ''; // Ensure rowId is included

            
            return new ImageCell(rowId, urls, photo, status);
        },
        // Handle key down events (optional)
        handleKeyDown: function(cell, keyCode) {
            // if (keyCode === 13) {
            //     // Handle the Enter key event if needed
            //     return { cell, enableEditMode: true }; // Keep the cell in view mode
            // }
            // if (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40)
            // {
            //     return { cell, enableEditMode: false }; // Keep the cell in view mode
            // }
            // else
            // {
                return { cell, enableEditMode: false }; // Keep the cell in view mode
            // }
        },
        handleMouseDown: function (event) {
            // Prevent the default behavior of ReactGrid's edit mode
            //event.preventDefault();
            event.stopPropagation();

            // Return the cell with edit mode enabled
            return { cell, enableEditMode: false };
        },
        // Update the cell's value (optional)
        update: function(cell, cellToMerge) {
            return this.getCompatibleCell(Object.assign({}, cell, cellToMerge));
        }
    }

    // function MoneyCell(value) {
    //     this.type = 'money';
    //     this.value = value;
    // }

    // const MoneyCellTemplate = {
    //     // Render method for the cell
    //     render: function(cell, isInEditMode, onCellChanged) {
    //         const value = cell.value; 
    //         return (

    //         <>
    //             {isInEditMode &&
    //                 <FormControl fullWidth sx={{ marginTop:1, height:"85%" }}>
    //                     <InputLabel>Amount</InputLabel>
    //                     <OutlinedInput
    //                         ref={input => {
    //                             input && input.focus();
    //                         }}
    //                         autoFocus={true}
    //                         sx={{height:"100%"}}
    //                         defaultValue={value}
    //                         startAdornment={<InputAdornment position="start">$</InputAdornment>}
    //                         label="Amount"
    //                         onKeyDown={(e) => {

    //                             if (e.key === 'Enter') {
    //                                 e.preventDefault(); // Prevent the default Enter key action
    //                             }
    //                             else
    //                             {
    //                                 e.stopPropagation();
    //                             }
                                
    //                         }} // Prevent DataGrid from taking focus
    //                         onChange={(e) => {
    //                             onCellChanged(
    //                                 { ...cell, value: parseFloat(e.target.value) },
    //                                 false
    //                             );
    //                             this.update(cell, { value: parseFloat(e.target.value) });
    //                         }}
    //                     />
    //                 </FormControl>
    //             }

    //             {(!isInEditMode && value != null && value != "") &&
    //                 <Box>${value.toFixed(2)}</Box>
    //             }
    //         </>
            
    //     )},
    //     getCompatibleCell: function(uncertainCell) {
    //         const value = uncertainCell.value || '';
    //         // const url = uncertainCell.url || '';
    //         return new MoneyCell(value);
    //     },
    //     // Handle key down events (optional)
    //     handleKeyDown: function(cell, keyCode) {
    //         if (keyCode === 13) {
    //             // Handle the Enter key event if needed
    //             return { cell, enableEditMode: true }; // Keep the cell in view mode
    //         }
    //         if (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40)
    //         {
    //             return { cell, enableEditMode: false }; // Keep the cell in view mode
    //         }
    //         else
    //         {
    //             return { cell, enableEditMode: true }; // Keep the cell in view mode
    //         }
            
    //     },
    //     // Update the cell's value (optional)
    //     update: function(cell, cellToMerge) {

    //         return this.getCompatibleCell(Object.assign({}, cell, cellToMerge));
    //     }
    // }

    function DateElementCell(value) {
        this.type = 'dateElement';
        this.value = value;
    }

    const DateElementCellTemplate = {
        // Render method for the cell
        render: function(cell, isInEditMode, onCellChanged) {
            const value = cell.value;
            
            return (

            <>
                {isInEditMode &&
                    <input
                        className="rg-input"
                        ref={(input) => {
                            if (input) input.focus();
                        }}
                        sx={{height:"100%", width:"100%"}}
                        type="date"
                        defaultValue={value}
                        onCopy={(e) => e.stopPropagation()}
                        onCut={(e) => e.stopPropagation()}
                        onPaste={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {

                            if (e.key === 'Enter') {
                                e.preventDefault(); // Prevent the default Enter key action
                            }
                            else
                            {
                                e.stopPropagation();
                            }
                            
                        }} // Prevent DataGrid from taking focus
                        onChange={(e) => {
                            onCellChanged(
                                { ...cell, value: e.target.value },
                                false
                            );
                            this.update(cell, { value: e.target.value });
                        }}
                    />
                }

                {(!isInEditMode && value != null && value != "") &&
                    <Box>{value}</Box>
                }
            </>
            
        )},
        getCompatibleCell: function(uncertainCell) {
            const value = uncertainCell.date || '';
            return new DateElementCell(value);
        },
        // Handle key down events (optional)
        handleKeyDown: function(cell, keyCode) {
            if (keyCode === 13) {
                // Handle the Enter key event if needed
                return { cell, enableEditMode: true }; // Keep the cell in view mode
            }
            if (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40)
            {
                return { cell, enableEditMode: false }; // Keep the cell in view mode
            }
            else
            {
                return { cell, enableEditMode: true }; // Keep the cell in view mode
            }
            
        },
        // Update the cell's value (optional)
        update: function(cell, cellToMerge) {

            return this.getCompatibleCell(Object.assign({}, cell, cellToMerge));
        }
    }





    function ButtonElementCell(text) {
        this.type = 'button';
        this.text = text;
    }

    const ButtonElementCellTemplate = {
        // Render method for the cell
        render: function(cell, isInEditMode, onCellChanged) {
            const text = cell.text;
            
            return (
                <Box sx={{textAlign:"center", width:"100%"}}>

                    <Button variant="contained" onClick={() => {

                        onCellChanged(
                            { ...cell, value: text },
                            true
                        );

                    }}>{text}</Button>
                </Box>
        )},
        getCompatibleCell: function(uncertainCell) {
            const value = uncertainCell.text || '';
            return new ButtonElementCell(value);
        },
        // Handle key down events (optional)ss
        handleKeyDown: function(cell, keyCode) {
            // if (keyCode === 13) {
            //     // Handle the Enter key event if needed
            //     return { cell, enableEditMode: true }; // Keep the cell in view mode
            // }
            // if (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40)
            // {
            //     return { cell, enableEditMode: false }; // Keep the cell in view mode
            // }
            // else
            // {
            //     return { cell, enableEditMode: true }; // Keep the cell in view mode
            // }

            return { cell, enableEditMode: false }; // Keep the cell in view mode
            
        },
        // Update the cell's value (optional)
        update: function(cell, cellToMerge) {

            return this.getCompatibleCell(Object.assign({}, cell, cellToMerge));
        }
    }





    function RichTextCell(hasText, text) {
        this.type = 'richtext';
        this.hasText = hasText;
        this.text = text;
    }

    const RichTextCellTemplate = {
        // Render method for the cell
        render: function(cell, isInEditMode, onCellChanged) {

            const hasText = cell.hasText;
            const text = cell.text;

            return (
                <Box>
                    {hasText &&
                        <Button variant="text" onClick={() => {
                            setEditDescriptionDialog({
                                text: text,
                                hasText: hasText,
                                cell: cell,
                                onCellChanged: onCellChanged
                            });
                        }}>Edit Description</Button>
                    }

                    {!hasText &&
                        <Button variant="text" onClick={() => {
                            setEditDescriptionDialog({
                                text: text,
                                hasText: hasText,
                                cell: cell,
                                onCellChanged: onCellChanged
                            });
                        }}>Add Description</Button>
                    }

                </Box>
            )
        },
        getCompatibleCell: function(uncertainCell) {
            const hasText = uncertainCell.hasText || '';
            const text = uncertainCell.text || '';
            return new RichTextCell(hasText, text);
        },
        // Handle key down events (optional)
        handleKeyDown: function(cell, keyCode) {
            // if (keyCode === 13) {
            //     // Handle the Enter key event if needed
            //     return { cell, enableEditMode: true }; // Keep the cell in view mode
            // }
            // if (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40)
            // {
            //     return { cell, enableEditMode: false }; // Keep the cell in view mode
            // }
            // else
            // {
                return { cell, enableEditMode: false }; // Keep the cell in view mode
            // }
        },
        handleMouseDown: function (event) {
            // Prevent the default behavior of ReactGrid's edit mode
            //event.preventDefault();
            event.stopPropagation();

            // Return the cell with edit mode enabled
            return { cell, enableEditMode: true };
        },
        // Update the cell's value (optional)
        update: function(cell, cellToMerge) {
            return this.getCompatibleCell(Object.assign({}, cell, cellToMerge));
        }
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
                            {sessions.map((user, index) => {
                                return <Tooltip key={index} title={user.name}><Avatar {...stringAvatar(user.name, user.borderColor)} alt={user.name}></Avatar></Tooltip>
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
                            customCellTemplates={{
                                image: ImageCellTemplate,
                                //money: MoneyCellTemplate,
                                dateElement: DateElementCellTemplate,
                                richtext: RichTextCellTemplate,
                                button: ButtonElementCellTemplate
                            }}
                            // enableRowSelection={true}
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


                {/* {columns != null &&
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
                } */}


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

            <PhotoEditor
                key={photoEditorKey}
                isOpen={showPhotoUploadDialog != null} 
                // imageUrl={showPhotoUploadDialog != null ? showPhotoUploadDialog.url : ""}
                photoUrls={showPhotoUploadDialog != null ? showPhotoUploadDialog.urls : []}
                rowData={showPhotoUploadDialog != null ? getRowData(showPhotoUploadDialog.rowId) : null}
                onMouseDown={e => e.stopPropagation()}
                onCancelEditor={async () => {
                    setShowPhotoUploadDialog(null);
                    await reloadData();
                }}
                ref={input => {
                    input && input.focus();
                }}
                onKeyDown={(e) => {

                    if (e.key === 'Enter') {
                        e.preventDefault(); // Prevent the default Enter key action
                    }
                    else
                    {
                        e.stopPropagation();
                    }
                    
                }} // Prevent DataGrid from taking focus
                onPhotoUpdated={async (photo) => {

                    // call new photo event directly here...
                    if (photo.status == "new")
                    {
                        if (onAddPhoto != null)
                        {
                            let response = await onAddPhoto(photo);
                            return response;

                            // showPhotoUploadDialog.onCellChanged(
                            //     { ...showPhotoUploadDialog.cell, photo: response },
                            //     true
                            // );
                        }                       
                    }
                    else
                    {
                        // this will be used for modifying a photo
                        showPhotoUploadDialog.onCellChanged(
                            { ...showPhotoUploadDialog.cell, photo: photo },
                            true
                        );
                    }

                    //setShowPhotoUploadDialog(null);

            }}
            onPhotoDelete={async (photo) => {

                if (onPhotoDelete != null)
                {
                    await onPhotoDelete(photo);
                }
            }}
            />

            <SpreadSheetRichTextEditor 
                isOpen={editDescriptionDialog != null ? true : false}
                content={editDescriptionDialog != null ? editDescriptionDialog.cell.text : ""}
                editDescriptionDialog={editDescriptionDialog}
                onCancelEditor={() => {
                    setEditDescriptionDialog(null);
                }}
                onUpdate={(html) => {

                    let hasText = false;
                    if (html != null && html != "")
                    {
                        hasText = true;
                    }

                    editDescriptionDialog.onCellChanged(
                        { ...editDescriptionDialog.cell, hasText: hasText, text: html },
                        true
                    );

                    setEditDescriptionDialog(null);
                }}
                
            />
            <Box mt={3} mb={3}>
            {paginationParam != null && paginationParam.offset != null && paginationParam.length != null &&
                <Pagination  variant="outlined" color="primary" onChange={(e, v) => {setPaginationParam({...paginationParam, offset : v})}}   page={paginationParam.offset}  count={Math.ceil(totalCount / paginationParam.length)}  />
            }
        </Box>
        </Box>
    );
});

SpreadsheetViewer.displayName = "SpreadsheetViewer";

export default SpreadsheetViewer;