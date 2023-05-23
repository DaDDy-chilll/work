import { Box, Typography } from '@mui/material';
import React from 'react';
import { ApartmentOutlined, CheckCircle } from '@mui/icons-material';
import { colors } from '../../utils/theme';
import { changeTextColor } from '../../helpers';

const DepartmentActions = ({ department, reviewers }) => {

    return (
        <Box
            sx={{
                backgroundColor: colors.white[200],
                p: 2,
                width: "25%",
                borderRadius: "10px",
                boxShadow: 1,
                border: `1px solid ${colors.grey[200]}`
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, borderBottom: `0.2px solid ${colors.grey[500]}`, mb: 2, pb: 2 }}>
                <Box sx={{ backgroundColor: colors.bgColor, py: "3px", px: "4px", borderRadius: "50%" }}>
                    <ApartmentOutlined
                        sx={{
                            color: colors.paleBlue[800],
                            fontSize: "25px"
                        }}
                    />
                </Box>
                <Typography variant='h5'>{department}</Typography>
            </Box>
            {
                reviewers.map(({ status, reviewer, _id }) => (
                    <Box key={_id} sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1, 
                        mt: 1,
                        color: changeTextColor({ action: status })
                    }}>
                        <CheckCircle
                            // fontSize='medium'
                            sx={{ fontSize: "25px" }}
                        />
                        <Typography variant='h5'>{status} by {reviewer.name}</Typography>
                    </Box>
                ))
            }
        </Box>
    )
}

const FormStatus = ({ reviewers }) => {

    const officeAdmins = reviewers.filter((reviewer) => (reviewer.department === "OFFICE_ADMIN"))
    const clinicalAdmins = reviewers.filter((reviewer) => (reviewer.department === "COO"))
    const BOMs = reviewers.filter((reviewer) => (reviewer.department === "BOM"))
    const FADs = reviewers.filter((reviewer) => (reviewer.department === "FAD"))

    return (
        <Box
            sx={{ display: 'flex', gap: 2 }}
        >
            <DepartmentActions department="Office Admins" reviewers={officeAdmins} />
            <DepartmentActions department="COO" reviewers={clinicalAdmins} />
            <DepartmentActions department="BOMs" reviewers={BOMs} />
            <DepartmentActions department="FADs" reviewers={FADs} />
        </Box>
    )
}

export default FormStatus
