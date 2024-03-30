// BarGraph.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
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

const BarGraph = ({ data,type }) => {
  const randomColors = data.map(() => generateRandomColor());

  const chartData = {
    labels: data.map(entry => entry.year),
    datasets: [
      {
        label: 'Number of news per ' + type+' in Bar Graph',
        data: data.map(entry => entry.number),
        backgroundColor: randomColors,
        borderColor: randomColors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarGraph;
