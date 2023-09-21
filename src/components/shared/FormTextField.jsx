/* eslint-disable react/prop-types */
import { TextField } from '@mui/material';

const FormTextField = ({
  formProps: { handleBlur, handleChange, values, touched, errors },
  name,
  placeholder,
  type,
  disabled,
}) => {
  return (
    <TextField
      disabled={disabled}
      type={type}
      fullWidth
      variant="filled"
      name={name}
      placeholder={placeholder}
      sx={{ mt: 1 }}
      onBlur={handleBlur}
      onChange={handleChange}
      value={values[name]}
      error={!!touched[name] && !!errors[name]}
      helperText={touched[name] && errors[name]}
    />
  );
};

export default FormTextField;
