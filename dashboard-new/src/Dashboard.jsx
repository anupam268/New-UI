import React from "react";
import { Container, Grid, Card, CardContent, Typography, Box, LinearProgress, Chip } from "@mui/material";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, registerables, plugins } from "chart.js";
import MetricsCards from "./MetricsCards";
import AnomalyChart from "./AnomalyChart";
import ServiceStatusChart from "./ServiceStatusChart";
import AutosysStatus from "./AutosysStatus";
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

// const MetricsCards = () => {
//     return (
//       <Grid container spacing={2} justifyContent="center">
//         {Object.entries(data.metrics).map(([key, { percentage, description }]) => (
//           <Grid item xs={12} sm={6} md={2.4} key={key}>
//             <Card
//               sx={{
//                 boxShadow: 3,
//                 bgcolor: themeColors.cardBackground,
//                 color: themeColors.textPrimary,
//                 p: 1.5,
//                 minHeight: "150px",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <CardContent sx={{ textAlign: "center" }}>
//                 <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                   {key.replace(/([A-Z])/g, " $1").toUpperCase()}
//                 </Typography>
//                 <Box sx={{ width: 120, height: 60, mx: "auto", position: "relative" }}>
//                   <Doughnut
//                     data={getGaugeChartData(percentage)}
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: false,
//                       cutoutPercentage: 80,
//                       plugins: {
//                         text: { displayText: `${percentage}%` },
//                       },
//                     }}
//                     plugins={[textCenterPlugin]}
//                   />
//                 </Box>
//                 <Typography variant="h7" sx={{ mt: 1 }}>{description}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     );
//   };

// 📌 Pie Chart for Anomaly Split
// const AnomalyChart = () => {
//   const chartData = {
//     labels: data.anomalySplit.map(item => item.category),
//     datasets: [{
//       data: data.anomalySplit.map(item => item.value),
//       backgroundColor: [themeColors.danger, themeColors.primary, themeColors.success],
//     }],
//   };

//   return <Pie data={chartData} />;
// };

// 📌 Service Status with Styled Cards
// const ServiceStatusChart = () => {
//   return (
//     <Box>
//       {data.serviceStatus.map((service, index) => (
//         <Box
//           key={index}
//           sx={{
//             bgcolor: service.status === "Good" ? themeColors.success
//               : service.status === "Warning" ? themeColors.warning
//               : themeColors.danger,
//             p: 1, m: 0.5, textAlign: "center", color: "#fff", fontWeight: "bold", borderRadius: 1,
//           }}
//         >
//           {service.name}
//         </Box>
//       ))}
//     </Box>
//   );
// };

// 📌 Autosys Status with Styled Badges
// const AutosysStatus = () => {
//   return (
//     <Box>
//       <Typography variant="body1" sx={{ color: themeColors.success, fontWeight: "bold" }}>✔ Success: {data.autosysStatus.successRate}</Typography>
//       <Typography variant="body1" sx={{ color: themeColors.danger, fontWeight: "bold" }}>✖ Failures: {data.autosysStatus.failureRate}</Typography>
//       <Typography variant="subtitle2" sx={{ mt: 1 }}>🚨 Failed Servers:</Typography>
//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
//         {data.autosysStatus.failedServers.map((server, index) => (
//           <Chip key={index} label={server} sx={{ bgcolor: themeColors.danger, color: "#fff", fontWeight: "bold" }} />
//         ))}
//       </Box>
//     </Box>
//   );
// };

// 📌 Styled Anomaly Details Table
const AnomalyDetailsTable = () => {
    return (
        <Box sx={{ overflowX: "auto", borderRadius: 2, boxShadow: 2, bgcolor: themeColors.cardBackground, color: themeColors.textPrimary }}>
            <Typography variant="h6" gutterBottom sx={{ p: 2, bgcolor: themeColors.primary, color: "white", borderRadius: "8px 8px 0 0" }}>
                Anomaly Details
            </Typography>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
                <thead>
                    <tr>
                        {Object.keys(data.anomalyDetails[0]).map((col, index) => (
                            <th key={index} style={{ padding: "10px", backgroundColor: themeColors.primary, color: "white", border: "1px solid #ddd" }}>
                                {col.toUpperCase()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.anomalyDetails.map((row, rowIndex) => (
                        <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 ? "#f1f1f1" : "#ffffff", transition: "0.3s", cursor: "pointer" }}>
                            {Object.values(row).map((value, colIndex) => (
                                <td key={colIndex} style={{ padding: "16px", border: "1px solid #ddd", textAlign: "center", fontSize: "14px" }}>
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
};

const cardStyle = {
    boxShadow: 3,
    bgcolor: themeColors.cardBackground,
    minHeight: "25vh", // ✅ Ensures all cards have the same height
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
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
