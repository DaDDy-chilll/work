/* eslint-disable react/prop-types */
import { Box, Button } from '@mui/material';

const ModalButton = ({ onOpen, innerText, icon, color }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2 }}>
      <Button
        sx={{ width: '200px' }}
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
