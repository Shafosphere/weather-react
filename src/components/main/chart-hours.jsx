import data from "./data"
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // If you haven't already imported Chart.js

export default function ChartPerHour(){
    const chartData = {
        labels: data[0].timelines.hourly.map(item => item.time), 
        datasets: [
            {
                label: 'Temperature',
                data: data[0].timelines.hourly.map(item => item.values.temperature),
                fill: false, // Optionally modify if you want a filled line chart
                borderColor: 'rgba(255, 99, 132, 1)', // Or any color
                tension: 0.4 // For curved lines (adjust or remove if needed) 
            }
        ]
    };
    const chartOptions = {
        scales: {
            y: { 
                beginAtZero: false, // Modify if you want the y-axis to start at 0
                title: {
                    display: true,
                    text: 'Temperature (°C)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Time'
                }
            }
        }
    };
    return (
        <div>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}