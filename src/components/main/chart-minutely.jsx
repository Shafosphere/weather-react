import data from "./data";
import React from 'react';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chart.js/auto'; // If you haven't already imported Chart.js

export default function ChartPerMinute() {
    Chart.register(ChartDataLabels);
    const chartData = {
        labels: data[0].timelines.minutely.map(item => item.time),
        datasets: [
            {
                label: 'Temerature',
                data: data[0].timelines.minutely.map(item => item.values.temperature),
                fill: true, // Optionally modify if you want a filled line chart
                borderColor: '#7066c2', // Or any color
                backgroundColor: '#b8b3e0',
                pointRadius: 20,
                pointStyle: false,
            }
        ]
    };
    const chartOptions = {

        plugins: {
            tooltip: {
                callbacks: {
                    // Tylko tytuł tooltip jest modyfikowany, aby pokazać wartość temperatury
                    title: function(tooltipItems) {
                        return ''; // Usuwa domyślny tytuł
                    },
                    // Ustawia etykietę tooltip, aby pokazywała tylko wartość temperatury
                    label: function(tooltipItem) {
                        let label = tooltipItem.chart.data.labels[tooltipItem.dataIndex];
                        let value = tooltipItem.parsed.y;
                        return `${value}°C`;
                    }
                }
            },
            title: {
                display: true,
                text: 'Temperature in the next hour'
            },
            legend: {
                display: false
            },
            datalabels: {
                color: '#36A2EB',
                anchor: 'end',
                align: 'top',
                // offset: 20,
                formatter: function(value, item) {
                    return item.dataIndex % 5 === 0 ? value + '°C' : '';
                }
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                    font: {
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                },
                ticks: {
                    autoSkip: true,
                    callback: function (val, index){
                        return index % 2 === 0 ? (parseFloat(val.toFixed(2))) : '';
                    },
                    font: {
                        size: 15
                    }
                },
            },
            x: {
                title: {
                    display: false,
                    text: 'Time'
                },
                ticks: {
                    autoSkip: false,
                    // Wyświetl etykietę co piąty element
                    callback: function (val, index) {
                        const date = moment(this.getLabelForValue(val));
                        
                        // return (date.format('HH:mm'));
                        return index % 10 === 0 ? (date.format('HH:mm')) : '';
                    },
                    color: 'black',
                    maxRotation: 0,
                    font: {
                        size: 15 // Ustaw mniejszy rozmiar czcionki
                    }
                },
                grid: {
                    display: false, // Ukrywa siatkę osi X
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