/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import FormTextField from './FormTextField';
import CustomInputAdornment from './CustomInputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

const PasswordTextField = ({ formProps, width, label, name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box width={width}>
      <label>{label}</label>
      <FormTextField
        type={showPassword ? 'text' : 'password'}
        formProps={formProps}
        name={name}
        placeholder={placeholder}
        inputAdornment={{
          endAdornment: (
            <CustomInputAdornment
              icon={showPassword ? <Visibility /> : <VisibilityOff />}
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
