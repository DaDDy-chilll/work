/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import LinkButton from '../ui/LinkButton';
import FormTextField from '../shared/FormTextField';
import ModalButton from '../ui/ModalButton';

const SelectDepartments = ({ children, onOpen, formProps }) => {
  return (
    <>
      <Box display="flex" gap={2} flexDirection={'column'}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box width="50%">
            <label>Work Flow Title</label>
            <FormTextField
              type="text"
              formProps={formProps}
              name="name"
              placeholder="Enter Work Flow Title"
            />
          </Box>
          <Box width="50%">
            <label>Work Flow Description</label>
            <FormTextField
              type="text"
              formProps={formProps}
              name="description"
              placeholder="Enter Work Flow Description"
            />
          </Box>
        </Box>
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
        <ModalButton
          width="200px"
          color="primary"
          innerText="Continue"
          onOpen={onOpen}
        />
      </Box>
    </>
  );
};

export default SelectDepartments;
