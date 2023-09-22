/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress } from '@mui/material';

const SelectUsers = ({ loading, onClose, children }) => {
  return (
    <Box>
      {children}
      <Box display="flex" justifyContent="end" gap="10px" mt="40px">
        <Button
          sx={{ width: '200px' }}
          type="button"
          color="primary"
          variant="outlined"
          onClick={onClose}
        >
          Back
        </Button>
        <Button
          sx={{ width: '200px' }}
          type="submit"
          color="primary"
          variant="contained"
          disabled={loading ? true : false}
        >
          {loading ? <CircularProgress size="20px" /> : 'Create'}
        </Button>
      </Box>
    </Box>
  );
};

export default SelectUsers;
