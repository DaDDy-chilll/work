/* eslint-disable react/prop-types */
import { Autocomplete, FormControl, FormHelperText, TextField } from '@mui/material';

const FormAutocomplete = ({
  options,
  placeholder,
  name,
  formProps: { values, touched, errors, handleBlur, setFieldValue },
  sx,
}) => {
  return (
    <FormControl 
      fullWidth 
      error={!!touched[name] && !!errors[name]}
      sx={sx}
    >
      <Autocomplete
        disablePortal
        options={options}
        value={options?.find(option => option._id === values[name]) || null}
        onChange={(_, newValue) => {
          setFieldValue(name, newValue?._id || '');
        }}
        getOptionLabel={(option) => option.value || ''}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            error={!!touched[name] && !!errors[name]}
            onBlur={handleBlur}
          />
        )}
      />
      {touched[name] && errors[name] && (
        <FormHelperText>{errors[name]}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormAutocomplete; 