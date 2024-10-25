import React, {useEffect, useState} from 'react';
import { Box } from '@mui/system';
import {Pricing} from 'authscape';

export default function Home({loadedUser, setIsLoading, currentUser}) {


    const tiers = [
        {
            id: "1",
            image: "https://imagehere.com",
            title: 'Title',
            subTitle: "subtitle",
            price: '55',
            qty: {
                minQty: 1,
                maxQty: 10
            },
            duration: "each",
            description:"<div>Description here</div>",
            buttonText: 'BUY NOW',
            buttonVariant: 'contained',
            modifiers:
                [
                    {
                        name: "Size",
                        options: ["Small", "Medium", "Large", "Extra Large", "2X Large"]
                    }
                ]
        },
        {
            id: "2",
            image: "https://imagehere.com",
            title: 'Title',
            subTitle: "Subtitle",
            description:"<div>Description here</div>",
            price: '55',
            qty: {
                minQty: 1,
                maxQty: 10
            },
            duration: "each",
            buttonText: 'BUY NOW',
            buttonVariant: 'contained',
            modifiers:
                [
                    {
                        name: "Size",
                        options: ["One Size Fits All"]
                    }
                ]
        },
    ];

    return (
        <Box sx={{paddingTop:2}}>
            <Pricing tiers={tiers} onButtonClicked={(response) => {

                alert(response.id);
                alert(JSON.stringify(response.modifiers))
                alert(JSON.stringify(response.qty))

            }} />
        </Box>
    )
}