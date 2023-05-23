import React from 'react'
import "./ErrorPage.css"
import { Box, Button, Typography } from '@mui/material'
import { colors } from '../utils/theme'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowBackOutlined } from '@mui/icons-material'

const ErrorPage = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
    window.location.reload(true)
  }

  return (
    <main style={{ backgroundColor: colors.bgColor }}>
      <Box id="wrap">
        <Box class="hand hand-left">
          <span class='hand-part part-top'></span>
          <span class='hand-part part-middle'></span>
          <span class='hand-part part-bottom'></span>
        </Box>
        <Box class="hand hand-right">
          <span class='hand-part part-top'></span>
          <span class='hand-part part-middle'></span>
          <span class='hand-part part-bottom'></span>
        </Box>
        <Box class='line line-1'>
          <Box class="ball">.</Box>
        </Box>
        <Box class='line line-2'>
          <Box class="ball">.</Box>
        </Box>
        <Box class='line line-3'>
          <Box class="ball">.</Box>
        </Box>
        <Box id="server">
          <Box class="eye eye-left"><span></span></Box>
          <Box class="eye eye-right"><span></span></Box>
          <Box class="block">
            <Box class="light"></Box>
          </Box>
          <Box class="block">
            <Box class="light"></Box>
          </Box>
          <Box class="block">
            <Box class="light"></Box>
          </Box>
          <Box class="block">
            <Box class="light"></Box>
          </Box>
          <Box class="block">
            <Box class="light"></Box>
          </Box>
          <Box id="bottom-block">
            <Box class="bottom-line"></Box>
            <Box id="bottom-light"></Box>
          </Box>
        </Box>
      </Box>

      <Box id="code-error">
        <Typography variant='h1'>Something Went Wrong!</Typography>
        <Typography variant='h6' color={colors.red[800]}>Please refresh your browser. If the error continues, please contact our support team.</Typography>
      </Box>

      <Button color='primary' mb="20px" variant="contained" onClick={handleClick} sx={{ mt: 2 }}>
        <ArrowBackOutlined sx={{ mr: "5px" }} /> Back To Dashboard
      </Button>

    </main>
  )
}

export default ErrorPage
