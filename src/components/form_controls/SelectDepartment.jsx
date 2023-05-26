import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import { colors } from '../../utils/theme'
import { ApartmentOutlined, CheckCircle } from '@mui/icons-material'
import { useGetDepartmentsQuery } from '../../services/departmentSlice'
import { toast } from 'react-toastify'
import { toastOptions } from '../../utils/toastOptions'

import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const Item = ({ department }) => {

    return (
        <Typography
            sx={{ textTransform: "capitalize" }}
            variant="h5"
            fontWeight="bold"
            component="span"
        >
            {department.name}
        </Typography>
    )
}

const SelectDepartment = ({
    selectDepartments,
    handleDepartmentChange
}) => {

    const { isLoading, data, error } = useGetDepartmentsQuery()

    if (error) {
        toast.error(error.data.message, toastOptions)
    }   

    return (
        <Box sx={{ gridColumn: "span 4" }}>
            <Typography variant='h5'>Select Department Flow</Typography>

            <Box sx={{ display: 'flex', gap: 5 }}>
                <Box sx={{
                    bgcolor: colors.white[200],
                    width: "50%",
                    borderRadius: "10px",
                    p: 2,
                    boxShadow: 1,
                    borderBottom: `1px solid ${colors.grey[500]}`,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        borderBottom: `0.2px solid ${colors.grey[500]}`,
                        mb: 2,
                        pb: 2
                    }}>
                        <Box sx={{
                            backgroundColor: colors.bgColor,
                            py: "3px",
                            px: "4px",
                            borderRadius: "50%"
                        }}>
                            <ApartmentOutlined
                                sx={{
                                    color: colors.paleBlue[800],
                                    fontSize: "25px"
                                }}
                            />
                        </Box>
                        <Typography variant='h5'>Department Lists</Typography>
                    </Box>

                    {
                        data && data.payload.map((department) => (
                            <Box key={department._id} sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <Checkbox
                                    name={department._id}
                                    value={department.name}
                                    onChange={handleDepartmentChange}
                                />
                                <Typography variant='h5'>{department.name}</Typography>
                            </Box>
                        ))
                    }

                </Box>
                <Box sx={{
                    bgcolor: colors.white[200],
                    width: "50%",
                    borderRadius: "10px",
                    p: 2,
                    boxShadow: 1,
                    borderBottom: `1px solid ${colors.grey[500]}`,
                }}>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        borderBottom: `0.2px solid ${colors.grey[500]}`,
                        mb: 2,
                        pb: 2
                    }}>
                        <Box sx={{
                            backgroundColor: colors.bgColor,
                            py: "3px",
                            px: "4px",
                            borderRadius: "50%"
                        }}>
                            <ApartmentOutlined
                                sx={{
                                    color: colors.paleBlue[800],
                                    fontSize: "25px"
                                }}
                            />
                        </Box>
                        <Typography variant='h5'>Department Order</Typography>
                    </Box>

                    <Timeline position="right"
                        sx={{
                            [`& .${timelineItemClasses.root}:before`]: {
                                flex: 0,
                                padding: 0,
                            },
                        }}
                    >
                        {
                            selectDepartments &&
                            selectDepartments.map((department, i) => (
                                <TimelineItem key={i}>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot sx={{ px: 1 }} color="primary">
                                            {i + 1}
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ py: 3, px: 2 }}>
                                        <Item 
                                            department={department}
                                        />
                                    </TimelineContent>
                                </TimelineItem>
                            ))
                        }
                    </Timeline>
                </Box>
            </Box>
        </Box>
    )
}

export default SelectDepartment
