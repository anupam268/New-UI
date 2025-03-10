import React, { useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import MetricsCards from "./MetricsCards";
import AnomalyChart from "./AnomalyChart";
import ServiceStatusChart from "./ServiceStatusChart";
import AnomalyTrendChart from "./AnomalyTrendChart";
import TrendingKeywords from "./TrendingKeywords";
import AnomalyDetailsTable from "./AnomalyDetailsTable";
import data from "./data";

const themeColors = {
  background: "#ffffff",
  cardBackground: "#F5F7FA",
  textPrimary: "#333333",
  success: "#28a745",
  warning: "#ffc107",
  danger: "#dc3545",
  primary: "#007bff",
};

const Dashboard = () => {
  // Lift the anomaly filter state so both charts and the table share it.
  const [selectedAnomalyCategories, setSelectedAnomalyCategories] = useState([]);

  return (
    <Container
      maxWidth="xl"
      sx={{ mt: 4, mb: 4, bgcolor: themeColors.background, minHeight: "100vh", p: 3 }}
    >
      <Grid container spacing={3}>
        {/* Metrics Cards */}
        <Grid item xs={12}>
          <MetricsCards />
        </Grid>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
            gridTemplateRows: { xs: "auto auto auto auto", md: "auto auto" },
            height: 700,
            gap: 2,
            padding: 2,
            marginLeft: 2,
          }}
        >
          {/* Anomaly Split Chart */}
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
            <AnomalyChart
              selectedCategories={selectedAnomalyCategories}
              onCategoryChange={setSelectedAnomalyCategories}
            />
          </Box>

          {/* Service Wise Status */}
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

          {/* Trending Keywords */}
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

          {/* Anomaly Trend Over Time */}
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
            <AnomalyTrendChart
              selectedCategories={selectedAnomalyCategories}
              onCategoryChange={setSelectedAnomalyCategories}
            />
          </Box>
        </Box>
      </Grid>

      {/* Anomaly Details Table filtered by the selected categories */}
      <Box sx={{ mt: 15 }}>
        <AnomalyDetailsTable filterCategories={selectedAnomalyCategories} />
      </Box>
    </Container>
  );
};

export default Dashboard;
