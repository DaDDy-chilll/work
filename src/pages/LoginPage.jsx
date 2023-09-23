import { Box, Typography } from '@mui/material';
import Parami_Login_Bg from '../assets/images/parami_login_bg.jpg';
import Parami_Login_Logo from '../assets/images/ParamiLoginLogo.jpg';
import { colors } from '../assets/theme/theme';
import LoginForm from '../components/form/LoginForm';

const LoginPage = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <img
        className="login_bg"
        src={Parami_Login_Bg}
        alt="Parami Login Background"
      />
      <Box
        className="login_form"
        sx={{ bgcolor: colors.white[100], p: 3, borderRadius: '1rem', gap: 2 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img
            className="login_logo"
            src={Parami_Login_Logo}
            alt="Parami Login Logo"
          />
        </Box>
        <Typography variant="h2" textAlign="center">
          Login with your Email and Password
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginPage;
