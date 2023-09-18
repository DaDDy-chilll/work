// import {
//   Box,
//   Button,
//   CircularProgress,
//   IconButton,
//   InputAdornment,
//   TextField,
//   Typography,
// } from '@mui/material';
// import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import login_image from '../assets/images/login_image.png';
import { red } from '@mui/material/colors';
// import { colors } from '../assets/theme/theme';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { useForm } from 'react-hook-form';
// import { useAuth } from '../hooks';

const LoginPage = () => {
  // const [showPassword, setShowPassword] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // const { login, isLoggingIn } = useAuth();

  // const handleOnSubmit = handleSubmit(async (data) => {
  //   await login(data);
  // });

  return (
    <Box>
      <ToastContainer />
      {/* <Box
        mt="125px"
        mx="auto"
        width="400px"
        borderRadius="20px"
        border={`2px solid ${colors.paleBlue[800]}`}
        p={5}
      >
        <Typography
          textAlign={'center'}
          mb={3}
          variant="h1"
          color={colors.paleBlue[800]}
          fontWeight="bold"
        >
          Login
        </Typography>
        <form onSubmit={handleOnSubmit}>
          <Box
            display="grid"
            gap="40px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              {...register('email')}
              error={!!errors.title}
              sx={{ gridColumn: 'span 4' }}
            />
            <TextField
              type={showPassword ? 'text' : 'password'}
              fullWidth
              label="Password"
              variant="outlined"
              {...register('password')}
              error={!!errors.title}
              sx={{ gridColumn: 'span 4' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box display="flex" justifyContent="center" mt="40px">
            <Button
              sx={{ width: '400px' }}
              type="submit"
              color="primary"
              variant="contained"
              disabled={isLoggingIn ? true : false}
            >
              {isLoggingIn ? <CircularProgress size="20px" /> : 'Login'}
            </Button>
          </Box>
        </form>
      </Box> */}

      <Box display="flex">
        <img
          style={{ width: '100vw', height: '100vh', position: 'relative' }}
          src={login_image}
        ></img>
        <div></div>
        <Box border="1px solid red" position="absolute" top="50%" left="50%">
          Test
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
