/* eslint-disable react/prop-types */
import { KeyboardArrowDown } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const TableActionButton = ({ id, orderId }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <div>
      <Button
        id="table-action-button"
        aria-controls={open ? 'table-action-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        Actions
      </Button>
      <Menu
        id="table-action-menu"
        MenuListProps={{
          'aria-labelledby': 'table-action-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          sx={{ fontSize: '14px' }}
          onClick={() => navigate(`/workflows/${id}${orderId ? `?orderId=${orderId}` : ''}`)}
          disableRipple
        >
          View
        </MenuItem>
        <MenuItem
          sx={{ fontSize: '14px' }}
          onClick={() => navigate(`/workflows/edit/${id}${orderId ? `?orderId=${orderId}` : ''}`)}
          disableRipple
        >
          Edit
        </MenuItem>
      </Menu>
    </div>
  );
};
