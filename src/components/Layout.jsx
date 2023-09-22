import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { ROLES } from '../constants/roles';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import Topbar from './Topbar';
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
    <Box bgcolor={colors.bgColor}>
      <Topbar />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
