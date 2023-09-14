/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress } from '@mui/material';

const FormActionButtons = ({ loading, innerText }) => {
  return (
    <Box display="flex" justifyContent="center" gap={2} mt={2}>
      <Button
        sx={{ width: '400px' }}
        type="reset"
        color="primary"
        variant="outlined"
      >
        Cancel
      </Button>
      <Button
        sx={{ width: '400px' }}
        type="submit"
        color="primary"
        variant="contained"
        disabled={loading ? true : false}
      >
        {loading ? <CircularProgress size="20px" /> : innerText}
      </Button>
    </Box>
  );
};

export default FormActionButtons;
