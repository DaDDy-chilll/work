import { Box, Button, Checkbox, CircularProgress, FormControlLabel, TextField, useMediaQuery } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'

const DepartmentForm = ({
    handleFormSubmit,
    initialValues,
    checkoutSchema,
    btnLoading,
    setClose
}) => {

    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (
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
                <form onSubmit={handleSubmit} style={{ height: "auto" }}>
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
                            label="Department Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            name="name"
                            error={!!touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Authorized"
                            checked={values.isAuthorized}
                            value={values.isAuthorized}
                            name="isAuthorized"
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center" gap="10px" mt="40px">
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
}

export default DepartmentForm