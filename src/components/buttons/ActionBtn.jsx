import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ActionBtn = ({ id, isDisabled, isUser }) => {
  const navigate = useNavigate()

  const handleView = () => {
    navigate(`${id}`)
  }

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button variant="contained" color="primary" onClick={() => handleView()}>
        View
      </Button>
    </Box>
  );
};

export default ActionBtn;