import { Box, Tab, Tabs } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { ROLES } from '../constants/roles';
import { useState } from 'react';
import {
  InsertDriveFileOutlined,
  ListAltOutlined,
  MailOutline,
} from '@mui/icons-material';
import { colors } from '../assets/theme/theme';

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Navbar = () => {
  const { user } = useAuth();

  const [value, setValue] = useState(0);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <Box sx={{ borderBottom: `1px solid ${colors.grey[400]}` }}>
      {user?.role === ROLES.SUPER_ADMIN ? (
        <Tab value={value} onChange={handleChange} aria-label="navbar-tab">
          <Tab
            {...tabProps(0)}
            value={value}
            component={Link}
            label="Users"
            to="/users"
            icon={<ListAltOutlined />}
            iconPosition="start"
          />
          <Tab
            {...tabProps(1)}
            value={value}
            component={Link}
            label="Work Flows"
            to="/workflows"
            icon={<InsertDriveFileOutlined />}
            iconPosition="start"
          />
          <Tab
            {...tabProps(2)}
            value={value}
            component={Link}
            label="Departments"
            to="/departments"
            icon={<MailOutline />}
            iconPosition="start"
          />
        </Tab>
      ) : (
        <Tabs value={value} onChange={handleChange} aria-label="navbar tab">
          <Tab
            {...tabProps(0)}
            component={Link}
            label="All Requests"
            to="/all"
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
