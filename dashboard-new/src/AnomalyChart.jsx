import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import data from "./data";

Chart.register(ArcElement, Tooltip, Legend);

// Use the same colors as your anomaly trend chart:
const categoryColorMap = {
  Monitoring: "#1976d2", // medium blue
  Logging: "#8e24aa",    // vibrant purple
  Combined: "#00897b",   // rich teal
};

const dimOpacity = 0.2;

// Helper to convert hex to rgba string
function hexToRgba(hex, opacity) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((x) => x + x).join("");
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const AnomalyChart = () => {
  // Maintain multi-selection state via legend clicks
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Total anomalies for the center count: sum only those segments that are selected (or all if none selected)
  const totalAnomalies = data.anomalySplit.reduce((sum, item) => {
    if (selectedCategories.length === 0 || selectedCategories.includes(item.category))
      return sum + item.value;
    return sum;
  }, 0);

  // Animate the center count
  const [animatedCount, setAnimatedCount] = useState(0);
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.ceil(totalAnomalies / 50);
      if (count >= totalAnomalies) {
        setAnimatedCount(totalAnomalies);
        clearInterval(interval);
      } else {
        setAnimatedCount(count);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [totalAnomalies]);

  // Build chart data: always show all segments; if a category is not selected (and some are), dim it.
  const chartData = {
    labels: data.anomalySplit.map((item) => item.category),
    datasets: [
      {
        data: data.anomalySplit.map((item) => item.value),
        backgroundColor: data.anomalySplit.map((item) =>
          selectedCategories.length === 0 || selectedCategories.includes(item.category)
            ? categoryColorMap[item.category]
            : hexToRgba(categoryColorMap[item.category], dimOpacity)
        ),
        borderWidth: 2,
        borderColor: "#FFFFFF",
        cutout: "75%",
        hoverOffset: 10,
      },
    ],
  };

  // Chart options with custom legend onClick: toggles category selection.
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        onClick: (e, legendItem) => {
          const clickedCategory = legendItem.text;
          if (selectedCategories.includes(clickedCategory)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== clickedCategory));
          } else {
            setSelectedCategories([...selectedCategories, clickedCategory]);
          }
        },
        labels: {
          color: "#333",
          font: { size: 12 },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} anomalies`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box sx={{ textAlign: "center", p: 2, position: "relative" }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#222" }}>
        Anomaly Split
      </Typography>
      <Box sx={{ width: 220, height: 220, mx: "auto", position: "relative" }}>
        <Doughnut data={chartData} options={options} />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "29%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#222", lineHeight: "1" }}>
            {animatedCount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AnomalyChart;
