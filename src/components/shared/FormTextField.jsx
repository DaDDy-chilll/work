/* eslint-disable react/prop-types */
import { TextField } from '@mui/material';
import { colors } from '../../assets/theme/theme';

const FormTextField = ({
  formProps: { handleBlur, handleChange, values, touched, errors },
  name,
  placeholder,
  type,
  disabled,
  inputAdornment,
  multiline,
  minRows = 0,
  value,
}) => {
  return (
    <TextField
      minRows={minRows}
      multiline={multiline}
      disabled={disabled}
      type={type}
      fullWidth
      variant="outlined"
      name={name}
      placeholder={placeholder}
      sx={{
        input: {
          color: colors.black[300],
        },
      }}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value ?? values[name]}
      error={!!touched[name] && !!errors[name]}
      helperText={touched[name] && errors[name]}
      InputProps={inputAdornment}
    />
  );
};

export default FormTextField;
