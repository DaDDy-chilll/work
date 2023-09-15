import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { ROLES } from '../constants/roles';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TabIcon from '@mui/icons-material/Tab';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import React from 'react';

const Navbar = () => {
  const { user } = useAuth();

  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" gap="10px">
      {user?.role === ROLES.SUPER_ADMIN ? (
        <>
          <Paper
            style={{
              display: 'flex',
              width: 'auto',
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
              <Tab
                component={Link}
                label="Users"
                to="/users"
                icon={<ListAltIcon />}
                iconPosition="start"
              />
              <Tab
                component={Link}
                label="Work Flows"
                to="/workflows"
                icon={<TabIcon />}
                iconPosition="start"
              />
              <Tab
                component={Link}
                label="Departments"
                to="/departments"
                icon={<LocalPostOfficeOutlinedIcon />}
                iconPosition="start"
              />
            </Tabs>
          </Paper>
        </>
      ) : (
        <>
          {/* <Item title="All Requests" to="/all" icon={<PublishOutlined />} />
          <Item
            title="My Requests"
            to="/my-requests"
            icon={<PublishOutlined />}
          />
          <Item title="Inbox" to="/inbox" icon={<ArticleOutlined />} /> */}

          <Tabs>
            <Tab
              component={Link}
              label="All Requests"
              to="/users"
              icon={<ListAltIcon />}
              iconPosition="start"
            />
            <Tab
              component={Link}
              label="My Requests"
              to="/workflows"
              icon={<TabIcon />}
              iconPosition="start"
            />
            <Tab
              component={Link}
              label="Inbox"
              to="/departments"
              icon={<LocalPostOfficeOutlinedIcon />}
              iconPosition="start"
            />

            <Tab
              component={Link}
              label="To Acknowledge"
              to="/departments"
              icon={<LocalPostOfficeOutlinedIcon />}
              iconPosition="start"
            />
          </Tabs>
        </>
      )}
    </Box>
  );
};

export default Navbar;
