/* eslint-disable react/prop-types */
import { FormControl, InputLabel, Select, FormHelperText } from '@mui/material';

const FormSelect = ({
  children,
  placeholder,
  name,
  variant = 'filled',
  formProps: { values, touched, errors, handleBlur, handleChange },

}) => {
  return (
    <FormControl variant={variant} fullWidth  sx={variant === 'filled' ? { mt: 1 } : {}} error={!!touched[name] && !!errors[name]}>
      {placeholder && <InputLabel>{placeholder}</InputLabel>}
      <Select
        value={values[name]}
        name={name}
        error={!!touched[name] && !!errors[name]}
        helpertext={touched[name] && errors[name]}
        onBlur={handleBlur}
        onChange={handleChange}
      >
        {children}
      </Select>
      {touched[name] && errors[name] && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

export default FormSelect;
