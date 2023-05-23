import { Info } from '@mui/icons-material'
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { colors } from '../../utils/theme'
import { useDisclosure } from '../../hooks/dialog'
import SelectMemberListsTable from '../tables/SelectMemberListsTable'
import { useGetBOMsQuery, useGetClinicalAdminsQuery, useGetFADsQuery } from '../../services/userSlice'
import { toast } from 'react-toastify'
import { toastOptions } from '../../utils/toastOptions'

const GroupActionBtn = ({ row }) => {

    const { isOpen, setOpen, setClose } = useDisclosure()

    // fetch clinical admins
    const { data: clinicalAdmins, error: clinicalAdminsError } = useGetClinicalAdminsQuery()
    const { data: BOMs, error: BOMsError } = useGetBOMsQuery()
    const { data: FADs, error: FADsError } = useGetFADsQuery()

    if (clinicalAdminsError || BOMsError || FADsError) {
        toast.error(clinicalAdminsError.data.message, toastOptions)
    }

    return (
        <>
            <Button variant="contained" color="primary" onClick={setOpen}>
                View
            </Button>
            <Dialog maxWidth={"lg"} open={isOpen} onClose={setClose}>
                <DialogTitle variant='h2' fontWeight='bold' sx={{ mb: "5px", textTransform: 'uppercase' }}>
                    {row.name}
                </DialogTitle>
                <DialogContent>
                    {/* select clinical admins */}
                    {
                        clinicalAdmins &&
                        <>
                            <Box sx={{ gridColumn: "span 4", mb: 2 }}>
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
                                    disabled={true}
                                    department={"CLINICAL_ADMIN"}
                                    users={clinicalAdmins.payload}
                                />
                            </Box>
                        </>
                    }
                    {/* select BOMs */}
                    {
                        BOMs &&
                        <>
                            <Box sx={{ gridColumn: "span 4", mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant='h5'>BOMs</Typography>
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
                                    disabled={true}
                                    department={"BOM"}
                                    users={BOMs.payload}
                                />
                            </Box>
                        </>
                    }
                    {/* select FADs */}
                    {
                        FADs &&
                        <>
                            <Box sx={{ gridColumn: "span 4", mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant='h5'>FADs</Typography>
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
                                    disabled={true}
                                    department={"FAD"}
                                    users={FADs.payload}
                                />
                            </Box>
                        </>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default GroupActionBtn
