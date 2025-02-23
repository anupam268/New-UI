import React from "react";
import { Container, Grid, Card, CardContent, Typography, Box, LinearProgress, Chip } from "@mui/material";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, registerables, plugins } from "chart.js";
import data from "./data";

Chart.register(ArcElement, Tooltip, Legend);

// 📌 White Theme Colors
const themeColors = {
  background: "#ffffff",
  cardBackground: "#f9f9f9",
  textPrimary: "#333333",
  success: "#28a745",
  warning: "#ffc107",
  danger: "#dc3545",
  primary: "#007bff",
};

// 📌 Custom Plugin to Display Percentage Inside Gauge Chart
const textCenterPlugin = {
  id: "textCenter",
  beforeDraw: (chart) => {
    const { width, height } = chart;
    const { ctx } = chart;
    const text = chart.config.options.plugins.text.displayText; // Get percentage text
    const fontSize = Math.round(height / 4); // Dynamic font size
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = "#333"; // Dark text
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 1.5); // Adjusted positioning
  },
};

// 📌 Function to Generate Gauge Chart Data
const getGaugeChartData = (value) => ({
  datasets: [
    {
      data: [value, 100 - value],
      backgroundColor: [themeColors.primary, "#e0e0e0"],
      borderWidth: 0,
      cutout: "80%",
      rotation: -90,
      circumference: 180,
    },
  ],
});

const MetricsCards = () => {
    return (
      <Grid container spacing={2} justifyContent="center">
        {Object.entries(data.metrics).map(([key, { percentage, description }]) => (
          <Grid item xs={12} sm={6} md={2.4} key={key}>
            <Card
              sx={{
                boxShadow: 3,
                bgcolor: themeColors.cardBackground,
                color: themeColors.textPrimary,
                p: 1.5,
                minHeight: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                </Typography>
                <Box sx={{ width: 120, height: 60, mx: "auto", position: "relative" }}>
                  <Doughnut
                    data={getGaugeChartData(percentage)}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      cutoutPercentage: 80,
                      plugins: {
                        text: { displayText: `${percentage}%` },
                      },
                    }}
                    plugins={[textCenterPlugin]}
                  />
                </Box>
                <Typography variant="h7" sx={{ mt: 1 }}>{description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  export default MetricsCards;