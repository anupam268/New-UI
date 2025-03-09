import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import data from "./data";

const TrendingKeywords = () => {
  const keywords = data.trendingKeywords || [];
  // Determine the highest frequency for scaling
  const maxFrequency = keywords.length > 0 ? Math.max(...keywords.map((k) => k.frequency)) : 1;

  // Define a color mapping based on category
  const categoryColors = {
    clusterA: "#007bff",
    clusterB: "#007bff",
    clusterC: "#007bff",
    clusterD: "#007bff",
  };

  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2, color: "#222"  }}>
        TRENDING KEYWORDS
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2 }}>
        {keywords.map((item, index) => {
          // Dynamically calculate circle size based on frequency
          const size = 50 + (item.frequency / maxFrequency) * 50; // min: 50px, max: ~100px
          
          return (
            <Tooltip
              key={index}
              title={
                <>
                  <Typography variant="subtitle2" color="inherit">
                    {item.keyword}
                  </Typography>
                  <Typography variant="caption" color="inherit">
                    Frequency: {item.frequency}
                    <br />
                    Category: {item.category}
                  </Typography>
                </>
              }
              arrow
            >
              <Box
                sx={{
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  backgroundColor: categoryColors[item.category] || "#ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  console.log(`Keyword clicked: ${item.keyword}`);
                }}
              >
                {item.keyword}
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};

export default TrendingKeywords;
