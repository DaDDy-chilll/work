import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = ({ open }) => {
    return (
        <Backdrop
            sx={{ position: 'fixed', inset: 0 }}            
            open={open}
        >
            <CircularProgress size={"50px"} color="primary" />
        </Backdrop>
    )
}

export default Loading
