import { Box, Button } from '@mui/material'
import React from 'react'
import PageTitle from '../../../components/mains/PageTitle'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import DepartmentFlowForm from '../../../forms/DepartmentFlowForm'
import { colors } from '../../../utils/theme'

const CreateDepartmentFlow = () => {
  return (
    <Box>
      <PageTitle title="Create Form" />

      <Box sx={{ display: "flex", justifyContent: "right", mb: "20px", mx: "20px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            className="no-underline"
            variant="contained"
            color="primary"
          >
            Back
          </Button>
        </Link>
      </Box>

      <ToastContainer />

      <Box bgcolor={colors.white[100]} m="20px" p="20px" borderRadius="10px">
        <DepartmentFlowForm />
      </Box>
    </Box>
  )
}

export default CreateDepartmentFlow
