import { ArrowDropDownOutlined } from '@mui/icons-material';
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useAuth, useDisclosure } from '../hooks';
import { colors } from '../assets/theme/theme';

// images
import Logo from '../assets/images/Logo.jpg';
import Notifications from './ui/NotificationIcon';
import NotificationDrawer from './ui/NotificationDrawer';
import { useNavigate } from 'react-router-dom';
import { useGetAllNotifications } from '../api';
import { ROLES } from '../constants';
import UserForm from './form/UserForm';
import Modal from './ui/Modal';

const Topbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const anchorEl = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [notiOpen, setNotiOpen] = useState(false);

  const { data: notifications } = useGetAllNotifications({
    limit: 0,
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [isChangePassword, setIsChangePassword] = useState(false);

  const handleFormClose = () => {
    setIsChangePassword(false);
    onClose();
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.white[100],
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        m: 2,
        borderRadius: '10px',
        p: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <img
          style={{
            borderRight: `0.2px solid ${colors.grey[500]}`,
            width: '70px',
            objectFit: 'scale-down',
            marginLeft: '.5rem',
            paddingRight: '.5rem',
          }}
          src={Logo}
          alt=""
        />
        <Typography
          sx={{ fontSize: '18px', fontWeight: 600, color: colors.black[200] }}
        >
          DMH Office Approval System
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {user.role !== ROLES.SUPER_ADMIN && notifications && (
          <>
            <Notifications
              notifications={notifications}
              setNotiOpen={setNotiOpen}
            />
            <NotificationDrawer
              setNotiOpen={setNotiOpen}
              notiOpen={notiOpen}
              notifications={notifications}
            />
          </>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderLeft: `0.2px solid ${colors.grey[500]}`,
            pl: '10px',
            cursor: 'pointer',
          }}
          id="basic-button"
          aria-controls={isOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : undefined}
          onClick={onOpen}
          ref={anchorEl}
        >
          <Avatar sx={{ bgcolor: colors.paleBlue[800] }} alt={user.name} />
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              ml: 1,
              color: colors.black[300],
            }}
          >
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
          <MenuItem
            sx={{ fontSize: '14px' }}
            onClick={() => setIsChangePassword(true)}
          >
            Change Password
          </MenuItem>
          <Box>
            <Modal
              title="Change Password"
              isOpen={isChangePassword}
              onClose={handleFormClose}
              content={
                <UserForm
                  onClose={handleFormClose}
                  oldData={undefined}
                  isChangePassword={isChangePassword}
                />
              }
            />
          </Box>
          <MenuItem sx={{ fontSize: '14px' }} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
