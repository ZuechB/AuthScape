import React, { useState } from 'react';
import Head from 'next/head';
import {apiService} from 'authscape';
import { Checkbox, TextField, Paper, Typography, Box, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import { fontSize, paddingLeft, paddingRight } from '@xstyled/styled-components';

export default function Home({currentUser}) {

    const accordings = [
        {
            name: "Category",
            expanded: true,
            filters: [
                {name: "Chair", available: 90},
                {name: "Table", available: 23},
                {name: "Storage", available: 68}
            ]
        },
        {
            name: "Colors",
            expanded: false,
            filters: [
                {name: "red", available: 19},
                {name: "blue", available: 45},
                {name: "green", available: 6}
            ]
        }
    ];

    const products = [
        {
            name: "Chair name",
            name: "Chair name 2",
            name: "Chair name 3",
            name: "Chair name 4",
        }
    ];


    return (
        <Box>
            <Box sx={{paddingLeft:2, fontSize:18}}>
                814 Found
            </Box>
            <Grid container spacing={2}>
                <Grid size={2}>
                    {accordings.map((according) => {
                        return (
                            <Accordion defaultExpanded={according.expanded} sx={{ boxShadow: 'none' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                                    {according.name}
                                </AccordionSummary>
                                <Box sx={{paddingLeft:2, paddingRight:3}}>

                                    <Stack>
                                        {according.filters.map((filterOption) => {
                                            return (
                                                <Box>
                                                    <Stack direction="row"
                                                        spacing={1}
                                                        sx={{justifyContent: "space-between", alignItems: "center"}}>
                                                        <Box>
                                                            <FormControlLabel control={<Checkbox defaultChecked={false} />} label={filterOption.name} />
                                                        </Box>
                                                        <Box sx={{fontSize:12}}>
                                                            {filterOption.available}
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                            )
                                        })}
                                    </Stack>
                                
                                </Box>
                            </Accordion>
                        )
                    })}                    
                </Grid>
                <Grid size={10}>
                    <Box>
                        <Grid container spacing={2}>
                            {products.map((product) => {
                                return (
                                <Grid size={3}>
                                    {product.name}
                                </Grid>
                                )
                            })}                        
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
