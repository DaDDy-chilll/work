import { Box, Tab, Tabs } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  InsertDriveFileOutlined,
  ListAltOutlined,
  MailOutline,
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
          <Tab
            {...tabProps(0)}
            component={Link}
            label="Users"
            to="/users"
            icon={<ListAltOutlined />}
            iconPosition="start"
          />
          <Tab
            {...tabProps(1)}
            component={Link}
            label="Work Flows"
            to="/workflows"
            icon={<InsertDriveFileOutlined />}
            iconPosition="start"
          />
          <Tab
            {...tabProps(2)}
            component={Link}
            label="Departments"
            to="/departments"
            icon={<MailOutline />}
            iconPosition="start"
          />
        </Tabs>
      ) : (
        <Tabs value={value} onChange={handleChange} aria-label="navbar-tab">
          <Tab
            {...tabProps(0)}
            component={Link}
            label="All Requests"
            to="/"
            icon={<ListAltOutlined />}
            iconPosition="start"
          />
          <Tab
            {...tabProps(1)}
            component={Link}
            label="My Requests"
            to="/my-requests"
            icon={<InsertDriveFileOutlined />}
            iconPosition="start"
          />
          <Tab
            {...tabProps(2)}
            component={Link}
            label="Inbox"
            to="/inbox"
            icon={<MailOutline />}
            iconPosition="start"
          />
        </Tabs>
      )}
    </Box>
  );
};

export default Navbar;
