const data = {
    metrics: {
        AnomalyServers: { percentage: 12, description: "+3% vs last week" },
        memoryUsage: { percentage: 68, description: "Avg of 80 servers" },
        cpuUtilization: { percentage: 75, description: "Avg of 80 servers" },
        storageUsage: { percentage: 80, description: "Avg of 80 servers" },
        availability: { percentage: 99, description: "Avg of 80 servers" },
      },
      
    anomalySplit: [
      { category: "Monitoring", value: 30 },
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
      successRate: "92%",
      failureRate: "8%",
      failedServers: ["Server XYZ", "Server ABC", "Server 123", "Server DEF"],
    },
    anomalyDetails: [
      { column1: "XYZ", column2: "ABC", column3: "DEF" },
      { column1: "LMN", column2: "OPQ", column3: "RST" },
      { column1: "UVW", column2: "JKL", column3: "EFG" },
    ],
  };
  
  export default data;
  