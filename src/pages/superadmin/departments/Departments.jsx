import { Box, Button } from '@mui/material'
import React from 'react'
import PageTitle from '../../../components/mains/PageTitle'
import { AddOutlined } from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import DataTable from '../../../components/tables/DataTable'
import { getColumns } from '../../../columns/Department.column'
import { toastOptions } from '../../../utils/toastOptions'
import { useGetDepartmentsQuery } from '../../../services/departmentSlice'
import { useDisclosure } from '../../../hooks/dialog'
import CreateDepartment from './CreateDepartment'

const Departments = () => {
  const { setOpen, setClose, isOpen } = useDisclosure()

  // fetch groups
  const { isLoading, data, error } = useGetDepartmentsQuery()

  const columns = getColumns()

  let dataTable;

  if (error) {
    toast.error(error.data.message, toastOptions)
  } else {
    dataTable = <DataTable loading={isLoading} rows={data && data.payload} columns={columns} />
  }

  return (
    <Box>
      <PageTitle title={"Departments"} />

      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Button
          className="no-underline"
          variant="contained"
          color="primary"
          onClick={setOpen}
        >
          Create New Department <AddOutlined sx={{ ml: "5px" }} />
        </Button>
      </Box>

      <ToastContainer />

      {dataTable}

      <CreateDepartment setClose={setClose} isOpen={isOpen} />

    </Box>
  )
}

export default Departments