/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress } from '@mui/material';
import { Formik } from 'formik';
import FormTextField from '../shared/FormTextField';
import { loginSchema, loginValues } from '../../schema/auth.schema';
import PasswordTextField from '../shared/PasswordTextField';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const { login, isLoggingIn } = useAuth();

  const handleLogin = async (values) => {
    await login(values);
  };

  return (
    <Formik
      initialValues={loginValues}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pb: 5 }}>
            <Box>
              <label>Email</label>
              <FormTextField
                type="text"
                formProps={props}
                name="email"
                placeholder="Enter Email"
              />
            </Box>
            <Box>
              <PasswordTextField
                formProps={props}
                label="Password"
                placeholder="Enter Password"
                name="password"
                width="100%"
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? <CircularProgress size="20px" /> : 'Login'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
