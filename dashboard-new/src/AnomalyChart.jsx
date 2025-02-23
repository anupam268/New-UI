import React from "react";
import { Box, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import data from "./data";

Chart.register(ArcElement, Tooltip, Legend);

const AnomalyChart = () => {
  const chartData = {
    labels: data.anomalySplit.map(item => item.category),
    datasets: [{
      data: data.anomalySplit.map(item => item.value),
      backgroundColor: ["#ff4500", "#007bff", "#28a745"],
      hoverOffset: 10,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { font: { size: 14 } },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            let value = tooltipItem.raw;
            let total = data.anomalySplit.reduce((sum, item) => sum + item.value, 0);
            let percentage = ((value / total) * 100).toFixed(1);
            return `${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h6" gutterBottom>Anomaly Split</Typography>
      <Box sx={{ width: 200, height: 200 }}>
        <Pie data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default AnomalyChart;
