/* eslint-disable react/prop-types */
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
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import login_image from '../assets/images/login_image.png';
import { Formik } from 'formik';
import '../css/Login.css';
// import '../css/App.css';
import ParamiLogin from '../assets/images/ParamiLogin.jpg';
import FormTextField from '../components/shared/FormTextField';

// import { colors } from '../assets/theme/theme';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { useForm } from 'react-hook-form';
import { initialValues, loginSchema } from '../schema/login.schema';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
// import { useLogin } from '../api';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  // const handleShowPassword = () => setShowPassword(!showPassword);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const { login, isLoggingIn } = useAuth();

  const handleOnSubmit = async (data) => {
    await login(data);
    Navigate('/');
  };

  return (
    <Box>
      <ToastContainer />
      <div className="flex">
        <img className="login_bg" src={login_image}></img>
      </div>

      <Box
        width="523px"
        height="649px"
        position="absolute"
        sx={{
          top: '50%',
          left: '50%',
          borderRadius: '40px',
          transform: 'translate(-50%,-50%)',
          backgroundColor: 'white',
        }}
      >
        <Box sx={{ justifyContent: 'center', display: 'flex', mt: '20px' }}>
          <img
            style={{
              width: '60%',
              objectFit: 'cover',
              margin: 'auto',
            }}
            src={ParamiLogin}
          ></img>
        </Box>

        <Box justifyContent="center" mt="-30px">
          <Typography
            textAlign="center"
            sx={{ fontWeight: 'bold', fontSize: '20px' }}
          >
            {' '}
            Login with your email and password
          </Typography>
        </Box>

        <Box>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleOnSubmit}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ml: '20px',
                  }}
                >
                  <Typography
                    mt="30px"
                    sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
                  >
                    Email{' '}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      width: '485px',
                    }}
                  >
                    <FormTextField
                      type="text"
                      name="email"
                      formProps={props}
                      placeholder="Enter Email"
                    />
                  </Box>
                  <Box mt="-15px">
                    <Typography
                      mt="30px"
                      sx={{ fontFamily: 'Poppins', fontSize: '20px' }}
                    >
                      Password{' '}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      width: '485px',
                    }}
                  >
                    <FormTextField
                      type="text"
                      name="password"
                      formProps={props}
                      placeholder="Enter Password"
                      // sx={{ gridColumn: 'span 4' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box display="flex" mt="30px">
                    <Button
                      sx={{ width: '485px', height: '50px' }}
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={isLoggingIn ? true : false}
                    >
                      {isLoggingIn ? <CircularProgress size="20px" /> : 'Login'}
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
