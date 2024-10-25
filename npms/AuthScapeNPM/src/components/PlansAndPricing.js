import React from 'react';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm, Controller } from 'react-hook-form';

export function Pricing({title = null, tiers = [], features = null, onButtonClicked = null}) {

    const {control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm();


    const calculateQty = (qty) => {

        let newMax = qty.minQty + qty.maxQty;
        
        let menuItemArray = [];
        let newIndex = 1;
        for (let index = qty.minQty; index < newMax; index++) {
            menuItemArray[newIndex] = newIndex;
            newIndex++;
        }
        return menuItemArray;
    }

    return (
        <Box sx={{paddingTop:2}}>
            <form >




                <Grid container spacing={0} justifyContent="center" alignItems="stretch"  direction="row">

                    {title != null &&
                    <Grid item xs={12} sm={6} md={3} key={"plans"}>
                        <Typography variant="h4" gutterBottom>
                        {title}
                        </Typography>
                    </Grid>
                    }

                    {tiers.map((tier) => (
                        <Grid item xs={12} sm={6} md={3} key={tier.title}>
                            <Box sx={{paddingBottom:2, padding:2}}>
                                <Box sx={{textAlign:"center", paddingTop:2}}>
                                    {tier.image != null &&
                                        <img src={tier.image} width={200} height={200} />
                                    }
                                    <Typography variant="h3" component="h2" sx={{paddingTop:3}}>
                                        {tier.title}
                                    </Typography>
                                    {tier.subTitle &&
                                    <Typography variant="h6" component="h2" sx={{paddingTop:2}}>
                                        {tier.subTitle}
                                    </Typography>
                                    }

                                    <Grid container spacing={0}>
                                        <Grid item xs={tier.qty != null ? 6 : 12} sx={{padding: 4}}>
                                            <Box component={"span"} sx={{fontSize:30, fontWeight:"bold"}}>
                                                ${tier.price}        
                                            </Box>
                                            {tier.duration != null &&
                                                <Box component={"span"}>
                                                    / {tier.duration}
                                                </Box>
                                            }
                                        </Grid>

                                        {tier.qty != null &&
                                        <Grid item xs={6} sx={{padding: 4}}>
                                            <Controller name={"qty-" + tier.id} 
                                                control={control}
                                                rules={{
                                                    required: false,
                                                }}
                                                render={({renderField}) => 
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">{"Quantity"}</InputLabel>
                                                        <Select
                                                            {...register("qty-" + tier.id, { required: false })}
                                                            {...renderField}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            defaultValue={1}
                                                            label={"Quantity"}>
                                                                
                                                                {calculateQty(tier.qty).map((menuItem, index) => {
                                                                    return (
                                                                        <MenuItem key={index} value={menuItem}>{menuItem}</MenuItem>
                                                                    )
                                                                })}
                                                                                                
                                                        </Select>
                                                    </FormControl>
                                            } />
                                        </Grid>
                                        }
                                    </Grid>

                                    {tier.modifiers != null &&
                                    <Box sx={{paddingBottom:2}}>
                                        {tier.modifiers.map((modifier, index) => {
                                            return (
                                                <Controller name={"modifier-" + tier.id + modifier.name} 
                                                control={control}
                                                rules={{
                                                    required: false,
                                                }}
                                                render={({renderField}) => 
                                                    <FormControl fullWidth key={index} sx={{marginTop: 2}}>
                                                        <InputLabel id="demo-simple-select-label">{modifier.name}</InputLabel>
                                                        <Select
                                                            {...register("modifier-" + tier.id + "-" + modifier.name, { required: false })}
                                                            {...renderField}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            defaultValue={0}
                                                            label={modifier.name}>

                                                                {modifier.options.map((mod, index) => {
                                                                    return <MenuItem key={index} value={index}>{mod}</MenuItem>
                                                                })}
                                                                                                
                                                        </Select>
                                                    </FormControl>
                                                } />
                                            )
                                        })}    
                                    </Box>
                                    }

                                    <Button fullWidth variant={tier.buttonVariant} endIcon={<ChevronRightRoundedIcon/>} sx={{height:50}} onClick={handleSubmit(async (data) => {

                                        let modifiers = {};
                                        let qty = null;
                                        if (tier.modifiers != null)
                                        {
                                            for (let index = 0; index < tier.modifiers.length; index++) {
                                                const modifier = tier.modifiers[index];
                                                
                                                // assign the modifier as a property
                                                modifiers[modifier.name] = data["modifier-" + tier.id + "-" + modifier.name]; 
                                            }
                                        }

                                        if (tier.qty != null)
                                        {
                                            qty = parseInt(data["qty-" + tier.id]); 
                                        }

                                        if (onButtonClicked != null)
                                        {
                                            onButtonClicked({
                                                id: tier.id,
                                                modifiers: modifiers,
                                                qty: qty
                                            });
                                        }

                                    })}>
                                        {tier.buttonText}
                                    </Button>

                                    <Typography variant="body2" sx={{paddingTop:2, fontSize:16, textAlign:"left", lineHeight:"1.5rem"}}>

                                        <div
                                            dangerouslySetInnerHTML={{__html: tier.description}}
                                        />

                                    </Typography>
                                    
                                </Box>
                                
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {features != null &&
                <Box sx={{paddingTop:1}}>
                    
                        {features.map(feature => {

                            return (
                                <Box>
                                    <Box sx={{backgroundColor:"lightgray", padding:1, borderRadius:2}}>
                                        <Typography variant="h5" gutterBottom>
                                            {feature.name}
                                        </Typography>
                                    </Box>
                                    <Grid container spacing={0} justifyContent="center">
                                        {feature.subfeatures.map((subfeature, subFeatureIndex) => {

                                            return (
                                            <>
                                                {subfeature.map((item, index) => {
                                                    return (
                                                    <Grid item xs={3} key={subfeature}>
                                                        <Box sx={{padding:2, height:60, paddingTop: (subFeatureIndex == 0 ? 3 : 2), textAlign: (index == 0 ? "left" : "center")}}>
                                                            {item}
                                                        </Box>

                                                        {feature.subfeatures.length - 1 != subFeatureIndex ? <hr/> : ""}
                                                        
                                                    </Grid>
                                                    )
                                                })}
                                                
                                            </>
                                            )
                                        })}
                                        
                                    </Grid>
                                </Box>
                            )

                        })}
                </Box>
                }

            </form>
        </Box>
    )
}
