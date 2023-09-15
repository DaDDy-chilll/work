/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { TYPES } from '../../constants/document';

const FormSelect = ({ items }) => {
  console.log({ items });
  return (
    <FormControl variant="filled" fullWidth sx={{ mt: 1 }}>
      <InputLabel id="documentType">Select Document Type</InputLabel>
      <Select labelId="documentType" id="documentType">
        {Object.values(TYPES).map((type, i) => (
          <MenuItem sx={{ textTransform: 'capitalize' }} value={type} key={i}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
