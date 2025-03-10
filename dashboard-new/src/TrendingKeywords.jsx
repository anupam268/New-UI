import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import data from "./data";

function interpolateColor(startColor, endColor, t) {
  // startColor & endColor as [r, g, b] arrays
  const r = Math.round(startColor[0] + t * (endColor[0] - startColor[0]));
  const g = Math.round(startColor[1] + t * (endColor[1] - startColor[1]));
  const b = Math.round(startColor[2] + t * (endColor[2] - startColor[2]));
  return `rgb(${r}, ${g}, ${b})`;
}

const TrendingKeywords = () => {
  const keywords = data.trendingKeywords || [];
  const maxFrequency = Math.max(...keywords.map((k) => k.frequency), 1);

  // Sort or index the keywords in some consistent way
  // so we can assign them positions 0..(n-1).
  // For simplicity, assume they come in the order we want.
  const n = keywords.length;

  // Define your start and end colors in [r, g, b]
  const startColor = [100, 150, 255]; // a light blue
  const endColor   = [0, 66, 140];    // a deeper blue

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2, color: "#222" }}>
        TRENDING KEYWORDS
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
        {keywords.map((item, index) => {
          const freqRatio = item.frequency / maxFrequency;
          const size = 65 + freqRatio * 55;

          // Interpolate color from startColor to endColor
          // t is fraction of how far along we are in the list
          const t = n > 1 ? index / (n - 1) : 0; 
          const circleColor = interpolateColor(startColor, endColor, t);

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
                  backgroundColor: circleColor,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                  },
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
