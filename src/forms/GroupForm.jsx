import { Box, Button, CircularProgress, IconButton, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'

// icons
import { Info } from '@mui/icons-material';
import { checkoutSchema, initialValues } from '../schemas/Group.schema';
import { colors } from '../utils/theme';
import Loading from '../components/mains/Loading';
import SelectMemberListsTable from '../components/tables/SelectMemberListsTable';

const GroupForm = ({
    handleFormSubmit,
    setClose,
    loading,
    btnLoading,
    clinicalAdmins,
    BOMs,
    FADs,

    selectedUsers,
    handleSelectChange

}) => {

    const isNonMobile = useMediaQuery("(min-width:600px)");

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
                            label="Work Flow Title"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.groupName}
                            name="groupName"
                            error={!!touched.groupName && !!errors.groupName}
                            helperText={touched.groupName && errors.groupName}
                            sx={{ gridColumn: "span 4" }}
                        />
                        {/* select clinical admins */}
                        <Box sx={{ gridColumn: "span 4" }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='h5'>Select COO</Typography>
                                <Tooltip
                                    sx={{ bgcolor: colors.paleBlue[100] }}
                                    arrow placement='top-start'
                                    title={
                                        <Typography>
                                            Your form will be requested as your selected member order.
                                        </Typography>
                                    }
                                >
                                    <IconButton sx={{ color: colors.paleBlue[800] }}>
                                        <Info />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <SelectMemberListsTable
                                department={"COO"}
                                users={clinicalAdmins}

                                handleSelectChange={handleSelectChange}
                                selectedUsers={selectedUsers}
                            />
                        </Box>
                        {/* select BOMs */}
                        <Box sx={{ gridColumn: "span 4" }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='h5'>Select BOMs</Typography>
                                <Tooltip
                                    sx={{ bgcolor: colors.paleBlue[100] }}
                                    arrow placement='top-start'
                                    title={
                                        <Typography>
                                            Your form will be requested as your selected member order.
                                        </Typography>
                                    }
                                >
                                    <IconButton sx={{ color: colors.paleBlue[800] }}>
                                        <Info />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <SelectMemberListsTable
                                department={"BOM"}
                                users={BOMs}

                                handleSelectChange={handleSelectChange}
                                selectedUsers={selectedUsers}
                            />
                        </Box>
                        {/* select FADs */}
                        <Box sx={{ gridColumn: "span 4" }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='h5'>Select FADs</Typography>
                                <Tooltip
                                    sx={{ bgcolor: colors.paleBlue[100] }}
                                    arrow placement='top-start'
                                    title={
                                        <Typography>
                                            Your form will be requested as your selected member order.
                                        </Typography>
                                    }
                                >
                                    <IconButton sx={{ color: colors.paleBlue[800] }}>
                                        <Info />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <SelectMemberListsTable
                                department={"FAD"}
                                users={FADs}

                                handleSelectChange={handleSelectChange}
                                selectedUsers={selectedUsers}
                            />
                        </Box>
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

    return loading ? <Loading open={!loading && loading === undefined ? false : true} /> : render
}

export default GroupForm
