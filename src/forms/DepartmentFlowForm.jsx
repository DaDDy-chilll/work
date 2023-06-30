import { Box, Button, TextField, useMediaQuery } from '@mui/material'
import React from 'react'

// icons
import SelectDepartment from '../components/form_controls/SelectDepartment';

const DepartmentFlowForm = ({    
    setClose,
    setOpen,
    selectDepartments,
    handleDepartmentChange,

    handleBlur,
    values,
    touched,
    errors,
    handleChange
}) => {

    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (
        <>
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
                <SelectDepartment
                    selectDepartments={selectDepartments}
                    handleDepartmentChange={handleDepartmentChange}
                />
            </Box>
            <Box display="flex" justifyContent="end" gap="10px" mt="40px">
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
                    type="button"
                    color="primary"
                    variant="contained"
                    onClick={setOpen}
                >
                    Continue
                </Button>
            </Box>
        </>
    )
}

export default DepartmentFlowForm