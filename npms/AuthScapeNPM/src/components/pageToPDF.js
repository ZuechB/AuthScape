import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import Button from "@mui/material/Button";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

export const PageToPDF = ({buttonText = "Download", startIcon = <DownloadRoundedIcon/>, variant = "contained", elementById, scale = 2, showHideClassElements = [], fileName = "download"}) => {


    const onHideElements = () => {
        
        for (let index = 0; index < showHideClassElements.length; index++) {
            const element = showHideClassElements[index];
            
            let elements = document.getElementsByClassName(element);
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "none";
            }
        }
    }

    const onShowElements = () => {
        
        for (let index = 0; index < showHideClassElements.length; index++) {
            const element = showHideClassElements[index];

            let elements = document.getElementsByClassName(element);
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = "block";
            }
        }
    }


    const printElement = () => {

        onHideElements();

        const input = document.getElementById(elementById);
            html2canvas(input, {backgroundColor: null, scale: scale})
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png", 1.0);
                const pdf = new jsPDF();
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const scaleFactor = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
                const scaledWidth = imgWidth * scaleFactor;
                const scaledHeight = imgHeight * scaleFactor;
                const x = (pdfWidth - scaledWidth) / 2;
                const y = 0; // Set y coordinate to 0 to align to the top
                pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);
                pdf.save(fileName + ".pdf");
            });

        onShowElements();
    }


    return (
        <Box>
            <Button startIcon={startIcon} variant={variant} onClick={() => {

                printElement();

            }}>{buttonText}</Button>
        </Box>
    )


};