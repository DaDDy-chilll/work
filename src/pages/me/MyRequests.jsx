import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useGetMyRequestsQuery } from '../../services/documentSlice'
import { getColumns } from '../../columns/Document.columns'
import { toastOptions } from '../../utils/toastOptions'
import DataTable from '../../components/tables/DataTable'
import PageTitle from '../../components/mains/PageTitle'
import SelectCaseType from '../../components/form_controls/SelectCaseType'

const MyRequests = () => {

  const [documentCase, setDocumentCase] = useState()

  const handleChange = async (value) => {
    setDocumentCase(value)    
  }

  const { isLoading, data, error } = useGetMyRequestsQuery(
    documentCase === "OPEN" ? "open" :
    documentCase === "CLOSED" ? "closed" : null
  )

  const columns = getColumns()

  let content;

  if (error) {
    toast.error(error.data.message, toastOptions)
  } else {
    content = <DataTable loading={isLoading} rows={data && data.payload} columns={columns} />
  }

  return (
    <Box>
      <PageTitle title={"My Requests"} />

      <Box sx={{ display: "flex", justifyContent: "right", gap: 2 }}>

        <SelectCaseType documentCase={documentCase} handleChange={handleChange} />

        <Link to="/create" style={{ textDecoration: "none" }}>
          <Button
            className="no-underline"
            variant="contained"
            color="primary"
          >
            Create New Requests
          </Button>
        </Link>
      </Box>

      <ToastContainer />

      {content}

      {/* <DataTable loading={loading} rows={requests} columns={columns} /> */}
    </Box>
  )
}

export default MyRequests
