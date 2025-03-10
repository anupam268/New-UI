import React, { useState } from "react";
import { Box, Typography, Modal, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";
import data from "./data";

Chart.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

const AnomalyTrendChart = () => {
  const [activeView, setActiveView] = useState("active");
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]); // multiple selection allowed

  // Filter data for active vs. historical views
  const activeData = data.anomalyDetails.filter((item) => item.time >= 0 && item.time <= 1);
  const historicalData = data.anomalyDetails.filter((item) => item.time > 1 && item.time <= 48);
  const filteredData = activeView === "active" ? activeData : historicalData;

  // Determine opacity for each dataset based on selectedCategories.
  // If none are selected, all opacities are 1.
  const themeColors = {
    monitoring: { bg: "rgba(25, 118, 210, 1)", border: "#1976d2" },
    logging: { bg: "rgba(142, 36, 170, 1)", border: "#8e24aa" },
    combined: { bg: "rgba(0, 137, 123, 1)", border: "#00897b" },
  };
  
  const getOpacity = (label) =>
    selectedCategories.length === 0 || selectedCategories.includes(label) ? 1 : 0.2;
  
  const allDatasets = [
    {
      label: "Monitoring",
      data: filteredData.map((item) => item.monitoring),
      backgroundColor: `rgba(25, 118, 210, ${getOpacity("Monitoring")})`,
      borderColor: `rgba(25, 118, 210, ${getOpacity("Monitoring")})`,
      borderWidth: 2,
      fill: false,
      // Optionally, set a different line dash style:
      // borderDash: [],
    },
    {
      label: "Logging",
      data: filteredData.map((item) => item.logging),
      backgroundColor: `rgba(142, 36, 170, ${getOpacity("Logging")})`,
      borderColor: `rgba(142, 36, 170, ${getOpacity("Logging")})`,
      borderWidth: 2,
      fill: false,
      // Example: dashed line
      // borderDash: [5, 5],
    },
    {
      label: "Combined",
      data: filteredData.map((item) => item.combined),
      backgroundColor: `rgba(0, 137, 123, ${getOpacity("Combined")})`,
      borderColor: `rgba(0, 137, 123, ${getOpacity("Combined")})`,
      borderWidth: 2,
      fill: false,
      // Example: dotted line
      // borderDash: [2, 4],
    },
  ];
  
 

  const chartData = {
    labels: filteredData.map((item) => `${item.time}h`),
    datasets: allDatasets,
  };

  // Legend onClick: toggle category in the selectedCategories array
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        onClick: (e, legendItem) => {
          const clickedCategory = legendItem.text;
          // Toggle selection: if already selected, remove it; otherwise, add it.
          if (selectedCategories.includes(clickedCategory)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== clickedCategory));
          } else {
            setSelectedCategories([...selectedCategories, clickedCategory]);
          }
        },
      },
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

  // For the modal table, show only selected categories if any; otherwise, show all.
  const categoriesToShow =
    selectedCategories.length > 0
      ? selectedCategories
      : ["Monitoring", "Logging", "Combined"];

  return (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Anomaly Trend Over Time
      </Typography>
      {/* Toggle buttons for active/historical view */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center", gap: 1 }}>
        <button
          onClick={() => setActiveView("active")}
          style={{
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
            backgroundColor: activeView === "active" ? "#1976d2" : "white",
            color: activeView === "active" ? "white" : "#1976d2",
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
            backgroundColor: activeView === "historical" ? "#1976d2" : "white",
            color: activeView === "historical" ? "white" : "#1976d2",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          HISTORICAL (1-48 HRS)
        </button>
      </Box>
      <Box sx={{ height: 300 }}>
        <Line data={chartData} options={options} />
      </Box>
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
              {categoriesToShow.map((category) => (
                <TableRow key={category}>
                  <TableCell>{category}</TableCell>
                  <TableCell>
                    {selectedPoint ? selectedPoint[category.toLowerCase()] : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </Box>
  );
};

export default AnomalyTrendChart;
