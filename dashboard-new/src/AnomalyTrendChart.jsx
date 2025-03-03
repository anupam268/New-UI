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

const AnomalyTrendChart = () => {
  const [activeView, setActiveView] = useState("active"); // ✅ Defined inside the component
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ✅ Fixing the Active Data Filter (0-1 Hrs)
  const activeData = data.anomalyDetails.filter((item) => item.time >= 0 && item.time <= 1);

  // ✅ Fixing the Historical Data Filter (1-48 Hrs)
  const historicalData = data.anomalyDetails.filter((item) => item.time > 1 && item.time <= 48);

  // ✅ Use `activeView` inside the component, not globally
  const filteredData = activeView === "active" ? activeData : historicalData;

  const chartData = {
    labels: filteredData.map((item) => `${item.time}h`), // ✅ Fix Labels
    datasets: [
      {
        label: "Monitoring",
        data: filteredData.map((item) => item.monitoring),
        backgroundColor: "rgba(185, 210, 250, 0.6)", // ✅ Light Blue
        borderColor: "#b9d2fa",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Logging",
        data: filteredData.map((item) => item.logging),
        backgroundColor: "rgba(71, 101, 150, 0.6)", // ✅ Dark Blue
        borderColor: "#476596",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Combined",
        data: filteredData.map((item) => item.combined),
        backgroundColor: "rgba(5, 53, 130, 0.6)", // ✅ Deep Blue
        borderColor: "#053582",
        borderWidth: 2,
        fill: true,
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
