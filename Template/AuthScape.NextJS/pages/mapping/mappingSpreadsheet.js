import React, {useEffect, useState, useRef} from 'react';
import { Box } from '@mui/system';
import SpreadsheetViewer from '../../components/spreadsheetViewer';
import { apiService } from 'authscape';

export default function Home({currentUser}) {

    return (
        <Box sx={{paddingTop:4}}>
            {(currentUser != null) &&
                <SpreadsheetViewer url={"/DocumentMapping/GetDynamicDocument?companyId=" + currentUser.companyId} documentId={"60A71681-45CE-4BFF-8267-E49D7D042192"} currentUser={currentUser} loadedUser={true} hubUrl={process.env.apiUri + "/chat"}
                onFocusLocationChanged={(rowId, columnId) => {

                    apiService().post("/SpreadSheet/FocusLocationChanged", {
                        userId: currentUser.id,
                        rowId: rowId,
                        column: columnId
                    });
                }}
                onChange={async (row, rowId, fieldName, value) => {

                    await apiService().put("/DocumentMapping/ChangeCell", {
                        id: row.Id,
                        rowId: rowId,
                        fieldName: fieldName,
                        value: value.toString()
                    });

                }} sx={{height: "70vh", width:"170vh"}} />
            }
        </Box>
    )
}
