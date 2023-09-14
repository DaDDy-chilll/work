/* eslint-disable react/prop-types */
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';

const Protected = ({ children }) => {
  const { user, isValidatingUser } = useAuth();

  const navigate = useNavigate();

  if (isValidatingUser) {
    return (
      <Box display={'flex'} justifyContent={'center'}>
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
