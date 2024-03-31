// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const LineChart = ({ data,type }) => {
  const randomColor = generateRandomColor();

  const chartData = {
    labels: data.map(entry => entry.year),
    datasets: [
      {
        label: 'Number of news per ' + type+' in Line Chart',
        data: data.map(entry => entry.number),
        fill: false,
        borderColor: randomColor,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: type,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
