/* eslint-disable react/prop-types */
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';

const FormRadioButton = ({
  items,
  name,
  formProps: { values, handleChange },
}) => {
  return (
    <RadioGroup name={name} value={values[name]} onChange={handleChange}>
      {items.map((item) => (
        <FormControlLabel
          key={item}
          value={item}
          control={<Radio />}
          label={item}
          sx={{ textTransform: 'capitalize' }}
        />
      ))}
    </RadioGroup>
  );
};

export default FormRadioButton;
