import { Button, IconButton } from "@mui/material";
import React from "react";

// icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import { colors } from "../../utils/theme";

const ActionBtn = ({ id }) => {

  const navigate = useNavigate()

  const handleView = async () => {
    navigate(`${id}`)
  }

  return (    
    <Button variant="contained" color="primary" onClick={() => handleView()}>
      View
    </Button>
    // <IconButton onClick={() => handleView()} >
    //   <VisibilityIcon />
    // </IconButton>
  );
};

export default ActionBtn;