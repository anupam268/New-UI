import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import data from "./data";

Chart.register(ArcElement, Tooltip, Legend);

const themeColors = {
  monitoring: "#b9d2fa",  // ✅ Dark Green
  logging: "#476596",  // ✅ Orange
  combined: "#053582",  // ✅ Deep Blue
};

const AnomalyChart = () => {
  const totalAnomalies = data.anomalySplit.reduce((sum, item) => sum + item.value, 0);

  // ✅ Animate Count-Up Effect
  const [animatedCount, setAnimatedCount] = useState(0);
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.ceil(totalAnomalies / 50); // Smooth counting
      if (count >= totalAnomalies) {
        setAnimatedCount(totalAnomalies);
        clearInterval(interval);
      } else {
        setAnimatedCount(count);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [totalAnomalies]);

  const chartData = {
    labels: data.anomalySplit.map((item) => item.category),
    datasets: [
      {
        data: data.anomalySplit.map((item) => item.value),
        backgroundColor: [
          themeColors.monitoring,
          themeColors.logging,
          themeColors.combined,
        ],
        borderWidth: 2,
        borderColor: "#FFFFFF", // ✅ White border for separation
        cutout: "75%", // ✅ Creates the hollow center
        hoverOffset: 10, // ✅ Enlarges section when hovered
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right", // ✅ Legend aligned as per the reference image
        labels: {
          boxWidth: 10,
          padding: 15,
          color: "#333",
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} anomalies`; // ✅ Show number of anomalies
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box sx={{ textAlign: "center", p: 2, position: "relative" }}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold", color: "#222" }}>
        ANOMALY SPLIT
      </Typography>

      <Box sx={{ width: 220, height: 220, mx: "auto", position: "relative" }}>
        <Doughnut data={chartData} options={options} />

        {/* ✅ Centered Text Showing Total Anomalies */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "29%",
            transform: "translate(-50%, -50%)", // ✅ Centers precisely
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "80px", // ✅ Ensures the text doesn't stretch
            height: "80px",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#222", lineHeight: "1" }}>
            {animatedCount}
          </Typography>
          {/* <Typography variant="caption" sx={{ fontSize: "11px", color: "#666" }}>
            Total Anomalies
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
};

export default AnomalyChart;
