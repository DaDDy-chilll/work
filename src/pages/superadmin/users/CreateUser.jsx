import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { authRoute } from '../../../utils/APIRoutes';
import { toastOptions } from '../../../utils/toastOptions';
import UserForm from '../../../forms/UserForm';
import { initialCreateValues } from '../../../schemas/User.schema';
import { apiSlice } from '../../../services/apiSlice';
import { useDispatch } from 'react-redux';
import { useGetDepartmentsQuery } from '../../../services/departmentSlice';
import Loading from '../../../components/mains/Loading';

const CreateUser = ({ setClose, isOpen }) => {

  const accessToken = Cookies.get('accessToken')

  const [btnLoading, setBtnLoading] = useState(false)

  const dispatch = useDispatch()

  const { isLoading, data, error } = useGetDepartmentsQuery()

  if (error) {
    toast.error(error.data.message, toastOptions)
  }

  const handleFormSubmit = async (values) => {

    const {
      name, email, password, jobLabel, department,
      canApprove, canEdit, canPrepare, canVerify
    } =
      values;

    try {
      setBtnLoading(true)
      const { data } = await axios.post(`${authRoute}/register`,
        {
          name, email, password, jobLabel,
          department,
          permissions: {
            canApprove, canEdit, canPrepare, canVerify
          },
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken
          }
        }
      );

      setBtnLoading(false)

      setClose()

      toast.success(data.message, toastOptions);

      dispatch(apiSlice.util.invalidateTags(["User"]))

    } catch (err) {
      setBtnLoading(false)
      return toast.error(err.response.data.message, toastOptions);
    }

  }

  return (
    <Dialog open={isOpen} onClose={setClose}>
      <DialogTitle
        variant='h2'
        fontWeight='bold' 
        sx={{ mb: "5px", textTransform: 'uppercase' }}
      >
        Create New User
      </DialogTitle>
      <DialogContent>
        {
          isLoading ? <Loading /> :
          <UserForm 
          btnLoading={btnLoading} 
          handleFormSubmit={handleFormSubmit} 
          setClose={setClose} 
          loading={false} 
          initialValues={initialCreateValues} 
          isEdit={false}
          departments={data && data.payload}
        />
        }
      </DialogContent>
    </Dialog>
  )
}

export default CreateUser
