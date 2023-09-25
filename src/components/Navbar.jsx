/* eslint-disable react/prop-types */
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  AccountTree,
  ApartmentOutlined,
  InsertDriveFileOutlined,
  ListAltOutlined,
  MailOutline,
  Person,
} from '@mui/icons-material';
import { colors } from '../assets/theme/theme';
import { ROLES } from '../constants';

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const getCurrentIndex = (path) => {
  if (path === '/my-requests' || path === '/workflows') {
    return 1;
  }
  if (path === '/inbox' || path === '/departments') {
    return 2;
  }
  return 0;
};

const Item = ({ label, icon, to }) => {
  return (
    <Tab
      {...tabProps(0)}
      component={Link}
      label={
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 400,
            color: colors.black[100],
          }}
        >
          {label}
        </Typography>
      }
      to={to}
      icon={icon}
      iconPosition="start"
    />
  );
};

const Navbar = () => {
  const { user } = useAuth();

  const currentPath = useLocation();

  const [value, setValue] = useState(getCurrentIndex(currentPath.pathname));

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: `1px solid ${colors.grey[400]}` }}>
      {user?.role === ROLES.SUPER_ADMIN ? (
        <Tabs value={value} onChange={handleChange} aria-label="navbar-tab">
          <Item
            icon={<Person sx={{ fontSize: '20px' }} />}
            label="Users"
            to="/users"
          />
          <Item
            icon={<AccountTree sx={{ fontSize: '20px' }} />}
            label="Work Flows"
            to="/workflows"
          />
          <Item
            icon={<ApartmentOutlined sx={{ fontSize: '20px' }} />}
            label="Departments"
            to="/departments"
          />
        </Tabs>
      ) : (
        <Tabs value={value} onChange={handleChange} aria-label="navbar-tab">
          <Item
            icon={<ListAltOutlined sx={{ fontSize: '20px' }} />}
            label="All Requests"
            to="/"
          />
          <Item
            icon={<InsertDriveFileOutlined sx={{ fontSize: '20px' }} />}
            label="My Requests"
            to="/my-requests"
          />
          <Item
            icon={<MailOutline sx={{ fontSize: '20px' }} />}
            label="Inbox"
            to="/inbox"
          />
        </Tabs>
      )}
    </Box>
  );
};

export default Navbar;
