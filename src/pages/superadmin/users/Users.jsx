import { Box, Button } from '@mui/material'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'

// icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDisclosure } from '../../../hooks/dialog';
import { useGetUsersQuery } from '../../../services/userSlice';
import { getColumns } from '../../../columns/User.columns';
import { toastOptions } from '../../../utils/toastOptions';
import DataTable from '../../../components/tables/DataTable';
import PageTitle from '../../../components/mains/PageTitle';
import CreateUser from './CreateUser';

const Users = () => {

  const { isOpen, setOpen, setClose } = useDisclosure()

  const { isLoading, data, error } = useGetUsersQuery(1)

  const columns = getColumns()

  let content;

  if(error){
    toast.error(error.data.message, toastOptions)
  } else {
    content = <DataTable loading={isLoading} rows={data && data.payload} columns={columns} total={data && data.total} /> 
  }

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

      {content}

      <CreateUser setClose={setClose} isOpen={isOpen} />
    </Box>
  )
}

export default Users
