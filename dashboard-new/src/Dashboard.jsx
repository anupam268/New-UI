import React from "react";
import { Container, Grid, Card, CardContent, Typography, Box, LinearProgress, Chip } from "@mui/material";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, registerables, plugins } from "chart.js";
import MetricsCards from "./MetricsCards";
import AnomalyChart from "./AnomalyChart";
import ServiceStatusChart from "./ServiceStatusChart";
import AutosysStatus from "./AutosysStatus";
import AnomalyDetailsTable from "./AnomalyDetailsTable";
import data from "./data";

Chart.register(ArcElement, Tooltip, Legend);

// 📌 White Theme Colors
const themeColors = {
    background: "#ffffff",
    cardBackground: "#F5F7FA",
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


const cardStyle = {
    boxShadow: 3,
    bgcolor: themeColors.cardBackground,
    // minHeight: "35vh", // ✅ Ensures all cards have the same height
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    height: "100%",
    p:1,
};

// 📌 Dashboard Component
const Dashboard = () => {
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, bgcolor: themeColors.background, minHeight: "100vh", p: 3 }}>
            <Grid container spacing={3}>

                {/* Metrics Cards */}
                <Grid item xs={12}>
                    <MetricsCards />
                </Grid>

                {/* Charts Section */}
                <Grid container spacing={3} alignItems="stretch" sx={{ p: 3 }}> {/* ✅ Ensure vertical alignment */}
                    {/* Anomaly Split */}
                    <Grid item xs={12} md={4}>
                        <Card sx={cardStyle}>
                            <AnomalyChart />
                        </Card>
                    </Grid>

                    {/* Service Wise Status */}
                    <Grid item xs={12} md={4}>
                        <Card sx={cardStyle}>
                            <ServiceStatusChart />
                        </Card>
                    </Grid>

                    {/* Autosys Status */}
                    <Grid item xs={12} md={4}>
                        <Card sx={cardStyle}>
                            <Typography variant="h6" gutterBottom>Autosys Status</Typography>
                            <AutosysStatus data={data.autosysStatus} />
                        </Card>
                    </Grid>
                </Grid>



                {/* Anomaly Details Table */}
                <Grid item xs={12}>
                    <AnomalyDetailsTable />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
