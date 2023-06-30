import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, useMediaQuery } from '@mui/material'
import { Formik } from 'formik'
import React, { useState } from 'react'

// icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Loading from '../components/mains/Loading';
import { checkoutSchema } from '../schemas/User.schema';

const UserForm = ({
    handleFormSubmit,
    setClose,
    initialValues,
    loading,
    isEdit,
    btnLoading,
    departments
}) => {

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);

    const render = (
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
                        {/* name */}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            name="name"
                            error={!!touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                            sx={{ gridColumn: "span 4" }}
                        />
                        {/* email */}
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
                            disabled={isEdit}
                        />

                        {
                            isEdit ? <></> :
                                <>
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
                                    {/* confirm password */}
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type={showPassword ? "text" : "password"}
                                        label="Confirm Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.confirmPassword}
                                        name="confirmPassword"
                                        error={!!touched.confirmPassword && !!errors.confirmPassword}
                                        helperText={touched.confirmPassword && errors.confirmPassword}
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
                                </>
                        }

                        {/* departments */}
                        <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                            <InputLabel id="demo-simple-select-filled-label">
                                Select Department
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={values.department}
                                name="department"
                                error={!!touched.department && !!errors.department}
                                helpertext={touched.department && errors.department}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            >
                                {departments && departments.map((department, i) => (
                                    <MenuItem value={department._id} key={i}>
                                        {department.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Job Label */}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Job Label"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.jobLabel}
                            name="jobLabel"
                            error={!!touched.jobLabel && !!errors.jobLabel}
                            helperText={touched.jobLabel && errors.jobLabel}
                            sx={{ gridColumn: "span 4" }}
                        />
                        {/* Permissions */}
                        <FormGroup>
                            <Box sx={{ display: "flex", gap: 5 }}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Create"
                                    checked={true}
                                    disabled={true}
                                    value={values.canCreate}
                                    name="canCreate"
                                    // error={!!touched.approve && !!errors.approve}
                                    // helpertext={touched.approve && errors.approve}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Acknowledge"
                                    checked={true}
                                    disabled={true}
                                    value={values.canAcknowledge}
                                    name="canAcknowledge"
                                    // error={!!touched.approve && !!errors.approve}
                                    // helpertext={touched.approve && errors.approve}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Comment"
                                    checked={true}
                                    disabled={true}
                                    value={values.canComment}
                                    name="canComment"
                                    // error={!!touched.approve && !!errors.approve}
                                    // helpertext={touched.approve && errors.approve}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Edit"
                                    checked={values.canPrepare}
                                    value={values.canPrepare}
                                    name="canPrepare"
                                    // error={!!touched.approve && !!errors.approve}
                                    // helpertext={touched.approve && errors.approve}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box sx={{ display: "flex", gap: 5 }}>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Revise"
                                    checked={values.canEdit}
                                    value={values.canEdit}
                                    name="canEdit"
                                    // error={!!touched.reject && !!errors.reject}
                                    // helpertext={touched.reject && errors.reject}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Verify"
                                    checked={values.canVerify}
                                    value={values.canVerify}
                                    name="canVerify"
                                    // error={!!touched.reject && !!errors.reject}
                                    // helpertext={touched.reject && errors.reject}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Approve"
                                    checked={values.canApprove}
                                    value={values.canApprove}
                                    name="canApprove"
                                    // error={!!touched.approve && !!errors.approve}
                                    // helpertext={touched.approve && errors.approve}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Reject"
                                    checked={true}
                                    disabled={true}
                                    value={values.canReject}
                                    name="canReject"
                                    // error={!!touched.approve && !!errors.approve}
                                    // helpertext={touched.approve && errors.approve}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            </Box>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Reverse"
                                checked={true}
                                disabled={true}
                                value={values.canRequestRevision}
                                name="canRequestRevision"
                                // error={!!touched.approve && !!errors.approve}
                                // helpertext={touched.approve && errors.approve}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Box>
                    <Box display="flex" justifyContent="center" gap={5} mt="40px">
                        <Button
                            sx={{ width: "200px" }}
                            type="reset"
                            color="primary"
                            variant="outlined"
                            onClick={setClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            sx={{ width: "200px" }}
                            type="submit"
                            color="primary"
                            variant="contained"
                            disabled={btnLoading ? true : false}
                        >
                            {btnLoading ? <CircularProgress size="20px" /> : "Create"}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )

    return loading ? <Loading open={!loading && loading === undefined ? false : true} /> : render
}

export default UserForm
