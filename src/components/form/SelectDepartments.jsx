/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import LinkButton from '../ui/LinkButton';
import FormTextField from '../shared/FormTextField';
import ModalButton from '../ui/ModalButton';
import { useNavigate } from 'react-router-dom';
import CustomFormLabel from '../shared/CustomFormLabel';
import { colors } from '../../assets/theme/theme';
import { useState } from 'react';

const SelectDepartments = ({ children, onOpen, formProps }) => {
  const navigate = useNavigate();

  const [optionValue, setOptionValue] = useState(formProps.values.type);

  const handleOptionChange = (value) => {
    setOptionValue(value);
    formProps.setFieldValue('type', value);
  };

  return (
    <>
      <Box display="flex" gap={2} flexDirection={'column'}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box width="50%">
            <CustomFormLabel label="Work Flow Title" required={true} />
            <FormTextField
              type="text"
              formProps={formProps}
              name="name"
              placeholder="Enter Work Flow Title"
            />
          </Box>
          <Box width="50%">
            <CustomFormLabel label="Work Flow Description" required={true} />
            <FormTextField
              type="text"
              formProps={formProps}
              name="description"
              placeholder="Enter Work Flow Description"
            />
          </Box>
        </Box>
        <CustomFormLabel label="Private Work Flow ?" required={true} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box
            sx={{
              bgcolor: `${
                optionValue === 'normal' ? colors.paleBlue[800] : colors.bgColor
              }`,
              color: `${
                optionValue === 'normal' ? colors.white[100] : colors.black[300]
              }`,
              width: '70px',
              height: '30px',
              borderRadius: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleOptionChange('normal')}
          >
            No
          </Box>
          <Box
            sx={{
              bgcolor: `${
                optionValue === 'private'
                  ? colors.paleBlue[800]
                  : colors.bgColor
              }`,
              color: `${
                optionValue === 'private'
                  ? colors.white[100]
                  : colors.black[300]
              }`,
              width: '70px',
              height: '30px',
              borderRadius: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleOptionChange('private')}
          >
            Yes
          </Box>
        </Box>
        {children}
      </Box>
      <Box display="flex" justifyContent="end" gap={2} mt={2}>
        <LinkButton
          width="200px"
          innerText="Cancel"
          onClick={() => navigate('/workflows')}
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
