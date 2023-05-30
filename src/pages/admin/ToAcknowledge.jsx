import React, { useState } from 'react'
import { useGetToAcknowledgeDocumentsQuery } from '../../services/documentSlice';
import { getColumns } from '../../columns/Document.columns';
import { ToastContainer, toast } from 'react-toastify';
import DataTable from '../../components/tables/DataTable';
import { toastOptions } from '../../utils/toastOptions';
import { Box } from '@mui/material';
import PageTitle from '../../components/mains/PageTitle';
import SelectCaseType from '../../components/form_controls/SelectCaseType';

const ToAcknowledge = () => {
  const [documentCase, setDocumentCase] = useState()

  const handleChange = async (value) => {
    setDocumentCase(value)    
  }

  const { isLoading, data, error } = useGetToAcknowledgeDocumentsQuery(
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

      <PageTitle title={"Requests"} />

      <Box sx={{ display: "flex", justifyContent: "right", gap: 2 }}>

        <SelectCaseType documentCase={documentCase} handleChange={handleChange} />

      </Box>

      <ToastContainer />

      {content}

    </Box>
  )
}

export default ToAcknowledge
