import React from "react";
import { Typography, Box } from "@mui/material";
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

const AnomalyDetailsTable = ({ filterCategories }) => {
  // Determine columns: always include "time". If filters exist, include only those (converted to lowercase)
  const columns =
    filterCategories && filterCategories.length > 0
      ? ["time", ...filterCategories.map(cat => cat.toLowerCase())]
      : Object.keys(data.anomalyDetails[0]);

  return (
    <Box sx={{ overflowX: "auto", borderRadius: 2, boxShadow: 2, bgcolor: themeColors.cardBackground, color: themeColors.textPrimary }}>
      <Typography variant="h6" gutterBottom sx={{ p: 2, bgcolor: themeColors.primary, color: "white", borderRadius: "8px 8px 0 0" }}>
        Anomaly Details
      </Typography>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={{ padding: "10px", backgroundColor: themeColors.primary, color: "white", border: "1px solid #ddd" }}>
                {col.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.anomalyDetails.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 ? "#f1f1f1" : "#ffffff", transition: "0.3s", cursor: "pointer" }}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} style={{ padding: "16px", border: "1px solid #ddd", textAlign: "center", fontSize: "14px" }}>
                  {row[col]}
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
