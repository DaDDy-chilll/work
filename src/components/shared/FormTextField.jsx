/* eslint-disable react/prop-types */
import { TextField } from '@mui/material';

const FormTextField = ({
  formProps: { handleBlur, handleChange, values, touched, errors },
  name,
  placeholder,
  type,
}) => {
  return (
    <TextField
      type={type}
      fullWidth
      variant="outlined"
      name={name}
      placeholder={placeholder}
      sx={{
        mt: 1,
        input: {
          color: '#9e9e9e',
          background: '#FAFCFF',
        },
      }}
      onBlur={handleBlur}
      onChange={handleChange}
      value={values[name]}
      error={!!touched[name] && !!errors[name]}
      helperText={touched[name] && errors[name]}
    />
  );
};

export default FormTextField;
