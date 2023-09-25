/* eslint-disable react/prop-types */
import { IconButton, InputAdornment } from '@mui/material';

const CustomInputAdornment = ({ onClick, icon, position }) => {
  return (
    <InputAdornment position={position}>
      <IconButton
        aria-label="toggle password visibility"
        onClick={onClick}
        edge="end"
      >
        {icon}
      </IconButton>
    </InputAdornment>
  );
};

export default CustomInputAdornment;
