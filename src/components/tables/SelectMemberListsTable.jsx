import { Box, Checkbox, FormControlLabel, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import React from 'react'

import { colors } from "../../utils/theme";
import { Check, Info } from '@mui/icons-material';

const SelectMemberListsTable = ({
    isCreate,
    department,
    disabled,

    selectedUsers,
    handleSelectChange,
}) => {

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='h5'>Select {department.name}</Typography>
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Typography variant='h6'>Name & Role</Typography>
                                    <Typography variant='h6' color={colors.paleBlue[800]} sx={{ display: 'flex', gap: "2px" }}>
                                        {
                                            selectedUsers &&
                                            <>
                                                <Typography>
                                                    (

                                                </Typography>
                                                selected)
                                            </>
                                        }
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant='h6'>Approve</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography sx={{ ml: 1 }} variant='h6'>Verify</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography sx={{ ml: "12px" }} variant='h6'>Revise</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant='h6'>Edit</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {department.users.map((user) => (
                            <TableRow
                                key={user.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {
                                            isCreate &&
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                disabled={disabled ? disabled : false}
                                                value={user._id}
                                                name="reviewer"
                                                onChange={
                                                    ({ target: { value, checked } }) =>
                                                        handleSelectChange(
                                                            {
                                                                userId: value,
                                                                userName: user.name,
                                                                checked,
                                                                departmentId: user.department._id,
                                                                departmentName: user.department.name
                                                            }
                                                        )
                                                }
                                            />
                                        }
                                        <Typography variant='h5'>{user.name}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="left">
                                    {
                                        user.permissions.canApprove &&
                                        <Check
                                            sx={{
                                                color: colors.paleBlue[800]
                                            }}
                                        />
                                    }
                                </TableCell>
                                <TableCell align="left">
                                    {
                                        user.permissions.canVerify &&
                                        <Check
                                            sx={{
                                                color: colors.paleBlue[800]
                                            }}
                                        />
                                    }
                                </TableCell>
                                <TableCell align="left">
                                    {
                                        user.permissions.canEdit &&
                                        <Check
                                            sx={{
                                                color: colors.paleBlue[800]
                                            }}
                                        />
                                    }
                                </TableCell>
                                <TableCell align="left">
                                    {
                                        user.permissions.canPrepare &&
                                        <Check
                                            sx={{
                                                color: colors.paleBlue[800]
                                            }}
                                        />
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default SelectMemberListsTable
