/* eslint-disable react/prop-types */
import { Button, Typography } from '@mui/material';

const LinkButton = ({ innerText, onClick, variant, color, width }) => {
  return (
    <Button
      onClick={onClick}
      className="no-underline"
      variant={variant}
      color={color}
      sx={{ width }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        {innerText}
      </Typography>
    </Button>
  );
};

export default LinkButton;
