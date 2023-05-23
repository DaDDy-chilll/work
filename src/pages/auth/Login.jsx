import { Box, Button, CircularProgress, Grid, IconButton, InputAdornment, TextField, Typography, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { authRoute } from "../../utils/APIRoutes";
import { colors } from "../../utils/theme";
import { toastOptions } from "../../utils/toastOptions";

const Login = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleFormSubmit = async (values) => {
        const { email, password } = values

        try {
            setLoading(true)
            const { data } = await axios.post(`${authRoute}/login`, {
                email,
                password,
            });

            const { accessToken } = data.payload

            Cookies.set('accessToken', accessToken, { expires: 1 });
            
            if(data.payload.user.role === "superadmin"){
                navigate('/users')
                return setLoading(false)
            }
            
            navigate('/')

            setLoading(false)

        } catch (err) {
            setLoading(false)
            return toast.error(err.response.data.message, toastOptions)
        }

    };

    return (
        <Box>
            <ToastContainer />
            <Box mt="125px" mx="auto" width="400px" borderRadius="20px" border={`2px solid ${colors.paleBlue[800]}`} px={10} py={7}>
                <Grid align="center" mb="40px">
                    <Typography variant="h2" color={colors.paleBlue[800]} fontWeight="bold">
                        Login
                    </Typography>
                </Grid>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="40px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type={showPassword ? "text" : "password"}
                                    label="Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: "span 4" }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityIcon />
                                                    ) : (
                                                        <VisibilityOffIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>

                            <Box display="flex" justifyContent="center" mt="40px">
                                <Button
                                    sx={{ width: "400px" }}
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    disabled={loading ? true : false}
                                >
                                    {loading ? <CircularProgress size="20px" /> : "Login"}
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

const checkoutSchema = object({
    email: string().email("invalid email").required("Email is required"),
    password: string().required("Password is required")
    // .min(8, "Password must be 8 characters long")
    // .matches(/[0-9]/, "Password requires a number")
    // .matches(/[a-z]/, "Password requires a lowercase letter")
    // .matches(/[A-Z]/, "Password requires an uppercase letter")
    // .matches(/[^\w]/, "Password requires a symbol"),
});

const initialValues = {
    email: "",
    password: "",
};

export default Login;
