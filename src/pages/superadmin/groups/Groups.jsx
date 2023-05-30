import { Box, Button } from '@mui/material'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'

// icons
import { AddOutlined } from '@mui/icons-material'
import { useDisclosure } from '../../../hooks/dialog'
import { useGetGroupsQuery } from '../../../services/groupSlice'
import { toastOptions } from '../../../utils/toastOptions'
import DataTable from '../../../components/tables/DataTable'
import PageTitle from '../../../components/mains/PageTitle'
import { getColumns } from '../../../columns/Group.columns'
import { Link } from 'react-router-dom'

const Groups = () => {

  const { setOpen } = useDisclosure()

  // fetch groups
  const { isLoading: groupsLoading, data: groupsData, error: groupsError } = useGetGroupsQuery()

  const columns = getColumns()

  let dataTable;

  if (groupsError) {
    toast.error(groupsError.data.message, toastOptions)
  } else {
    dataTable = <DataTable loading={groupsLoading} rows={groupsData && groupsData.payload} columns={columns} total={groupsData && groupsData.total} />
  }

  return (
    <Box>
      <PageTitle title={"Work Flows"} />

      <Box sx={{ display: "flex", justifyContent: "right" }}>

        <Link to="/work-flows/create" style={{ textDecoration: "none" }}>
          <Button
            className="no-underline"
            variant="contained"
            color="primary"
            onClick={setOpen}
          >
            Create New Work Flow <AddOutlined sx={{ ml: "5px" }} />
          </Button>
        </Link>

      </Box>

      <ToastContainer />

      {dataTable}

    </Box>
  )
}

export default Groups
