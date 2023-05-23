import { Box, Checkbox, FormControlLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

import { colors } from "../../utils/theme";

const SelectMemberListsTable = ({
    users,
    department,
    disabled,

    selectedUsers,
    handleSelectChange,
}) => {

    return (
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
                                                {
                                                    selectedUsers.filter(selectedUser => selectedUser.department === department).length
                                                }
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
                    {users.map((user) => (
                        <TableRow
                            key={user.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        disabled={disabled ? disabled : false}
                                        // checked={true}
                                        value={user._id}
                                        name="reviewer"
                                        onChange={({ target: { value, checked } }) => handleSelectChange({ reviewer: value, checked, department: user.department })}
                                    />
                                    <Typography variant='h5'>{user.name}</Typography>
                                </Box>
                            </TableCell>
                            {
                                // selectedUsers.filter(selectedUser => selectedUser.reviewer === user._id).length !== 0 &&
                                <>
                                    <TableCell align="center">
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            value={user._id}
                                            name="canApprove"

                                            checked={user.permissions.canApprove}
                                            disabled={true}
                                        // onChange={({ target: { checked } }) => handleApproveClick({ reviewer: user._id, checked, department: user.department })}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            name="canVerify"
                                            value={user._id}

                                            checked={user.permissions.canVerify}
                                            disabled={true}
                                        // onChange={({ target: { checked } }) => handleVerifyClick({ reviewer: user._id, checked, department: user.department })}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            name="canEdit"
                                            value={user._id}

                                            checked={user.permissions.canEdit}
                                            disabled={true}
                                        // onChange={({ target: { checked } }) => handleEditClick({ reviewer: user._id, checked, department: user.department })}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            name="canPrepare"
                                            value={user._id}

                                            checked={user.permissions.canPrepare}
                                            disabled={true}
                                        // onChange={({ target: { checked } }) => handlePrepareClick({ reviewer: user._id, checked, department: user.department })}
                                        />
                                    </TableCell>
                                </>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SelectMemberListsTable
