/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel } from '@mui/material';

const FormCheckbox = ({
  defaultValue,
  label,
  name,
  disabled,
  formProps: { values, handleBlur, handleChange },
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={{
            '& .MuiSvgIcon-root': { fontSize: '20px' },
          }}
        />
      }
      label={label}
      checked={defaultValue ? defaultValue : values[name]}
      value={defaultValue ? defaultValue : values[name]}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      disabled={disabled}
      htmlFor={values[name]}
    />
  );
};

export default FormCheckbox;
