import { Box, Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

// icons
import { AddOutlined } from '@mui/icons-material'
import { useDisclosure } from '../../../hooks/dialog'
import DataTable from '../../../components/tables/DataTable'
import PageTitle from '../../../components/mains/PageTitle'
import { getColumns } from '../../../columns/Group.columns'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import { groupRoute } from '../../../utils/APIRoutes'

const Groups = () => {

  const { setOpen } = useDisclosure()

  // fetch groups
  // const { isLoading: groupsLoading, data: groupsData, error: groupsError } = useGetGroupsQuery()

  const columns = getColumns()

  // let dataTable;

  // if (groupsError) {
  //   toast.error(groupsError.data.message, toastOptions)
  // } else {
  //   dataTable = <DataTable loading={groupsLoading} rows={groupsData && groupsData.payload} columns={columns} total={groupsData && groupsData.total} />
  // }

  const [pageState, setPageState] = useState({
    isLoading: true,
    data: undefined,
    total: 0,
    page: 1,
    pageSize: 10
  })

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    const fetchData = async () => {
      
      setPageState(old => ({ ...old, isLoading: true }))

      const { data } = await axios.get(`${groupRoute}?page=${pageState.page}&limit=${pageState.pageSize}&sort=-createdAt`, {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      })

      setPageState(old => ({ ...old, isLoading: false, data: data.payload, total: data.total }))
    }
    fetchData()
  }, [pageState.page, pageState.pageSize])

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

      {/* {dataTable} */}

      {
        pageState.data ?
          <DataTable
            rows={pageState.data}
            rowCount={pageState.total}
            loading={pageState.isLoading}
            page={pageState.page - 1}
            pageSize={pageState.pageSize}
            onPageChange={(newPage) => {
              setPageState(old => ({ ...old, page: newPage + 1 }))
            }}
            onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
            columns={columns}
          /> :
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
      }

    </Box>
  )
}

export default Groups
