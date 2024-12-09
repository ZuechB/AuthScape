import React, { useEffect, useState } from 'react';
import {apiService} from 'authscape';
import { Checkbox, TextField, Paper, Typography, Box, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Card from '../../components/marketplace/card';
import Pagination from '@mui/material/Pagination';

export default function Home({currentUser}) {

    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    
    const handleChange = (event, value) => {
      setPage(value);
    };

    useEffect(() => {

        const fetchData = async () => {

            // how do I set the filters?

            const response = await apiService().get("/Marketplace/Search?pageNumber=" + page + "&pageSize=" + pageSize);
            if (response != null && response.status == 200)
            {
                setCategories(response.data.categories);
                setProducts(response.data.products);
                setTotal(response.data.total);
            }
        }
        fetchData();

    }, [page, pageSize]);

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
                    <Box sx={{paddingBottom:2}}>
                        <Grid container spacing={2}>
                            {products != null && products.map((product) => {
                                return (
                                <Grid size={3}>
                                    <Card product={product} />
                                </Grid>
                                )
                            })}

                            
                        </Grid>
                    </Box>

                    <Pagination count={pageSize} page={page} onChange={handleChange} />
                </Grid>
            </Grid>
            
        </Box>
    )
}
