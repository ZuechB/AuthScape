import React, {useEffect, useState} from 'react';
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Box from '@mui/material/Box';

export const EditableDatagrid = ({url = null, eRows = null, columns, isCellEditable = null, onCellClick = null, onCellEdited = null, params = null, sx = {}, height="50vh", pageSize = 50, rowsPerPage  = [25, 50, 100], rowHeight = 70, key = null, onRowClick = null}) => {

    const [rows, setRows] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    // const [offset, setOffset] = useState(0);

    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: pageSize,
    });


    useEffect(() => {

        reloadDataGrid();

    }, [paginationModel]);

    
    const reloadDataGrid = async () => {  

        if (url != null)
        {
            let response = null;
            if (params == null)
            {
                response = await apiService().post(url,
                {
                    offset: paginationModel.page,
                    length: paginationModel.pageSize
                });
            }
            else
            {
                params.offset = paginationModel.page;
                params.length = paginationModel.pageSize;

                response = await apiService().post(url, params);
            }
            
            if (response != null && response.status == 200)
            {
                setTotalRows(response.data.recordsTotal);
                setRows(response.data.data);
            }
        }
        else if (rows != null) 
        {
            setTotalRows(eRows.length);
            setRows(eRows);
        }
    }

    const handleCellEditCommit = React.useCallback(() => async (params) => {

        const { id, field, value } = params;
        const editedRow = { id, field, value };

        onCellEdited(editedRow);
    
    }, []);

    return (
        <Box sx={{height}}>
            <DataGrid
                rows={rows}
                sx={sx}
                key={key}
                columns={columns}
                rowCount={totalRows}
                onRowClick={onRowClick}
                paginationMode="server"
                pageSizeOptions={rowsPerPage}
                rowHeight={rowHeight}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                disableSelectionOnClick={true}
                onCellClick={onCellClick}
                onCellEditCommit={handleCellEditCommit()}
                isCellEditable={(params) => {

                    if (isCellEditable != null)
                    {
                        isCellEditable(params);
                    }
                    return true;
                }}
            />
        </Box>
    )

}