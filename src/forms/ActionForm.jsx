import { Box, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import RichTextEditor from '../components/form_controls/RichTextEditor'
import { Cancel, CheckCircle, SmsOutlined } from '@mui/icons-material'
import { colors } from '../utils/theme'
import { checkoutSchema as approveCheckoutSchema, initialValues as approveInitialValue } from '../schemas/ApproveRemark.schema';
import { checkoutSchema as revisionCheckoutSchema, initialValues as revisionInitialValue } from '../schemas/RevisionRemark.schema';
import { checkoutSchema as remarkCheckoutSchema, initialValues as remarkInitialValue } from '../schemas/Remark.schema';

const Action = ({ action, selected, setSelected, icon }) => {
    return (
        <IconButton onClick={() => setSelected(action)}>
            <Paper elevation={3} sx={{ p: 2, width: "150px", height: "120px", display: 'flex', flexDirection: "column", alignItems: "center", backgroundColor: selected === action ? colors.paleBlue[800] : colors.white[100] }}>
                <Box sx={{ backgroundColor: colors.white[100], width: "60px", height: "60px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {icon}
                </Box>
                <Typography variant='h5' sx={{ textTransform: "capitalize" }}>{action}</Typography>
            </Paper>
        </IconButton>
    )
}

const ActionForm = ({
    handleFormSubmit,
    selected,
    reviewer,
    setSelected,
    loading,
    groups,
    existingDepartments
}) => {
    const departments = existingDepartments.filter((department, i) => (department !== reviewer.department))

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={
                selected === "approve" && reviewer.department === "OFFICE_ADMIN" ? approveInitialValue :
                    selected === "revision" ? revisionInitialValue : remarkInitialValue
            }
            validationSchema={
                selected === "approve" && reviewer.department === "OFFICE_ADMIN" ? approveCheckoutSchema :
                    selected === "revision" ? revisionCheckoutSchema : remarkCheckoutSchema
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
                    <Typography variant='h4' fontWeight="bold" mb={2}>Please select action</Typography>
                    <Box sx={{ display: 'flex', justifyContent: "space-evenly", alignItems: "center", gap: 3 }}>
                        {/* NEED PERMISSION */}
                        {
                            reviewer.canApprove &&
                            <Action action="approve" icon={<CheckCircle sx={{ fontSize: 40, color: colors.paleGreen[800] }} />} selected={selected} setSelected={setSelected} />
                        }
                        {
                            <Action action="reject" icon={<Cancel sx={{ fontSize: 40, color: colors.red[800] }} />} selected={selected} setSelected={setSelected} />
                        }
                        {
                            reviewer.canVerify &&
                            <Action action="verify" icon={<CheckCircle sx={{ fontSize: 40, color: colors.darkGreen[800] }} />} selected={selected} setSelected={setSelected} />
                        }

                        {/* NO PERMISSIONS */}
                        {/* REQUESTED_REVISION => no permissions */}
                        {/* {
                            reviewer.department !== "OFFICE_ADMIN" &&
                            <Action action="revision" icon={<FlipCameraAndroidOutlined sx={{ fontSize: 40, color: colors.purple[800] }} />} selected={selected} setSelected={setSelected} />
                        }                        */}

                        {/* COMMENTED => no permissions */}
                        <Action action="comment" icon={<SmsOutlined sx={{ fontSize: 40, color: colors.darkYellow[800] }} />} selected={selected} setSelected={setSelected} />
                    </Box>


                    <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "space-evenly", gap: "20px", mt: 5 }}>
                        {/* SELECT DEPARTMENT */}
                        {
                            selected === "revision" &&
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
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                    }}
                                >
                                    {departments.map((department, i) => (
                                        <MenuItem sx={{ textTransform: "capitalize" }} value={department} key={i}>
                                            {department}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        }

                        {/* remark */}
                        <Box sx={{ gridColumn: "span 4" }}>
                            <RichTextEditor
                                placeholder="Remark"
                                setFieldValue={(value) => setFieldValue("remark", value)}
                                value={values.remark}
                            />
                        </Box>

                        <Box display="flex" justifyContent="flex-end" gap="10px">
                            <Button
                                sx={{ width: "200px" }}
                                type="submit"
                                color="primary"
                                variant="contained"
                                disabled={loading ? true : false}
                            >
                                {loading ? <CircularProgress size="20px" /> : "Add"}
                            </Button>
                        </Box>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default ActionForm
