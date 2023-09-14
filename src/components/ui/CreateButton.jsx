/* eslint-disable react/prop-types */
import { AddOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material';

const CreateButton = ({ onOpen, innerText }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2 }}>
      <Button
        className="no-underline"
        variant="contained"
        color="primary"
        onClick={onOpen}
      >
        {innerText} <AddOutlined sx={{ ml: '5px' }} />
      </Button>
    </Box>
  );
};

export default CreateButton;
