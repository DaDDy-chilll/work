import { ArrowDropDownOutlined } from '@mui/icons-material';
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useAuth, useDisclosure } from '../hooks';
import { colors } from '../assets/theme/theme';

// images
import ParamiLogo from '../assets/images/ParamiLogo.png';
import Notifications from './ui/NotificationIcon';
import NotificationDrawer from './ui/NotificationDrawer';
import { useNavigate } from 'react-router-dom';
import { useGetAllNotifications } from '../api';

const Topbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const anchorEl = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [notiOpen, setNotiOpen] = useState(false);

  const { data: notifications } = useGetAllNotifications();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      sx={{
        color: colors.paleBlue[800],
        backgroundColor: colors.white[100],
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        m: '20px',
        borderRadius: '10px',
        p: 1,
      }}
    >
      <img
        style={{ borderRight: `0.2px solid ${colors.grey[500]}` }}
        src={ParamiLogo}
        alt=""
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {notifications && (
          <>
            <Notifications
              notifications={notifications}
              setNotiOpen={setNotiOpen}
            />
            <NotificationDrawer setNotiOpen={setNotiOpen} notiOpen={notiOpen} />
          </>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderLeft: `0.2px solid ${colors.grey[500]}`,
            pl: '10px',
          }}
          id="basic-button"
          aria-controls={isOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : undefined}
          onClick={onOpen}
          ref={anchorEl}
        >
          <Avatar
            sx={{ bgcolor: colors.paleBlue[800] }}
            alt={user.name}
            src="/static/images/avatar/1.jpg"
          />
          <Typography variant="h4" mx="10px">
            {user.email}
          </Typography>
          <ArrowDropDownOutlined />
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl.current}
          open={isOpen}
          onClose={onClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
