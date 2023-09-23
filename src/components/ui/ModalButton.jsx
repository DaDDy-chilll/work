/* eslint-disable react/prop-types */
import { Box, Button } from '@mui/material';

const ModalButton = ({ onOpen, innerText, icon, color, width, mb }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'right', mb }}>
      <Button
        sx={{ width }}
        className="no-underline"
        variant="contained"
        color={color}
        onClick={onOpen}
      >
        {innerText} {icon}
      </Button>
    </Box>
  );
};

export default ModalButton;
