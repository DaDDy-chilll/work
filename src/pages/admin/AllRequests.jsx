import { Box } from '@mui/material'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useGetAllRequestsQuery } from '../../services/documentSlice'
import { getColumns } from '../../columns/Document.columns'
import { toastOptions } from '../../utils/toastOptions'
import DataTable from '../../components/tables/DataTable'
import PageTitle from '../../components/mains/PageTitle'
import SelectCaseType from '../../components/form_controls/SelectCaseType'

const AllRequests = () => {

  const [documentCase, setDocumentCase] = useState()

  const handleChange = async (value) => {
    setDocumentCase(value)
  }

  const { isLoading, data, error } = useGetAllRequestsQuery(
    documentCase === "OPEN" ? "open" :
    documentCase === "CLOSED" ? "closed" : null
  )

  const columns = getColumns()

  let content;

  if (error) {
    toast.error(error.data.message, toastOptions)
  } else {
    content = <DataTable loading={isLoading} rows={data && data.payload} columns={columns} total={data && data.total} />
  }

  return (
    <Box mt="20px">

      <PageTitle title={"All Requests"} />

      <Box sx={{ display: "flex", justifyContent: "right", gap: 2 }}>

        <SelectCaseType documentCase={documentCase} handleChange={handleChange} />
        
      </Box>

      <ToastContainer />

      {content}

    </Box>
  )
}

export default AllRequests
