import React from "react";
import { Box, Typography, Chip, Tooltip, Stack } from "@mui/material";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip as ChartTooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

Chart.register(ArcElement, ChartTooltip, Legend, BarElement, CategoryScale, LinearScale);

const themeColors = {
    success: "#2E7D32",
    failure: "#D32F2F",
    background: "#f9f9f9",
};

const AutosysStatus = ({ data = {} }) => {
    const successRate = data?.successRate || "0%";
    const failureRate = data?.failureRate || "0%";
    const failedServers = data?.failedServers || [];

    const chartData = {
        labels: ["Success", "Failure"],
        datasets: [
            {
                data: [parseFloat(successRate) || 0, parseFloat(failureRate) || 0],
                backgroundColor: [themeColors.success, themeColors.failure],
                borderWidth: 0,
                cutout: "70%",
            },
        ],
    };

    //   const options = {
    //     plugins: {
    //       legend: { display: false },
    //       tooltip: { enabled: true },
    //     },
    //     responsive: true,
    //     maintainAspectRatio: false,
    //   };

    const options = {
        indexAxis: "y",
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.raw}%`; // ✅ Show percentage on hover
                    },
                },
            },
        },
        responsive: true,
        scales: {
            x: {
                ticks: {
                    callback: function (value) {
                        return `${value}%`; // ✅ Show percentage on x-axis
                    },
                },
                grid: { display: false }, // ✅ Hide grid lines for cleaner look
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", p: 1 }}>
            {/* ✅ Donut Chart with Legend Inline */}
            {/* <Box sx={{ position: "relative", width: 100, height: 100, mx: "auto", mb: 1 }}>
        <Doughnut data={chartData} options={options} />
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
          <Typography variant="caption" sx={{ fontWeight: "bold", color: themeColors.success }}>
            {successRate}
          </Typography>
        </Box>
      </Box> */}
            <Box sx={{ width: "100%", mx: "auto", maxHeight: "100px" }}>
                <Bar data={chartData} options={options} />
            </Box>

            {/* ✅ Success & Failure Stats Inline */}
            <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 1 }}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Box sx={{ width: 10, height: 10, bgcolor: themeColors.success, borderRadius: "50%" }} />
                    <Typography variant="caption" sx={{ fontWeight: "bold", color: themeColors.success }}>
                        {successRate} Success
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Box sx={{ width: 10, height: 10, bgcolor: themeColors.failure, borderRadius: "50%" }} />
                    <Typography variant="caption" sx={{ fontWeight: "bold", color: themeColors.failure }}>
                        {failureRate} Failures
                    </Typography>
                </Stack>
            </Stack>

            {/* ✅ Failed Server List */}
            {failedServers.length > 0 ? (
                <>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: themeColors.failure, mb: 0.5 }}>
                        🚨 Failed Servers:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, justifyContent: "center" }}>
                        {failedServers.map((server, index) => (
                            <Tooltip key={index} title={`Last Failure: Feb 23, 10:42 AM`} arrow>
                                <Chip
                                    label={server}
                                    sx={{
                                        bgcolor: themeColors.failure,
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: "0.75rem",
                                        height: 24, // ✅ Smaller chips
                                        px: 1.2,
                                        boxShadow: "0px 2px 4px rgba(0,0,0,0.15)",
                                        "&:hover": { bgcolor: "#B71C1C", transform: "scale(1.05)" },
                                        transition: "transform 0.2s ease-in-out",
                                    }}
                                />
                            </Tooltip>
                        ))}
                    </Box>
                </>
            ) : (
                <Typography variant="body2" sx={{ color: "#757575", mt: 1 }}>
                    ✅ No failed servers
                </Typography>
            )}
        </Box>
    );
};

export default AutosysStatus;
