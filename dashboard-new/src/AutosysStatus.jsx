import React, { useState, useEffect } from "react";
import { Box, Typography, Chip } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import data from "./data";

Chart.register(ArcElement, Tooltip, Legend);

const AutosysStatus = () => {
  const [animatedSuccess, setAnimatedSuccess] = useState(0);
  const [animatedFailure, setAnimatedFailure] = useState(0);

  useEffect(() => {
    let successTarget = parseInt(data.autosysStatus.successRate);
    let failureTarget = parseInt(data.autosysStatus.failureRate);
    let interval = setInterval(() => {
      setAnimatedSuccess((prev) => (prev < successTarget ? prev + 1 : successTarget));
      setAnimatedFailure((prev) => (prev < failureTarget ? prev + 1 : failureTarget));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: ["Success", "Failure"],
    datasets: [{
      data: [animatedSuccess, animatedFailure],
      backgroundColor: ["#28a745", "#dc3545"],
      cutout: "60%",
    }],
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p:2 }}>
      <Typography variant="h6" gutterBottom>Autosys Status</Typography>
      <Box sx={{ width: 150, height: 150 }}>
        <Doughnut data={chartData} />
      </Box>
      <Typography variant="body1" sx={{ color: "#28a745", fontWeight: "bold" }}>✔ Success: {animatedSuccess}%</Typography>
      <Typography variant="body1" sx={{ color: "#dc3545", fontWeight: "bold" }}>✖ Failures: {animatedFailure}%</Typography>
      <Typography variant="subtitle2" sx={{ mt: 1 }}>🚨 Failed Servers:</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1, maxHeight: 100, overflowY: "auto" }}>
        {data.autosysStatus.failedServers.map((server, index) => (
          <Chip key={index} label={server} sx={{ bgcolor: "#dc3545", color: "#fff", fontWeight: "bold" }} />
        ))}
      </Box>
    </Box>
  );
};

export default AutosysStatus;
