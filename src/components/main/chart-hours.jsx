import data from "./data";
import React from 'react';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chart.js/auto'; // If you haven't already imported Chart.js

export default function ChartPerHour() {
    Chart.register(ChartDataLabels);
    const chartData = {
        labels: data[0].timelines.hourly.map(item => item.time),
        datasets: [
            {
                label: 'Temerature',
                data: data[0].timelines.hourly.map(item => item.values.temperature),
                fill: true, // Optionally modify if you want a filled line chart
                borderColor: 'rgb(109, 192, 213)', // Or any color
                pointRadius: 20,
                pointStyle: false,
                segment: {
                    backgroundColor: (ctx) => {
                        // Pobierz datę dla punktu początkowego segmentu
                        const date = moment(chartData.labels[ctx.p0DataIndex]);
                        // Sprawdź dzień tygodnia i zwróć odpowiedni kolor
                        switch (date.format('dddd')) {
                            case 'Monday':
                            case 'Thursday':
                                return 'rgba(67, 124, 144, 0.3)';
                            case 'Tuesday':
                            case 'Friday':
                                return 'rgba(0, 204, 102, 0.3)'; // Czerwony dla poniedziałku
                            case 'Wednesday':
                            case 'Saturday':
                                return 'rgba(247, 197, 72, 0.4)'; // Czerwony dla poniedziałku
                            case 'Sunday':
                                return 'rgba(247, 92, 3, 0.3)'; // Czerwony dla poniedziałku
                            default:
                                return 'rgba(0, 0, 255, 0.3)'; // Domyślny kolor dla innych dni
                        }
                    },
                },
            }
        ]
    };
    const chartOptions = {

        plugins: {
            tooltip: {
                callbacks: {
                    title: function (tooltipItem) {
                        let formatedLabel = moment(tooltipItem[0].label);
                        return `${(formatedLabel.format('dddd'))}` + ' ' + `${(formatedLabel.format('HH:mm'))}`;
                    },
                    label: function (tooltipItem) {
                        let value = tooltipItem.parsed.y;
                        return `${value}°C `;
                    },
                }
            },
            title: {
                display: true,
                text: 'Temperature in the coming 5-days'
            },
            legend: {
                display: false
            },
            datalabels: {
                color: '#36A2EB',
                anchor: 'end',
                align: 'top',
                // offset: 20,
                formatter: function (value, item) {
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
                        if (date.format('HH:mm') == '00:00') { return (date.format('dddd')); }
                        if (date.format('HH:mm') == '12:00') { return (date.format('HH:mm')); }
                    },
                    color: 'black',
                    maxRotation: 30,
                    font: {
                        size: 15 // Ustaw mniejszy rozmiar czcionki
                    }
                },
                grid: {
                    display: true, // Ukrywa siatkę osi X
                    color: 'rgba(0, 0, 0, 0.1)' // Ustawia subtelny kolor linii siatki
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