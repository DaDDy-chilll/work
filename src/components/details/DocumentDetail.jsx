import { Close } from '@mui/icons-material'
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'

import PDF from "../../assets/PDF.png"
import FormStatus from '../timelines/FormStatus'
import Remarks from '../timelines/Remarks'
import { useDisclosure } from '../../hooks/dialog'

const DocumentDetail = ({ document, remarks, revisions, me, scrollToRef }) => {

    const { isOpen, setClose, setOpen } = useDisclosure()

    const [image, setImage] = useState({
        url: "",
        filename: ""
    })

    const handleClick = ({ url, filename }) => {
        setOpen()
        setImage({
            url, filename
        })
    }

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant='h3' fontWeight="bold">{document.updatedAt.split("T")[0]}</Typography>
            </Box>
            <Divider />

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", mt: 2 }}>
                <Typography variant='h4' fontWeight="bold">Document Id</Typography>
                <Typography variant='h5'>{document.documentId}</Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", mt: 2 }}>
                <Typography variant='h4' fontWeight="bold">Subject</Typography>
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
                                                <Box onClick={() => handleClick({ url: attachment.url, filename: attachment.filename })}>
                                                    <img
                                                        style={{ width: "145px", height: "145px", objectFit: "cover" }}
                                                        src={attachment.url}
                                                        alt={attachment.filename}
                                                    />
                                                </Box>
                                            ) : (
                                                <a href={attachment.url}>
                                                    <img
                                                        style={{ width: "145px", height: "145px", objectFit: "cover" }}
                                                        src={PDF}
                                                        alt={attachment.filename}
                                                    />
                                                </a>
                                            )
                                    }
                                    <Typography variant='h5' fontWeight="bold">{attachment.filename}</Typography>
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
            {/* image preview */}
            <Dialog open={isOpen} onClose={setClose}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'right' }}>
                    <IconButton onClick={setClose}>
                        <Close
                            fontSize='large'
                            sx={{ color: "#000" }}
                        />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <img
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        src={image.url}
                        alt={image.filename}
                    />
                </DialogContent>
            </Dialog >
        </>
    )
}

export default DocumentDetail
