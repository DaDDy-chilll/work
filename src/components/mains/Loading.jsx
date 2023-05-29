import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = ({ open }) => {
    return (
        <Backdrop          
            open={open}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <CircularProgress size={"50px"} color="primary" />
        </Backdrop>
    )
}

export default Loading
