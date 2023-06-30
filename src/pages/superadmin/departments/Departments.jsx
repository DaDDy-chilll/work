import { Box, Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/mains/PageTitle'
import { AddOutlined } from '@mui/icons-material'
import { ToastContainer } from 'react-toastify'
import DataTable from '../../../components/tables/DataTable'
import { getColumns } from '../../../columns/Department.column'
// import { useGetDepartmentsQuery } from '../../../services/departmentSlice'
import { useDisclosure } from '../../../hooks/dialog'
import CreateDepartment from './CreateDepartment'
import Cookies from 'js-cookie'
import axios from 'axios'
import { departmentRoute } from '../../../utils/APIRoutes'

const Departments = () => {
  const { setOpen, setClose, isOpen } = useDisclosure()

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

      const { data } = await axios.get(`${departmentRoute}?page=${pageState.page}&limit=${pageState.pageSize}&sort=+createdAt`, {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      })

      setPageState(old => ({ ...old, isLoading: false, data: data.payload, total: data.total }))
    }
    fetchData()
  }, [pageState.page, pageState.pageSize])

  // fetch groups
  // const { isLoading, data, error } = useGetDepartmentsQuery()

  const columns = getColumns()

  // let dataTable;

  // if (error) {
  //   toast.error(error.data.message, toastOptions)
  // } else {
  //   dataTable = <DataTable loading={isLoading} rows={data && data.payload} columns={columns} total={data && data.total} />
  // } 

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

      <CreateDepartment setClose={setClose} isOpen={isOpen} />

    </Box>
  )
}

export default Departments