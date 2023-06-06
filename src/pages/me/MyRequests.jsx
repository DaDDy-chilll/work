import { Box, Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useGetMyRequestsQuery } from '../../services/documentSlice'
import { getColumns } from '../../columns/Document.columns'
import { toastOptions } from '../../utils/toastOptions'
import DataTable from '../../components/tables/DataTable'
import PageTitle from '../../components/mains/PageTitle'
import SelectCaseType from '../../components/form_controls/SelectCaseType'
import Cookies from 'js-cookie'
import axios from 'axios'
import { documentRoute } from '../../utils/APIRoutes'
import Loading from '../../components/mains/Loading'

const MyRequests = () => {

  const [documentCase, setDocumentCase] = useState()

  const handleChange = async (value) => {
    setDocumentCase(value)
  }

  // const { isLoading, data, error } = useGetMyRequestsQuery(
  //   documentCase === "OPEN" ? "open" :
  //   documentCase === "CLOSED" ? "closed" : null
  // )

  const columns = getColumns()

  // let content;

  // if (error) {
  //   toast.error(error.data.message, toastOptions)
  // } else {
  //   content = <DataTable loading={isLoading} rows={data && data.payload} columns={columns} total={data && data.total} />
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

      const { data } = await axios.get(`${documentRoute}/me?page=${pageState.page}&limit=${pageState.pageSize}&sort=+createdAt`, {
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
      <PageTitle title={"My Requests"} />

      <Box sx={{ display: "flex", justifyContent: "right", gap: 2 }}>

        {/* <SelectCaseType documentCase={documentCase} handleChange={handleChange} /> */}

        <Link to="/my-requests/create" style={{ textDecoration: "none" }}>
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

      {/* {content} */}

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

      {/* <DataTable loading={loading} rows={requests} columns={columns} /> */}
    </Box>
  )
}

export default MyRequests
