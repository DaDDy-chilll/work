import { History } from '@mui/icons-material'
import { Box, Divider, ScopedCssBaseline, Typography } from '@mui/material'
import React from 'react'

import PDF from "../../assets/PDF.png"
import { colors } from '../../utils/theme'
import FormStatus from '../timelines/FormStatus'
import Remarks from '../timelines/Remarks'

const DocumentDetail = ({ document, remarks, revisions, me, scrollToRef }) => {

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant='h3' fontWeight="bold">{document.updatedAt.split("T")[0]}</Typography>
                <Box sx={{ display: "flex", justifyContent: "center", color: colors.paleBlue[800] }}>
                    <History />
                    <Typography>
                        Form History
                    </Typography>
                </Box>                
            </Box>
            <Divider />

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", mt: 2 }}>
                <Typography variant='h4' fontWeight="bold">Document Id</Typography>
                <Typography variant='h5'>{document.documentId}</Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", mt: 2 }}>
                <Typography variant='h4' fontWeight="bold">Name</Typography>
                <Typography variant='h5'>{document.name}</Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", my: 2 }}>
                <Typography variant='h4' fontWeight="bold">Description</Typography>
                {/* <Typography variant='h5'>{document.description.replace(/<[^>]+>/g, '')}</Typography> */}
                <div dangerouslySetInnerHTML={{ __html: document.description }} />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", my: 2 }}>
                <Typography variant='h4' fontWeight="bold">Payment Type</Typography>
                <Typography variant='h5'>{document.type}</Typography>
            </Box>

            <Typography variant='h4' mr={1} display="inline" fontWeight="bold">Total: </Typography> {document.amount} MMK

            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", my: 2 }}>
                <Typography variant='h4' fontWeight="bold">Attachments</Typography>
                <Box sx={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                    {
                        document.attachments.length ?
                        document.attachments.map((attachment, i) => (
                                <Box key={i} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                                    {
                                        attachment.mimetype.includes("image") ?
                                            (
                                                <a href={attachment.url}>
                                                    <img
                                                        style={{ width: "145px", height: "145px", objectFit: "cover" }}
                                                        src={attachment.url}
                                                        alt={attachment.key}
                                                    />
                                                </a>
                                            ) : (
                                                <a href={attachment.url}>
                                                    <img
                                                        style={{ width: "145px", height: "145px", objectFit: "cover" }}
                                                        src={PDF}
                                                        alt={attachment.key}
                                                    />
                                                </a>
                                            )
                                    }
                                    <Typography variant='h5' fontWeight="bold">{attachment.key}</Typography>
                                </Box>
                            ))
                            : <></>
                    }
                </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", mt: 4 }}>
                <Typography variant='h4' fontWeight="bold">Form Status</Typography>
                <FormStatus reviewers={document.reviewers.list} />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", mt: 4 }}>
                <Typography variant='h4' fontWeight="bold">Other Remarks</Typography>
                <Remarks remarks={remarks} revisions={revisions} me={me} scrollToRef={scrollToRef} />
            </Box>            
        </>
    )
}

export default DocumentDetail
