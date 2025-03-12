import { useReducer, useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ArrowDropDownSharp";
import { Edit as EditIcon, Save as SaveIcon } from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

// Reducer function to manage form state
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_IDENTIFIER":
      return { ...state, identifier: state.identifier || action.value };
    case "RESET_FORM":
      return action.payload;
    default:
      return state;
  }
};

// Function to generate a unique identifier
const generateIdentifier = () => {
  const now = new Date();
  const YY = String(now.getFullYear()).slice(-2);
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const DD = String(now.getDate()).padStart(2, "0");
  const HH = String(now.getHours()).padStart(2, "0");
  const MMMin = String(now.getMinutes()).padStart(2, "0");
  const SS = String(now.getSeconds()).padStart(2, "0");
  const MS = String(now.getMilliseconds()).padStart(3, "0");
  return `${YY}${MM}${DD}${HH}${MMMin}${SS}${MS}`;
};

const AddIncidentPage = () => {
  // Initialize form state using useReducer
  const [formData, dispatch] = useReducer(formReducer, {
    identifier: "", // Auto-generated identifier
    priority: "", // Priority dropdown (0-3)
    title: "", // Incident title
    impacted_xaas: "", // Impacted XaaS
    impacted_az: "", // Impacted AZ
    date_inc_started: null, // Start date with DateTime picker
    date_inc_resolved: null, // Resolved date with DateTime picker
    contact: "", // Contact information
    description: "", // Description of the incident
    root_cause: "", // Root cause of the incident
    solution: "", // Solution applied
    actions: "", // Actions taken
    teamInCharge: "", // Responsible team
    unityIncidents: "", // Related unity incidents
    date: "", // Date field
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Load saved form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("incidentForm");
    if (savedData) {
      dispatch({ type: "RESET_FORM", payload: JSON.parse(savedData) });
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("incidentForm", JSON.stringify(formData));
  }, [formData]);

  // Handle field changes
  const handleFieldChange = (field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
    setErrorMessage("");
  };

  // Validate form fields before saving
  const validateForm = () => {
    let newErrors = {};
    if (!formData.priority) newErrors.priority = "Priority is required!";
    if (!formData.title) newErrors.title = "Title is required!";
    if (!formData.date_inc_resolved) newErrors.date_inc_resolved = "Resolved date is required!";
    if (formData.date_inc_started && formData.date_inc_resolved && new Date(formData.date_inc_resolved) <= new Date(formData.date_inc_started)) {
      newErrors.date_inc_resolved = "Closed date must be later than open date!";
      setErrorMessage("Error: Closed date must be later than the open date.");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    // Function to push form data to an API
    const pushToAPI = async () => {
        try {
          const response = await fetch("https://your-api-endpoint.com/incidents", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const result = await response.json();
          console.log("API Response:", result);
          alert("Form data successfully submitted to the API!");
        } catch (error) {
          console.error("Error submitting form data:", error);
          alert("Failed to submit data to the API.");
        }
      };

  // Handle save button click
  const handleSaveClick = () => {
    if (!validateForm()) return;
    dispatch({ type: "SET_IDENTIFIER", value: generateIdentifier() });
    pushToAPI();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>Add Incident</Typography>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Incident Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {/* Priority Dropdown */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select name="priority" value={formData.priority} onChange={(e) => handleFieldChange("priority", e.target.value)}>
                    <MenuItem value={"0"}>0</MenuItem>
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Title Field */}
              <Grid item xs={12} md={6}>
                <TextField name="title" label="Title" value={formData.title} onChange={(e) => handleFieldChange("title", e.target.value)} fullWidth />
              </Grid>
              {/* Date Pickers */}
              <Grid item xs={12} md={6}>
                <MobileDateTimePicker label="Date Incident Started" value={formData.date_inc_started} onChange={(value) => handleFieldChange("date_inc_started", value)} renderInput={(params) => <TextField {...params} fullWidth />} />
              </Grid>
              <Grid item xs={12} md={6}>
                <MobileDateTimePicker label="Date Incident Closed" value={formData.date_inc_resolved} onChange={(value) => handleFieldChange("date_inc_resolved", value)} renderInput={(params) => <TextField {...params} fullWidth />} />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <TextField name="identifier" label="Identifier (Auto-generated)" value={formData.identifier} fullWidth disabled sx={{ mt: 2, backgroundColor: "#e0e0e0" }} />
        <Box sx={{ textAlign: "right", mt: 3 }}>
          <Button onClick={handleSaveClick} variant="contained" color="primary" startIcon={<SaveIcon />}>Save</Button>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default AddIncidentPage;