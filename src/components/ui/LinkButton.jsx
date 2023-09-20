/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LinkButton = ({ innerText, to, variant, color }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Button
        className="no-underline"
        variant={variant}
        color={color}
        sx={{ width: '200px' }}
      >
        {innerText}
      </Button>
    </Link>
  );
};

export default LinkButton;
