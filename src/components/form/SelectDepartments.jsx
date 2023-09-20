/* eslint-disable react/prop-types */
import { Box, Button, TextField } from '@mui/material';
import LinkButton from '../ui/LinkButton';

const SelectDepartments = ({ children, onOpen }) => {
  return (
    <>
      <Box display="flex" gap={2} flexDirection={'column'}>
        {/* name */}
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Work Flow Title"
          multiline
        />
        {/* description */}
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Work Flow Description"
          multiline
          rows={6}
        />
        {children}
      </Box>
      <Box display="flex" justifyContent="end" gap={2} mt={2}>
        <LinkButton
          width="200px"
          innerText="Cancel"
          to="/workflows"
          variant="outlined"
          color="primary"
        />
        <Button onClick={onOpen} color="primary" variant="contained">
          Continue
        </Button>
      </Box>
    </>
  );
};

export default SelectDepartments;
