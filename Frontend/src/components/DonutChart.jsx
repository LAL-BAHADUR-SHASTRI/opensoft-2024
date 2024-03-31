import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const DonutChart = ({ data,type }) => {
  const randomColors = data.map(() => generateRandomColor());

  const chartData = {
    labels: data.map(entry => entry.year),
    datasets: [
      {
        data: data.map(entry => entry.number),
        backgroundColor: randomColors,
        hoverBackgroundColor: randomColors,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: false,
    },
  };

  return (
     <div className="w-full h-dvh"> {/* Adjusted height to 96 for example, you can modify as needed */}
     <Doughnut data={chartData} options={chartOptions} />
   </div>
  );
};

export default DonutChart;
