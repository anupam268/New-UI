import React, { useState } from "react";
import { Box, Typography, Modal, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale, Filler } from "chart.js";
import data from "./data";

Chart.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale, Filler);

const themeColors = {
  monitoring: "#b9d2fa",
  logging: "#476596",
  combined: "#053582",
};

const getFilteredData = (view) => {
  return data.anomalyDetails.filter((item) => {
    if (view === "active") {
      return item.time <= 1 && item.time % (5 / 60) === 0; // ✅ Every 5 minutes for active alerts
    } else {
      return item.time > 1 && item.time % 1 === 0; // ✅ Every 1 hour for historical
    }
  });
};
console.log({getFilteredData})

const AnomalyTrendChart = () => {
  const [activeView, setActiveView] = useState("active"); // "active" or "historical"
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  

  // ✅ Filter Data Based on Selected View
  const filteredData = getFilteredData(activeView);

  const chartData = {
    labels: filteredData.map((item) => `${item.time}h`),
    datasets: [
      {
        label: "Monitoring",
        data: filteredData.map((item) => item.monitoring),
        borderColor: themeColors.monitoring,
        backgroundColor: `${themeColors.monitoring}66`,
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: "Logging",
        data: filteredData.map((item) => item.logging),
        borderColor: themeColors.logging,
        backgroundColor: `${themeColors.logging}66`,
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: "Combined",
        data: filteredData.map((item) => item.combined),
        borderColor: themeColors.combined,
        backgroundColor: `${themeColors.combined}66`,
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} anomalies`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const clickedTime = filteredData[index].time;
        setSelectedPoint(filteredData[index]);
        setModalOpen(true);
      }
    },
  };

  return (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Anomaly Trend Over Time
      </Typography>

      {/* ✅ Toggle Buttons for Active/Historical View */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center", gap: 1 }}>
        <button
          onClick={() => setActiveView("active")}
          style={{
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
            backgroundColor: activeView === "active" ? "#007bff" : "white",
            color: activeView === "active" ? "white" : "#007bff",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          ACTIVE (0-1 HRS)
        </button>
        <button
          onClick={() => setActiveView("historical")}
          style={{
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
            backgroundColor: activeView === "historical" ? "#007bff" : "white",
            color: activeView === "historical" ? "white" : "#007bff",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          HISTORICAL (1-48 HRS)
        </button>
      </Box>

      {/* ✅ Line Chart */}
      <Box sx={{ height: 300 }}>
        <Line data={chartData} options={options} />
      </Box>

      {/* ✅ Modal to Show Table When Clicking a Point */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            bgcolor: "white",
            p: 3,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Anomalies at {selectedPoint?.time} Hours
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Anomalies</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Monitoring</TableCell>
                <TableCell>{selectedPoint?.monitoring}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Logging</TableCell>
                <TableCell>{selectedPoint?.logging}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Combined</TableCell>
                <TableCell>{selectedPoint?.combined}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </Box>
  );
};

export default AnomalyTrendChart;
