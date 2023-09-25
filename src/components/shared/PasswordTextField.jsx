/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import FormTextField from './FormTextField';
import CustomInputAdornment from './CustomInputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import CustomFormLabel from './CustomFormLabel';

const PasswordTextField = ({
  formProps,
  width,
  label,
  name,
  placeholder,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box width={width}>
      <CustomFormLabel label={label} required={required} />
      <FormTextField
        type={showPassword ? 'text' : 'password'}
        formProps={formProps}
        name={name}
        placeholder={placeholder}
        inputAdornment={{
          endAdornment: (
            <CustomInputAdornment
              icon={
                showPassword ? (
                  <Visibility sx={{ fontSize: '22px' }} />
                ) : (
                  <VisibilityOff sx={{ fontSize: '22px' }} />
                )
              }
              onClick={() => setShowPassword(!showPassword)}
              position={'end'}
            />
          ),
        }}
      />
    </Box>
  );
};

export default PasswordTextField;
