import React, { useEffect, useState } from 'react';
import { apiService } from 'authscape';
import Chart from "react-google-charts";
import { Box } from '@mui/material';
import { useRef } from 'react';

export default function Report({chartMethod, title = "", payload = null, width = 400, height = 300}) {


    const refIsLoadedReport = useRef(false);

    const [reportData, setReportData] = useState(null);
    const [responseChartId, setChartId] = useState(null);

    const GetData = async () => {

        let response = await apiService().post("/Reporting", {
            id: chartMethod,
            payload: JSON.stringify(payload)
        });
        let data = response.data;

        let dataArray = [];

        dataArray.push(data.columns);

        if (data != "" && data.content != null)
        {
            for (let index = 0; index < data.content.length; index++) {
                const contentData = data.content[index];
                
                if (data.reportType == 14)
                {
                    let contentArray = contentData.toString().split(",");
                    let newArray = [];

                    for (let index = 0; index < contentArray.length; index++) {
                        const element = contentArray[index];
                        
                        if (element.indexOf("DT-") != -1)
                        {
                            newArray.push(new Date(element.replace("DT-","")));
                        }
                        else
                        {
                            newArray.push(element);
                        }
                    }

                    dataArray.push(newArray);    
                }
                else
                {
                    dataArray.push(contentData);
                }
            }
            setReportData(dataArray);
        }

        setChartId(data.reportType);
    }

    useEffect(() => {

        if (!refIsLoadedReport.current)
        {
            refIsLoadedReport.current = true;
            const fetchData = async () => {
                await GetData();
            }
            fetchData();
        }
        
    }, [refIsLoadedReport.current])

    const GetChartType = (responseChartId) => {

        switch(responseChartId)
        {
            case 2:
                return "AreaChart";
            case 3:
                return "Bar";
            case 4:
                return "BubbleChart";
            case 6:
                return "CandlestickChart";
            case 8:
                return "Gauge";
            case 9:
                return "PieChart";
            case 13:
                return "Histogram";
            case 14:
                return "Timeline";
            case 15:
                return "WordTree";
        }
    }

    return (
        <Box>
            {/* {JSON.stringify(reportData)} */}

        {(reportData != null && responseChartId != null) &&
            <Chart
                width={width}
                height={height}
                chartType={GetChartType(responseChartId)}//{"AreaChart"}
                loader={<div>Loading Chart</div>}
                data={reportData}
                options={{
                title: title,
                // chartArea: { width: '30%' },
                // hAxis: {
                //     title: 'Total Population',
                //     minValue: 0,
                // },
                // vAxis: {
                //     title: 'City',
                // },
                }}
                legendToggle
            />
        }
        </Box>
    )
}