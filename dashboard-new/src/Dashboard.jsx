import React from "react";
import { Container, Grid, Card, CardContent, Typography, Box, LinearProgress, Chip } from "@mui/material";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import MetricsCards from "./MetricsCards";
import AnomalyChart from "./AnomalyChart";
import ServiceStatusChart from "./ServiceStatusChart";
import AutosysStatus from "./AutosysStatus";
import AnomalyDetailsTable from "./AnomalyDetailsTable";
import AnomalyTrendChart from "./AnomalyTrendChart";
import TrendingKeywords from "./TrendingKeywords";
import data from "./data";

Chart.register(ArcElement, Tooltip, Legend);

// White Theme Colors
const themeColors = {
  background: "#ffffff",
  cardBackground: "#F5F7FA",
  textPrimary: "#333333",
  success: "#28a745",
  warning: "#ffc107",
  danger: "#dc3545",
  primary: "#007bff",
};

// Custom Plugin to Display Percentage Inside Gauge Chart
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

const cardStyle = {
  boxShadow: 3,
  bgcolor: themeColors.cardBackground,
  // minHeight: "35vh", // Ensures all cards have the same height if needed
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "stretch",
  height: "100%",
  p: 1,
};

// Dashboard Component
const Dashboard = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4, bgcolor: themeColors.background, minHeight: "100vh", p: 3 }}>
      <Grid container spacing={3}>

        {/* Metrics Cards */}
        <Grid item xs={12}>
          <MetricsCards />
        </Grid>

        <Box
          sx={{
            display: "grid",
            // 3 columns on medium+ screens, 1 column on small screens
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
            // 2 rows on medium+ screens; more rows on small screens
            gridTemplateRows: { xs: "auto auto auto auto", md: "auto auto" },
            height: 700,
            gap: 2,
            padding: 2,
            marginLeft: 2,
          }}
        >
          {/* R1C1: Anomaly Split */}
          <Box
            sx={{
              gridColumn: { xs: "1", md: "1" },
              gridRow: { xs: "1", md: "1" },
              p: 2,
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <AnomalyChart />
          </Box>

          {/* R1C2: Service Wise Status */}
          <Box
            sx={{
              gridColumn: { xs: "1", md: "2" },
              gridRow: { xs: "2", md: "1" },
              p: 2,
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <ServiceStatusChart />
          </Box>

          {/* R1C3 + R2C3: Trending Keywords (spanning two rows in col 3) */}
          <Box
            sx={{
              gridColumn: { xs: "1", md: "3" },
              gridRow: { xs: "3", md: "1 / span 2" },
              p: 2,
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: 2,
              height: "100%",
            }}
          >
            <TrendingKeywords />
          </Box>

          {/* R2C1 + R2C2: Anomaly Trend Over Time (spanning two columns in row 2) */}
          <Box
            sx={{
              gridColumn: { xs: "1", md: "1 / span 2" },
              gridRow: { xs: "4", md: "2" },
              p: 2,
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: 2,
              height: "100%",
            }}
          >
            <AnomalyTrendChart />
          </Box>
        </Box>

      </Grid>
    </Container>
  );
};

export default Dashboard;
