/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import FormTextField from './FormTextField';
import CustomInputAdornment from './CustomInputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

const PasswordTextField = ({ formProps }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box width="50%">
        <label>Password</label>
        <FormTextField
          type={showPassword ? 'text' : 'password'}
          formProps={formProps}
          name="password"
          placeholder="Enter Password"
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
      <Box width="50%">
        <label>Confirm Password</label>
        <FormTextField
          type={showPassword ? 'text' : 'password'}
          formProps={formProps}
          name="confirmPassword"
          placeholder="Confirm Password"
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
    </Box>
  );
};

export default PasswordTextField;
