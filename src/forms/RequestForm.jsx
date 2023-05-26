import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, useMediaQuery } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import { checkoutSchema, claimCheckoutSchema } from '../schemas/Document.schema';
import Loading from '../components/mains/Loading';
import FileInput from '../components/form_controls/FileInput';
import RichTextEditor from '../components/form_controls/RichTextEditor';

const RequestForm = ({ handleFormSubmit, setClose, initialValues, loading, disabled, btnLoading, isClaimDocument }) => {

    const types = ["EXPENSE", "ADVANCE"]

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const render = (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={
                isClaimDocument ? claimCheckoutSchema : checkoutSchema
            }
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue
            }) => (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                            // multiline
                            // rows={3}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            name="name"
                            error={!!touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                            sx={{ gridColumn: "span 4" }}
                        />
                        {/* description */}
                        <Box sx={{ gridColumn: "span 4" }}>
                            <RichTextEditor
                                setFieldValue={(value) => setFieldValue("description", value)}
                                value={values.description}
                            />
                        </Box>

                        {/* document type */}
                        {
                            disabled &&
                            <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                                <InputLabel id="demo-simple-select-filled-label">
                                    Select Document Type
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={values.type}
                                    name="type"
                                    error={!!touched.type && !!errors.type}
                                    helpertext={touched.type && errors.type}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                >
                                    {types.map((type, i) => (
                                        <MenuItem sx={{ textTransform: "capitalize" }} value={type} key={i}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }

                        {/* amount */}
                        {
                            disabled &&
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    label="Amount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.amount}
                                    name="amount"
                                    error={!!touched.amount && !!errors.amount}
                                    helperText={touched.amount && errors.amount}
                                    sx={{ gridColumn: "span 4" }}
                                />
                        }

                        {/* attachment */}
                        <Box sx={{ gridColumn: "span 4" }}>
                            <FileInput
                                onFilesChange={(files) => setFieldValue("attachments", [...files])}
                                value={values.attachments}
                            />
                        </Box>
                    </Box>

                    <Box display="flex" justifyContent="flex-end" gap="10px" mt="40px">
                        <Button
                            sx={{ width: "200px" }}
                            type="submit"
                            color="primary"
                            variant="contained"
                            onClick={setClose}
                            disabled={btnLoading ? true : false}
                        >
                            {btnLoading ? <CircularProgress size="20px" /> : "Submit"}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )

    return loading ? <Loading open={!loading && loading === undefined ? false : true} /> : render
}

export default RequestForm
