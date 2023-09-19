/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress } from '@mui/material';

const FormActionButtons = ({ loading, innerText, justifyContent, width }) => {
  return (
    <Box display="flex" justifyContent={justifyContent} gap={2} mt={2}>
      <Button sx={{ width }} type="reset" color="primary" variant="outlined">
        Cancel
      </Button>
      <Button
        sx={{ width }}
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
