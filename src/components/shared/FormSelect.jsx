/* eslint-disable react/prop-types */
import { FormControl, InputLabel, Select } from '@mui/material';

const FormSelect = ({
  children,
  placeholder,
  name,
  formProps: { values, touched, errors, handleBlur, handleChange },
}) => {
  return (
    <FormControl variant="filled" fullWidth sx={{ mt: 1 }}>
      <InputLabel>{placeholder}</InputLabel>
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
    </FormControl>
  );
};

export default FormSelect;
