/* eslint-disable react/prop-types */
import { Button } from '@mui/material';

const LinkButton = ({ innerText, onClick, variant, color, width, icon }) => {
  return (
    <Button
      onClick={onClick}
      className="no-underline"
      variant={variant}
      color={color}
      sx={{ width }}
    >
      {innerText} {icon}
    </Button>
  );
};

export default LinkButton;
