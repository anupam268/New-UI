import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Box, Modal, Chip } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import data from "./data";

Chart.register(ArcElement, Tooltip, Legend);

const themeColors = {
  background: "#ffffff",
  cardBackground: "#f9f9f9",
  textPrimary: "#333333",
  success: "#28a745",
  warning: "#ffc107",
  danger: "#dc3545",
  primary: "#007bff",
};

// ✅ Custom Plugin for Percentage Display Inside Doughnut Chart
const textCenterPlugin = {
  id: "textCenter",
  beforeDraw: (chart) => {
    const { ctx, width, height } = chart;
    const text = chart.config.options.plugins.text.displayText;
    ctx.font = `${Math.round(height / 5)}px Arial`;
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 1.6);
  },
};

// ✅ Function to Generate Gauge Chart Data
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
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        {/* ✅ Keeping all six cards in the same row */}
        {Object.entries(data.metrics).map(([key, { percentage, description }], index) => (
          <Grid item xs={12} sm={6} md={2} key={key}> {/* ✅ Fixing responsive layout */}
            <Card
              sx={{
                boxShadow: 3,
                bgcolor: themeColors.cardBackground,
                color: themeColors.textPrimary,
                p: 1.5,
                minHeight: "190px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                </Typography>
                <Box sx={{ width: 80, height: 80, mx: "auto", position: "relative" }}>
                {index === 0 ? ( // ✅ First card (Anomaly Servers) shows a number instead of percentage
                  <Typography variant="h3" sx={{ fontWeight: "bold", color: themeColors.primary }}>
                    {percentage}
                  </Typography>
                ) : (
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
                  />)}
                </Box>
                <Typography variant="h7" sx={{ mt: 1 }}>{description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* ✅ FIXED Autosys Status as a Metrics Card */}
        <Grid item xs={12} sm={6} md={2}> 
          <Card
            sx={{
              boxShadow: 3,
              bgcolor: themeColors.cardBackground,
              color: themeColors.textPrimary,
              p: 1.5,
              minHeight: "190px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              },
            }}
            onClick={() => setModalOpen(true)}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                AUTOSYS STATUS
              </Typography>
              <Box sx={{ width: 80, height: 80, mx: "auto", position: "relative" }}>
                <Doughnut
                  data={getGaugeChartData(data.autosysStatus.successRate)}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutoutPercentage: 80,
                    plugins: {
                      text: { displayText: `${data.autosysStatus.successRate}%` },
                    },
                  }}
                  plugins={[textCenterPlugin]}
                />
              </Box>
              {/* <Typography variant="h7" sx={{ mt: 1 }}>
                {data.autosysStatus.successRate}% Success
              </Typography> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ✅ Modal for Failed Servers */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "white",
            p: 3,
            boxShadow: 24,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            🚨 Failed Servers
          </Typography>
          {data.autosysStatus.failedServers.length > 0 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
              {data.autosysStatus.failedServers.map((server, index) => (
                <Chip
                  key={index}
                  label={server}
                  sx={{
                    bgcolor: themeColors.danger,
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                    height: 24,
                    px: 1.2,
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.15)",
                    "&:hover": { bgcolor: "#B71C1C", transform: "scale(1.05)" },
                    transition: "transform 0.2s ease-in-out",
                  }}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: "#757575", mt: 1 }}>
              ✅ No failed servers
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default MetricsCards;
