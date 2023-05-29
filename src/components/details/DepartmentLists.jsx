import { Box, Typography } from '@mui/material'
import React from 'react'
import Loading from '../mains/Loading'
import SelectMemberListsTable from '../tables/SelectMemberListsTable'
import { colors } from '../../utils/theme'

const DepartmentLists = ({
    departments,
    isLoading,
    payloads,
    handleSelectChange,
    selectedUsers
}) => {

    let result

    if (!isLoading) {
        if(payloads){
            let depts = [];
        payloads.forEach(p => {
            depts.push(p.department.name)
        })

        depts = [...new Set([...depts])]

        result = depts.map(dpt => {
            const users = payloads.filter(p => p.department.name === dpt)                
            return {
                name: dpt,
                users
            }
        })
        }
    }

    return (
        <Box sx={{ gridColumn: "span 4" }}>
            <Typography variant='h5' fontWeight={"bold"}>Department Lists</Typography>

            <Box sx={{ display: 'flex', gap: 5 }}>
                {
                    departments && departments.map((department, i) => (
                        <Box
                            key={i}
                            sx={{
                                bgcolor: colors.white[200],
                                width: "30%",
                                borderRadius: "10px",
                                p: 2,
                                boxShadow: 1,
                                borderBottom: `1px solid ${colors.grey[500]}`,
                            }}>
                            <Box
                                key={department.name}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    borderBottom: `0.2px solid ${colors.grey[500]}`,
                                    mb: 2,
                                    pb: 2
                                }}
                            >
                                <Box sx={{
                                    backgroundColor: colors.paleBlue[800],
                                    py: 1,
                                    px: 2,
                                    color: colors.white[100],
                                    borderRadius: "50%"
                                }}>
                                    {i + 1}
                                </Box>
                                <Typography variant='h5'>{department.name}</Typography>
                            </Box>
                            {
                                department.users.map((user, i) => (
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Typography>{i + 1}</Typography>
                                        <Typography>{user.name}</Typography>
                                    </Box>
                                ))
                            }
                        </Box>
                    ))
                }
            </Box>

            {
                isLoading ? <Loading /> :
                    result ? result.map((department) => (
                        <Box sx={{ gridColumn: "span 4" }}>

                            <SelectMemberListsTable
                                department={department}

                                handleSelectChange={handleSelectChange}
                                selectedUsers={selectedUsers}
                                isCreate={true}
                            />

                        </Box>
                    )) :
                    departments && departments.map((department) => (
                        <Box sx={{ gridColumn: "span 4" }}>

                            <SelectMemberListsTable
                                department={department}
                                
                                handleSelectChange={handleSelectChange}
                                selectedUsers={selectedUsers}
                            />

                        </Box>
                    )) 
            }
        </Box>
    )
}

export default DepartmentLists
