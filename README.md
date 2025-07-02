# Weather Forecast Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A simple React project built for learning purposes. I created this project as one of my earliest exercises. Lately, I’ve only made minor improvements, preserving the original logic—despite recognizing numerous opportunities for enhancement, I left it in its initial form. The **Weather Forecast Application** displays current conditions, a five-day forecast, and interactive charts powered by [Tomorrow.io](https://www.tomorrow.io/).

## Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [API Key](#api-key)
5. [Key Components](#key-components)
6. [License](#license)

## Introduction

The Weather Forecast Application is a front-end demo created as a portfolio piece. It lets users search for a city, fetch the latest weather data, and visualize it with charts.

## Tech Stack

| Purpose   | Libraries / Tools                                    |
| --------- | ---------------------------------------------------- |
| Framework | React 18 (Create React App)                          |
| Charts    | Chart.js, react-chartjs-2, chartjs-plugin-datalabels |
| Icons     | react-icons                                          |
| Styling   | Plain CSS                                            |
| Testing   | Jest, React Testing Library                          |

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file in the project root and add your API key (see [API Key](#api-key)).
4. Start the development server:

   ```bash
   npm start
   ```

## API Key

The app uses the Tomorrow\.io REST API. To configure:

1. Sign up at [Tomorrow.io](https://www.tomorrow.io/) and obtain an API key.
2. In the project root, create a `.env` file with:

   ```bash
   REACT_APP_API_KEY=your_api_key_here
   ```
3. Create React App automatically loads variables starting with `REACT_APP_` during development.

## Key Components

* **Search Bar**: Enter a city name and press **Enter** to fetch the forecast.
* **Current Weather Card**: Displays temperature, wind, humidity, and more.
* **Forecast Cards**: Show daily averages for upcoming days.
* **Minutely & Hourly Charts**: Interactive line charts with toggle buttons.
* **Animated Background**: Subtle waves generated with pure CSS.
* **Footer**: Link to the author’s GitHub profile.

## License

This project is released under the [MIT License](./LICENSE).
