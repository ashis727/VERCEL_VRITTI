"use client"
import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const StockAnalysisChart = () => {
    const yearlyData = [
        {
            year: 2021,
            data: [
                {
                    name: 'Income',
                    type: 'column',
                    data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
                },
                {
                    name: 'Cashflow',
                    type: 'column',
                    data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
                },
                {
                    name: 'Revenue',
                    type: 'line',
                    data: [20, 29, 37, 36, 44, 45, 50, 58]
                }
            ]
        },
        {
            year: 2022,
            data: [
                {
                    name: 'Income',
                    type: 'column',
                    data: [2.4, 3, 4.5, 2.5, 3.5, 4, 2.8, 3.6]
                },
                {
                    name: 'Cashflow',
                    type: 'column',
                    data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
                },
                {
                    name: 'Revenue',
                    type: 'line',
                    data: [20, 29, 37, 36, 44, 45, 50, 58]
                }
            ]
        },
        {
            year: 2023,
            data: [
                {
                    name: 'Income',
                    type: 'column',
                    data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
                },
                {
                    name: 'Cashflow',
                    type: 'column',
                    data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
                },
                {
                    name: 'Revenue',
                    type: 'line',
                    data: [20, 29, 37, 36, 44, 45, 50, 58]
                }
            ]
        }
    ];

    const [indexNo, setIndexNo] = useState<any>(0);
    const [series, setSeries] = useState<any>(yearlyData[indexNo]?.data);

    const [years, setYears] = useState(yearlyData[indexNo]?.year)

    const next = () => {
        const finalX = indexNo + 1;
        setIndexNo(finalX)
        setSeries(yearlyData[finalX].data)
        setYears(yearlyData[finalX]?.year)
    }
    const prev = () => {
        const finalX = indexNo - 1;
        setIndexNo(finalX)
        setSeries(yearlyData[finalX].data)
    }

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'line',
            stacked: false
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [1, 1, 4]
        },
        // title: {
        //     text: 'XYZ - Stock Analysis (2009 - 2016)',
        //     align: 'left',
        //     offsetX: 110
        // },
        xaxis: {
            categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        },
        yaxis: [
            {
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#008FFB'
                },
                labels: {
                    style: {
                        colors: '#008FFB',
                    }
                },
                title: {
                    text: "Income (thousand crores)",
                    style: {
                        color: '#008FFB',
                    }
                },
                tooltip: {
                    enabled: true
                }
            },
            {
                seriesName: 'Income',
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#00E396'
                },
                labels: {
                    style: {
                        colors: '#00E396',
                    }
                },
                title: {
                    text: "Operating Cashflow (thousand crores)",
                    style: {
                        color: '#00E396',
                    }
                },
            },
            {
                seriesName: 'Revenue',
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#FEB019'
                },
                labels: {
                    style: {
                        colors: '#FEB019',
                    },
                },
                title: {
                    text: "Revenue (thousand crores)",
                    style: {
                        color: '#FEB019',
                    }
                }
            },
        ],
        tooltip: {
            fixed: {
                enabled: true,
                position: 'topLeft',
                offsetY: 30,
                offsetX: 60
            },
        },
        legend: {
            horizontalAlign: 'left',
            offsetX: 40
        }
    }



    return (
        <div id="chart" className='w-[700px]'>
            {/* <div className="flex h-[90px] justify-end -mt-[59px]">
                <div className="flex bg-gray-200 h-[30px] items-center px-3 py-2 rounded-xl w-[125px] justify-between">
                    <div onClick={() => prev()}><GrFormPrevious /></div>
                    <div className='text-sm font-bold'>{years}</div>
                    <div onClick={() => next()}><GrFormNext /></div>
                </div>
            </div> */}


            <ReactApexChart options={options} series={series} type="line" height={350} width="100%" />
        </div>
    );
};

export default StockAnalysisChart;
