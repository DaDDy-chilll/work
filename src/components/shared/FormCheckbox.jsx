/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel } from '@mui/material';

const FormCheckbox = ({
  label,
  name,
  formProps: { values, handleBlur, handleChange },
}) => {
  return (
    <FormControlLabel
      control={<Checkbox />}
      label={label}
      checked={values.isAuthorized}
      value={values.isAuthorized}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};

export default FormCheckbox;
