
import React, {useEffect, useState, useRef} from 'react';
// import { apiService, FileUploader} from 'authscape';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { QueryBuilder } from 'react-querybuilder';


export function ConditionBasedTool({toColumnOptions, documentId, onConditionApplied}) {

    const [currentQuery, setCurrentQuery] = useState(null);

    // const fields = [
    //     { name: 'firstName', label: 'First Name' },
    //     { name: 'lastName', label: 'Last Name' }
    // ];

    useEffect(() => {

        if (documentId != null)
        {
            const fetchData = async () => {
                let response = await apiService().get("/DocumentMapping/GetRules?documentComponentId=" + documentId);
                if (response != null && response.status == 200)
                {
                    if (response.data != null && response.data != "")
                    {
                        setCurrentQuery(response.data);
                    }
                    else
                    {
                        setCurrentQuery(null);
                    }
                }
            }
            fetchData();
        }
        

    }, [documentId]);

    const getFields = () => {

        let fields = [];

        for (let index = 0; index < toColumnOptions.length; index++) {
            const toColumn = toColumnOptions[index];

            if (toColumn.isMapped) // only show filters that are mapped
            {
                fields.push({ name: toColumn.name, label: toColumn.visibleName });
            }
        }

        return fields;
    }

    const customOperators = [
        { name: 'contains', label: 'Contains' },
        { name: 'notContains', label: 'Does not contain' },
    ];

    return (
        <>
            <Box>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header">
                    Advance filtering
                    </AccordionSummary>
                    <AccordionDetails>
                        <QueryBuilder fields={getFields()} operators={customOperators} query={currentQuery} onQueryChange={setCurrentQuery} />

                        <Button variant="contained" sx={{marginTop:1}} onClick={async () => {

                            let response = await apiService().put("/DocumentMapping/ApplyFilterForViewer", {
                                documentComponentId: documentId,
                                rules: JSON.stringify(currentQuery)
                            });

                            if (response != null && response.status == 200)
                            {
                                onConditionApplied(currentQuery);
                            }

                        }}>Apply Filter</Button>
                    </AccordionDetails>
                </Accordion>

            </Box>
        </>
    )
}
