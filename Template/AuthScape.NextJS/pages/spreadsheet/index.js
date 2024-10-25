import React, {useEffect, useState, useRef} from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
// import SpreadsheetViewer from 'authscape-spreadsheet';
import { apiService } from 'authscape';
import SpreadsheetViewer from '../../components/spreadsheet/spreadsheetViewer';
// import SpreadsheetViewer from 'authscape-spreadsheet';
// import { apiService, SpreadsheetViewer } from 'authscape';

export default function Spreadsheet({currentUser}) {

    return (
    <div>
        <Head>
            <title>Spreadsheet</title>
            <meta name="description" content="AuthScape OEM" />
            <link rel="icon" href="/favicon.ico" />

            <style>{`
                div[data-cell-colidx="0"] {
                    display: none;
                }
            `}</style>
        </Head>

        <Box sx={{width: '100%' }}>
            <Box>
                <SpreadsheetViewer url={"/SpreadSheet/GetRecords"} 
                    // usePagination={{
                    //     offset: 1,
                    //     length: 9,
                    //     search: "",
                    //     isArchived: false
                    // }}
                    documentId={"60A71681-45CE-4BFF-8267-E49D7D042192"} 
                    currentUser={currentUser}
                    hubUrl={process.env.apiUri + "/chat"}
                    // onFocusLocationChanged={(rowId, columnId) => {

                    //     apiService().post("/SpreadSheet/FocusLocationChanged", {
                    //         userId: currentUser.id,
                    //         rowId: rowId,
                    //         column: columnId
                    //     });
                    // }}
                    onChange={async (row, rowId, fieldName, value) => {

                        alert(JSON.stringify(row));

                        // if (fieldName == "Photo" || fieldName == "Photos")
                        // {
                        //     const data = new FormData();
                        //     data.append("identifier", value.id);
                        //     data.append("file", value.blob, "updatedphoto.jpg");
                        //     await apiService().post("/SpreadSheet/UploadPhoto", data);
                        // }
                        // else if (fieldName == "Remove")
                        // {
                        //     alert(JSON.stringify(row));
                        // }
                        // else
                        // {
                        //     apiService().put("/SpreadSheet/CellChanged", {
                        //         id: row.Id,
                        //         rowId: rowId,
                        //         fieldName: fieldName,
                        //         value: value.toString()
                        //     });
                        // }

                    }}

                    onPhotoDelete={(photo) => {

                        alert("data - " + JSON.stringify(photo))

                    }}
                    
                    sx={{height: "100%", width:"100%"}} />
            </Box>
        </Box>
    </div>
    )
}