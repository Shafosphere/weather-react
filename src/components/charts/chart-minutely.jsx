import React, { useEffect, useReducer } from 'react';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chart.js/auto';
import './styles-chart-minutely.css'
import {
    WiThermometer,
    WiBarometer,
    WiStrongWind,
    WiCloud,
    WiHumidity
} from "react-icons/wi";

const initialState = {
    display: 'temperature',
};

function reducer(state, action) {
    switch (action.type) {
        case 'temperature':
            return { display: 'temperature' };
        case 'humidity':
            return { display: 'humidity' };
        case 'pressure':
            return { display: 'pressureSurfaceLevel' };
        case 'windSpeed':
            return { display: 'windSpeed' };
        case 'cloudCover':
            return { display: 'cloudCover' }
        default:
            throw new Error();
    }
}



export default function ChartPerMinute({ data }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    Chart.register(ChartDataLabels);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            Chart.unregister(textCenter);
            Chart.register(textCenter);
        }, 250);
    }, [state]);

    const chartData = {
        labels: data[0].timelines.minutely.map(item => item.time),
        datasets: [
            {
                label: state.display,
                data: data[0].timelines.minutely.map(item => item.values[state.display]),
                fill: true,
                borderColor: () => {
                    switch (state.display) {
                        case 'temperature':
                            return '#FF0000';
                        case 'humidity':
                            return '#0000FF';
                        case 'pressureSurfaceLevel':
                            return '#00FF00';
                        default:
                            return '#000000';
                    }
                },
                backgroundColor: () => {
                    switch (state.display) {
                        case 'temperature':
                            return 'rgba(255, 0, 0, 0.5)';
                        case 'humidity':
                            return 'rgba(0, 0, 255, 0.5)';
                        case 'pressureSurfaceLevel':
                            return 'rgba(0, 255, 0, 0.5)';
                        default:
                            return 'rgba(0, 0, 0, 0.5)';
                    }
                },
                tension: 0.7,
                pointRadius: 30,
                pointStyle: false,
            }
        ]
    };
    const textCenter = {
        id: 'textCenter',
        beforeDatasetsDraw(chart, args, options) {
            const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
            if (options.shouldDisplayText) {
                ctx.save();
                ctx.font = 'bold 50px sans-serif';
                ctx.fillStyle = 'grey';
                ctx.textAlign = 'center';
                ctx.fillText(backgroundChartText(), width / 2 + left, height / 2 + top);
                ctx.restore();
            }
        }
    }
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
                        const displayType = state.display;
                        const formatterFn = formatters[displayType];
                        return `${formatterFn(value)}`;
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
                formatter: function (value, item) {
                    const displayType = state.display;
                    const formatterFn = formatters[displayType];
                    return item.dataIndex % 5 === 0 ? formatterFn(value) : '';
                }
            },
            textCenter: {
                shouldDisplayText: true
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: false,
                    font: {
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                },
                ticks: {
                    autoSkip: true,
                    callback: function (val, index) {
                        return index % 2 === 0 ? (parseFloat(val.toFixed(2))) : '';
                    },
                    font: {
                        size: 15
                    }
                },
                grid: {
                    display: true,
                }
            },
            x: {
                title: {
                    display: false,
                    text: 'Time'
                },
                ticks: {
                    autoSkip: false,
                    callback: function (val, index) {
                        const date = moment(this.getLabelForValue(val));
                        return index % 10 === 0 ? (date.format('HH:mm')) : '';
                    },
                    color: 'black',
                    maxRotation: 0,
                    font: {
                        size: 15
                    }
                },
                grid: {
                    display: false,
                }
            }
        }
    };

    const formatters = {
        temperature: value => `${value}°C`,
        humidity: value => `${value} %`,
        windSpeed: value => `${value} km/h`,
        pressureSurfaceLevel: value => `${value} hPa`,
        cloudCover: value => `${value} %`,
    };

    function backgroundChartText() {
        switch (state.display) {
            case 'temperature':
                return 'Temperature';
            case 'humidity':
                return 'Humidity';
            case 'pressureSurfaceLevel':
                return 'Pressure Level';
            case 'cloudCover':
                return 'Clouds';
            default:
                return 'Wind Speed';
        };

    }

    const ButtonGroup = ({ dispatch }) => (
        <div className="button-container">
            <div onClick={() => dispatch({ type: 'temperature' })} className={`temperature-minutely one-button-container ${state.display === 'temperature' ? 'active' : 'deactive'}`}>
                <WiThermometer />
            </div>
            <div onClick={() => dispatch({ type: 'humidity' })} className={`humidity-minutely one-button-container ${state.display === 'humidity' ? 'active' : 'deactive'}`}>
                <WiHumidity />
            </div>
            <div onClick={() => dispatch({ type: 'pressure' })} className={`pressure-minutely one-button-container ${state.display === 'pressureSurfaceLevel' ? 'active' : 'deactive'}`}>
                <WiBarometer />
            </div>
            <div onClick={() => dispatch({ type: 'windSpeed' })} className={`windSpeed-minutely one-button-container ${state.display === 'windSpeed' ? 'active' : 'deactive'}`}>
                <WiStrongWind />
            </div>
            <div onClick={() => dispatch({ type: 'cloudCover' })} className={`cloudCover-minutely one-button-container ${state.display === 'cloudCover' ? 'active' : 'deactive'}`}>
                <WiCloud />
            </div>
        </div>
    );

    return (
        <div>
            <Line data={chartData} options={chartOptions} />
            <ButtonGroup dispatch={dispatch} />
        </div>
    );
}