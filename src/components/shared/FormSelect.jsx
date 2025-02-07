/* eslint-disable react/prop-types */
import { FormControl, InputLabel, Select, FormHelperText } from '@mui/material';

const FormSelect = ({
  children,
  placeholder,
  name,
  variant = 'filled',
  formProps: { values, touched, errors, handleBlur, handleChange },
  defaultValue,
  defaultValuesx,
  choiseValue,
}) => {

  return (
    <FormControl
      variant={variant}
      fullWidth
      sx={[{ position: 'relative' }, variant === 'filled' ? { mt: 1 } : {}]}
      error={!!touched[name] && !!errors[name]}
      defaultValue={defaultValue}
    >
      {placeholder && <InputLabel>{placeholder}</InputLabel>}
      {defaultValue && (
        <InputLabel
          shrink={false}
          sx={[
            defaultValuesx , {
            position: 'absolute',
            top: '0',
            bottom: '10%',
            transform: 'translate(-10%, 0% , -10% , 0%)',
            pointerEvents: 'none'
          }]
          }
          
        >
          {defaultValue}
        </InputLabel>
      )}
      <Select
        value={choiseValue || values[name]}
        name={name}
        error={!!touched[name] && !!errors[name]}
        helpertext={touched[name] && errors[name]}
        onBlur={handleBlur}
        onChange={handleChange}
      >
        {children}
      </Select>
      {touched[name] && errors[name] && (
        <FormHelperText>{errors[name]}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormSelect;
