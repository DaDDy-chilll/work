import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { ROLES } from '../constants/roles';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import Topbar from './Topbar';
import Navbar from './Navbar';
import { colors } from '../assets/theme/theme';

const Layout = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === ROLES.SUPER_ADMIN) {
      return navigate('/users');
    } else {
      return navigate('/all');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

  return (
    <div className="app_container" style={{ backgroundColor: colors.bgColor }}>
      <div className="app_body">
        <Topbar />
        <Box mx="30px" sx={{ minHeight: '90vh' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Navbar />
          </Box>
          <Outlet />
        </Box>
      </div>
    </div>
  );
};

export default Layout;
