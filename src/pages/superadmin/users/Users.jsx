import { Box, Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

// icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDisclosure } from '../../../hooks/dialog';
import { getColumns } from '../../../columns/User.columns';
import DataTable from '../../../components/tables/DataTable';
import PageTitle from '../../../components/mains/PageTitle';
import CreateUser from './CreateUser';
import { userRoute } from '../../../utils/APIRoutes';
import Cookies from 'js-cookie';
import axios from 'axios';

const Users = () => {

  const { isOpen, setOpen, setClose } = useDisclosure()

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

      const { data } = await axios.get(`${userRoute}?page=${pageState.page}&limit=${pageState.pageSize}&sort=-createdAt`, {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      })

      setPageState(old => ({ ...old, isLoading: false, data: data.payload, total: data.total }))
    }
    fetchData()
  }, [pageState.page, pageState.pageSize])

  // const { isLoading, data, error } = useGetUsersQuery(paginationModel.page + 1)

  const columns = getColumns()

  // let content;

  // if (error) {
  //   toast.error(error.data.message, toastOptions)
  // } else {
  //   content =

  // }

  return (
    <Box>
      <PageTitle title={"Users"} />

      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Button
          className="no-underline"
          variant="contained"
          color="primary"
          onClick={setOpen}
        >
          Create New User <AddOutlinedIcon sx={{ ml: "5px" }} />
        </Button>
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

      <CreateUser setClose={setClose} isOpen={isOpen} />
    </Box>
  )
}

export default Users
