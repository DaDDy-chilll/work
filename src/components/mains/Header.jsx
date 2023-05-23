import { Box, Typography } from '@mui/material'
import React from 'react'
import { colors } from '../../utils/theme'

const Header = ({ title }) => {
    return (
        <Box mb='20px'>
            <Typography variant="h1" color={colors.grey[600]} fontWeight='bold' sx={{ mb: "5px", textTransform: 'uppercase' }}>{title}</Typography>
        </Box>
    )
}

export default Header
