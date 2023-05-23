import { ArrowBackOutlined } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Box>        
        <Typography variant="h1" mb="20px">
          The page you’re looking for doesn’t exist.
        </Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button color='primary' mb="20px" variant="contained">
            <ArrowBackOutlined sx={{ mr: "5px" }} /> Back To Dashboard
          </Button>
        </Link>
      </Box>
      <Box>
        <img
          src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
          alt=""
          width={500} height={250}
        />
      </Box>
    </Box>
  )
}

export default NotFound