import React, { useEffect, useReducer } from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "chart.js/auto";
import {
  WiThermometer,
  WiBarometer,
  WiStrongWind,
  WiCloud,
  WiHumidity,
} from "react-icons/wi";

const initialState = {
  display: "temperature",
};

function reducer(state, action) {
  switch (action.type) {
    case "temperature":
      return { display: "temperature" };
    case "humidity":
      return { display: "humidity" };
    case "pressure":
      return { display: "pressureSurfaceLevel" };
    case "windSpeed":
      return { display: "windSpeed" };
    case "cloudCover":
      return { display: "cloudCover" };
    default:
      throw new Error();
  }
}

export default function ChartPerHour({ data }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  Chart.register(ChartDataLabels);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      Chart.unregister(textCenter);
      Chart.register(textCenter);
    }, 250);
  }, [state]);

  const chartData = {
    labels: data[0].timelines.hourly.map((item) => item.time),
    datasets: [
      {
        label: state.display,
        data: data[0].timelines.hourly.map(
          (item) => item.values[state.display]
        ),
        fill: true,
        borderColor: "rgb(109, 192, 213)",
        pointRadius: 25,
        pointStyle: false,
        segment: {
          backgroundColor: (ctx) => {
            const date = moment(chartData.labels[ctx.p0DataIndex]);

            switch (date.format("dddd")) {
              case "Monday":
              case "Thursday":
                return "rgba(67, 124, 144, 0.3)";
              case "Tuesday":
              case "Friday":
                return "rgba(0, 204, 102, 0.3)";
              case "Wednesday":
              case "Saturday":
                return "rgba(247, 197, 72, 0.4)";
              case "Sunday":
                return "rgba(247, 92, 3, 0.3)";
              default:
                return "rgba(0, 0, 255, 0.3)";
            }
          },
        },
      },
    ],
  };
  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { top, left, width, height },
      } = chart;
      if (options.shouldDisplayText) {
        ctx.save();
        ctx.font = "bold 50px sans-serif";
        ctx.fillStyle = "grey";
        ctx.textAlign = "center";
        ctx.fillText(backgroundChartText(), width / 2 + left, height / 2 + top);
        ctx.restore();
      }
    },
  };
  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItem) {
            let formatedLabel = moment(tooltipItem[0].label);
            return (
              `${formatedLabel.format("dddd")}` +
              " " +
              `${formatedLabel.format("HH:mm")}`
            );
          },
          label: function (tooltipItem) {
            let value = tooltipItem.parsed.y;
            const displayType = state.display;
            const formatterFn = formatters[displayType];
            return `${formatterFn(value)}`;
          },
        },
      },
      title: {
        display: true,
        text: "Weather in the coming 5-days",
      },
      legend: {
        display: false,
      },
      datalabels: {
        color: "#36A2EB",
        anchor: "end",
        align: "top",
        // offset: 20,
        formatter: function (value, item) {
          const displayType = state.display;
          const formatterFn = formatters[displayType];
          return item.dataIndex % 5 === 0 ? formatterFn(value) : "";
        },
      },
      textCenter: {
        shouldDisplayText: true,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: false,
          text: "",
        },
        ticks: {
          font: {
            size: 15,
          },
        },
      },
      x: {
        title: {
          display: false,
          text: "Time",
        },
        ticks: {
          autoSkip: false,
          callback: function (val, index) {
            const date = moment(this.getLabelForValue(val));
            if (date.format("HH:mm") === "00:00") {
              return date.format("dddd");
            }
            if (date.format("HH:mm") === "12:00") {
              return date.format("HH:mm");
            }
          },
          color: "black",
          maxRotation: 30,
          font: {
            size: 15,
          },
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  const formatters = {
    temperature: (value) => `${value}°C`,
    humidity: (value) => `${value} %`,
    windSpeed: (value) => `${value} km/h`,
    pressureSurfaceLevel: (value) => `${value} hPa`,
    cloudCover: (value) => `${value} %`,
  };

  function backgroundChartText() {
    switch (state.display) {
      case "temperature":
        return "Temperature";
      case "humidity":
        return "Humidity";
      case "pressureSurfaceLevel":
        return "Pressure Level";
      case "cloudCover":
        return "Clouds";
      default:
        return "Wind Speed";
    }
  }

  const ButtonGroup = ({ dispatch }) => (
    <div className="button-container">
      <div
        onClick={() => dispatch({ type: "temperature" })}
        className={`temperature-minutely one-button-container ${
          state.display === "temperature" ? "active" : "deactive"
        }`}
      >
        <WiThermometer />
      </div>
      <div
        onClick={() => dispatch({ type: "humidity" })}
        className={`humidity-minutely one-button-container ${
          state.display === "humidity" ? "active" : "deactive"
        }`}
      >
        <WiHumidity />
      </div>
      <div
        onClick={() => dispatch({ type: "pressure" })}
        className={`pressure-minutely one-button-container ${
          state.display === "pressureSurfaceLevel" ? "active" : "deactive"
        }`}
      >
        <WiBarometer />
      </div>
      <div
        onClick={() => dispatch({ type: "windSpeed" })}
        className={`windSpeed-minutely one-button-container ${
          state.display === "windSpeed" ? "active" : "deactive"
        }`}
      >
        <WiStrongWind />
      </div>
      <div
        onClick={() => dispatch({ type: "cloudCover" })}
        className={`cloudCover-minutely one-button-container ${
          state.display === "cloudCover" ? "active" : "deactive"
        }`}
      >
        <WiCloud />
      </div>
    </div>
  );

  return (
    <div className="chart-container">
      <Line data={chartData} options={chartOptions} />
      <ButtonGroup dispatch={dispatch} />
    </div>
  );
}
