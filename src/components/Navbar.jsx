/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  ArticleOutlined,
  // Groups,
  // PeopleOutlined,
  PublishOutlined,
} from '@mui/icons-material';
import { Box, Paper, Tab, Tabs, makeStyles } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import { ROLES } from '../constants/roles';
import React from 'react';

const Item = ({ title, to, icon }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(to);

  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      {/* <Tabs
        variant="contained"
        sx={{ borderRadius: '50px', display: 'flex', gap: 1 }}
        color={isActive ? 'primary' : 'secondary'}
      >
        {' '}
        {icon} {title}
      </Tabs> */}
    </Link>
  );
};

const Navbar = () => {
  const { user } = useAuth();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" gap="10px">
      {user?.role === ROLES.SUPER_ADMIN ? (
        <>
          {/* <Item title="Users" to="/users" icon={<PeopleOutlined />} />
          <Item title="Work Flows" to="/workflows" icon={<Groups />} />
          <Item title="Departments" to="/departments" icon={<Groups />} /> */}

          <Paper
            style={{
              display: 'flex',
            }}
          >
            <Tabs
              sx={{
                display: 'flex',
              }}
              value={value}
              onChange={handleChange}
              centered
            >
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </Paper>
        </>
      ) : (
        <>
          <Item title="All Requests" to="/all" icon={<PublishOutlined />} />
          <Item
            title="My Requests"
            to="/my-requests"
            icon={<PublishOutlined />}
          />
          <Item title="Inbox" to="/inbox" icon={<ArticleOutlined />} />
        </>
      )}
    </Box>
  );
};

export default Navbar;
