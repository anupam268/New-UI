import React from "react";
import {Typography, Box, } from "@mui/material";
import { Chart, ArcElement, Tooltip, Legend} from "chart.js";
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

export default AnomalyDetailsTable;