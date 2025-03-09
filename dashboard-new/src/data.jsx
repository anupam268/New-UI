const data = {
  metrics: {
    AnomalyServers: { percentage: 12, description: "+3% vs last week" },
    memoryUsage: { percentage: 68, description: "Avg of 80 servers" },
    cpuUtilization: { percentage: 75, description: "Avg of 80 servers" },
    storageUsage: { percentage: 80, description: "Avg of 80 servers" },
    availability: { percentage: 99, description: "Avg of 80 servers" },
  },

  anomalySplit: [
    { category: "Monitoring", value: 38 },
    { category: "Logging", value: 35 },
    { category: "Combined", value: 25 },
  ],
  serviceStatus: [
    { name: "Service 1", status: "Good" },
    { name: "Service 2", status: "Warning" },
    { name: "Service 3", status: "Critical" },
    { name: "Service 4", status: "Good" },
    { name: "Service 5", status: "Warning" },
    { name: "Service 6", status: "Critical" },
    { name: "Service 7", status: "Good" },
  ],
  autosysStatus: {
    successRate: "92",
    failureRate: "8",
    failedServers: ["Server XYZ", "Server ABC", "Server 123", "Server DEF"],
  },
  anomalyDetails: [
    { time: 0.08, monitoring: 5, logging: 1, combined: 0 },
    { time: 0.16, monitoring: 8, logging: 2, combined: 1 },
    { time: 0.25, monitoring: 12, logging: 3, combined: 1 },
    { time: 0.33, monitoring: 15, logging: 4, combined: 2 },
    { time: 0.41, monitoring: 20, logging: 5, combined: 3 },
    { time: 0.50, monitoring: 25, logging: 6, combined: 4 },
    { time: 0.58, monitoring: 30, logging: 8, combined: 5 },
    { time: 0.66, monitoring: 35, logging: 9, combined: 6 },
    { time: 0.75, monitoring: 40, logging: 10, combined: 7 },
    { time: 0.83, monitoring: 45, logging: 12, combined: 8 },
    { time: 0.91, monitoring: 50, logging: 13, combined: 9 },
    { time: 1.00, monitoring: 55, logging: 14, combined: 10 },
    { time: 2, monitoring: 60, logging: 15, combined: 11 },
    { time: 3, monitoring: 62, logging: 16, combined: 12 },
    { time: 4, monitoring: 65, logging: 18, combined: 13 },
    { time: 5, monitoring: 70, logging: 20, combined: 14 },
    { time: 6, monitoring: 72, logging: 22, combined: 15 },
    { time: 12, monitoring: 80, logging: 25, combined: 18 },
    { time: 18, monitoring: 85, logging: 28, combined: 20 },
    { time: 24, monitoring: 90, logging: 30, combined: 22 },
    { time: 30, monitoring: 95, logging: 32, combined: 24 },
    { time: 36, monitoring: 100, logging: 34, combined: 26 },
    { time: 42, monitoring: 105, logging: 35, combined: 28 },
    { time: 48, monitoring: 110, logging: 38, combined: 30 },
  ],
  trendingKeywords: [
    { keyword: "Cluster 1", frequency: 40, category: "clusterA" },
    { keyword: "Cluster 2", frequency: 50, category: "clusterB" },
    { keyword: "Cluster 3", frequency: 30, category: "clusterA" },
    { keyword: "Cluster 4", frequency: 70, category: "clusterC" },
    { keyword: "Cluster 5", frequency: 20, category: "clusterA" },
    { keyword: "Cluster 6", frequency: 80, category: "clusterB" },
    { keyword: "Cluster 7", frequency: 25, category: "clusterC" },
    { keyword: "Cluster 8", frequency: 60, category: "clusterB" },
    { keyword: "Cluster 9", frequency: 45, category: "clusterC" },
    { keyword: "Cluster 10", frequency: 55, category: "clusterA" },
  ],
};

export default data;
