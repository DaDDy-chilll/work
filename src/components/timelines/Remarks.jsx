import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useState } from 'react';

import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { colors } from '../../utils/theme';
import { ApartmentOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { documentRoute } from '../../utils/APIRoutes';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { toastOptions } from '../../utils/toastOptions';
import { changeTextColor } from '../../helpers';

const Item = ({ remark, revisions, me, scrollToRef, handleAcknowledge, btnLoading }) => {

    const { id } = useParams()  

    const textColor = changeTextColor({ action: remark.action })   

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Typography
                    sx={{ textTransform: "capitalize" }}
                    variant="h5"
                    fontWeight="bold"
                    color={textColor && textColor}
                    component="span"
                >
                    {remark.action} by {remark.actor.name}
                </Typography>
                <Box
                    sx={{
                        border: `0.3px solid ${colors.grey[500]}`,
                        px: 1,
                        py: "3px",
                        borderRadius: "50px",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >
                    <ApartmentOutlined fontSize='small' />
                    <Typography variant='h6'>

                        {remark.actor.department.name}
                    </Typography>
                </Box>
            </Box>
            {/* <Typography variant='h5'>{convert(remark.content).replace(/<[^>]+>/g, '')}</Typography> */}
            <div dangerouslySetInnerHTML={{ __html: remark.content }} />
            {
                remark.action === "REVISED" &&
                revisions && me &&
                revisions.acknowledgements
                    .filter((acknowledgement) => (acknowledgement.user === me.payload._id)).length ?

                <>
                    <Box ref={scrollToRef} sx={{ display: "flex", alignItems: "center", gap: "10px", mt: 1 }}>
                        {
                            revisions.acknowledgements
                                .filter((acknowledgement) => {
                                    if (acknowledgement.user === me.payload._id && acknowledgement.hasAcknowledged === false) return acknowledgement                                            
                                }).length ?

                            <Button
                                variant='contained'
                                color='primary'
                                size='small'
                                sx={{ borderRadius: "10px" }}
                                onClick={() => handleAcknowledge({ documentId: id, revisionId: revisions._id })}
                                disabled={btnLoading ? true : false}
                            >                                    
                                {btnLoading ? <CircularProgress size="20px" /> : "Acknowledge"}
                            </Button> : <></>
                        }
                        <TimelineDot sx={{ padding: "1px" }} />
                        <Typography variant='h6'>
                            {
                                revisions.acknowledgements
                                    .filter((acknowledgement) => {
                                        if (acknowledgement.hasAcknowledged === true) return acknowledgement                                                
                                    }).length
                            }
                            /
                            {
                                revisions.acknowledgements.length
                            }
                            persons acknowledged
                        </Typography>
                    </Box>
                </> : <></>
            }
        </>
    )
}

const Remarks = ({ remarks, revisions, me, scrollToRef }) => {  

    const accessToken = Cookies.get("accessToken")

    const [btnLoading, setBtnLoading] = useState(false)
    
    const handleAcknowledge = async ({ documentId, revisionId }) => {
        try {
            setBtnLoading(true)

            const { data } = await axios.post(`${documentRoute}/${documentId}/revisions/${revisionId}`,
                null,
                {
                    headers: {
                        Authorization: "Bearer " + accessToken
                    }
                })

            setBtnLoading(false)

            return toast.success(data.message, toastOptions)

        } catch (err) {
            return toast.error(err.response.data.message, toastOptions)
        }
    }

    return (
        <Box>
            <Box>
                <Timeline position="right"
                    sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 0,
                        },
                    }}
                >
                    {
                        remarks &&
                        remarks.map((remark, i) => (
                            <TimelineItem key={i}>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot sx={{ px: 1 }} color="primary">
                                        {i + 1}
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '10px', px: 2 }}>
                                    <Item 
                                        remark={remark} 
                                        revisions={revisions}
                                        me={me}
                                        scrollToRef={scrollToRef}
                                        handleAcknowledge={handleAcknowledge}
                                        btnLoading={btnLoading}
                                    />
                                </TimelineContent>
                            </TimelineItem>
                        ))
                    }
                </Timeline>
            </Box>
        </Box>
    )
}

export default Remarks
