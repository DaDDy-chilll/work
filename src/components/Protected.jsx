/* eslint-disable react/prop-types */
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { colors } from '../assets/theme/theme';

const Protected = ({ children }) => {
  const { user, isValidatingUser } = useAuth();

  const navigate = useNavigate();

  if (isValidatingUser) {
    return (
      <Box
        bgcolor={colors.bgColor}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (!user) {
    return navigate('/login');
  }
  return <>{children}</>;
};

export default Protected;
