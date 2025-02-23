import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";
import data from "./data";
import SortIcon from "@mui/icons-material/Sort";
import RestartAltIcon from "@mui/icons-material/RestartAlt"; // ✅ Reset Icon
import BarChartIcon from "@mui/icons-material/BarChart";

Chart.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const ServiceStatusChart = () => {
  const [view, setView] = useState("badges");
  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem("serviceSortOrder") || "asc"; // ✅ Retrieve sorting preference
  });

  const statusColors = {
    Good: "#388E3C",
    Warning: "#FFA000",
    Critical: "#D32F2F",
  };

  // ✅ Sort services based on user selection
  const sortedServices = [...data.serviceStatus].sort((a, b) => {
    const order = { Good: 1, Warning: 2, Critical: 3 };
    return sortOrder === "asc" ? order[a.status] - order[b.status] : order[b.status] - order[a.status];
  });

  const statusCounts = {
    Good: sortedServices.filter(item => item.status === "Good").length,
    Warning: sortedServices.filter(item => item.status === "Warning").length,
    Critical: sortedServices.filter(item => item.status === "Critical").length,
  };

  const chartData = {
    labels: sortedServices.map(service => service.name), // ✅ Apply sorting to chart labels
    datasets: [{
      label: "Number of Services",
      data: sortedServices.map(service => statusCounts[service.status]), // ✅ Ensure values match the order
      backgroundColor: sortedServices.map(service => statusColors[service.status]), // ✅ Apply correct colors
      borderRadius: 5,
    }],
  };

  const options = {
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} services`;
          },
        },
      },
    },
    responsive: true,
  };

  // ✅ Function to toggle sorting order and save it in local storage
  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    localStorage.setItem("serviceSortOrder", newSortOrder); // ✅ Save sorting preference
  };

  // ✅ Function to reset sorting order to default (Ascending)
  const resetSortOrder = () => {
    setSortOrder("asc");
    localStorage.removeItem("serviceSortOrder"); // ✅ Clear local storage
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p:1 }}>
      <Typography variant="h6" gutterBottom>Service Wise Status</Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button 
          variant="contained"
          size="small"
          onClick={() => setView(view === "badges" ? "chart" : "badges")}
          startIcon={<BarChartIcon />}
        >
          {view === "badges" ? "Chart View" : "Badge View"}
        </Button>

        <Button 
          variant="outlined"
          size="small"
          onClick={toggleSortOrder} // ✅ Toggle Sorting Order
          startIcon={<SortIcon />}
        >
          {sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
        </Button>

        <Button 
          variant="outlined"
          size="small"
          onClick={resetSortOrder} // ✅ Reset Sorting
          startIcon={<RestartAltIcon />}
        >
          Reset Sorting
        </Button>
      </Box>

      {view === "badges" ? (
        <Grid container spacing={1} justifyContent="center">
          {sortedServices.map((service, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}> {/* ✅ Multiple services per row */}
              <Box
                sx={{
                  background: statusColors[service.status],
                  color: "#FFFFFF",
                  padding: "6px 12px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  textAlign: "center",
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 5px 8px rgba(0,0,0,0.2)",
                  },
                }}
              >
                {service.name}
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Bar data={chartData} options={options} />
        </Box>
      )}
    </Box>
  );
};

export default ServiceStatusChart;
