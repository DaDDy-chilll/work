/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import WorkflowRoute from '../ui/WorkflowRoute';

const FormSelect = ({
  items,
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
        {items &&
          items.map((item) => (
            <MenuItem
              sx={{ textTransform: 'capitalize' }}
              value={item._id}
              key={item._id}
            >
              <WorkflowRoute name={item.name} departments={item.departments} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
