import React, { useEffect, useState } from 'react';
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
import { fontSize, fontWeight, paddingLeft, paddingRight } from '@xstyled/styled-components';
import Card from '../../components/marketplace/card';

export default function Home({currentUser}) {

    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState(null);
    const [total, setTotal] = useState(0);


    useEffect(() => {

        const fetchData = async () => {
            const response = await apiService().get("/Marketplace/GetMarketplace");
            if (response != null && response.status == 200)
            {
                setCategories(response.data.categories);
                setProducts(response.data.products);
                setTotal(response.data.total);
            }
        }
        fetchData();

    }, []);


    return (
        <Box>
            <Box sx={{paddingLeft:2, fontSize:18}}>
                {total} Found
            </Box>
            <Grid container spacing={2}>
                <Grid size={2}>
                    {categories != null && categories.map((according) => {
                        return (
                            <Accordion defaultExpanded={according.expanded} sx={{ boxShadow: 'none' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header" sx={{fontWeight:"bold"}}>
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
                            {products != null && products.map((product) => {
                                return (
                                <Grid size={3}>
                                    <Card />
                                    {/* {product.name} test */}
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
