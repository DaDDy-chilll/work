import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import DepartmentForm from '../../../forms/DepartmentForm'
import { checkoutSchema, initialValues } from '../../../schemas/department.schema'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../utils/toastOptions'
import { apiSlice } from '../../../services/apiSlice'
import { useDispatch } from 'react-redux'
import { useAddDepartmentMutation } from '../../../services/departmentSlice'

const CreateDepartment = ({ setClose, isOpen }) => {

    const dispatch = useDispatch()

    const [addDepartment, { isLoading }] = useAddDepartmentMutation()

    const handleFormSubmit = async (values) => {
        const { name, isAuthorized } = values

        try {
            const data = await addDepartment({
                name, type: isAuthorized ? "authorized" : ""
            }).unwrap();

            setClose()

            toast.success(data.message, toastOptions);

            return dispatch(apiSlice.util.invalidateTags(["Department"]))

        } catch (err) {
            return toast.error(err.data.message, toastOptions);
        }
    }

    return (
        <Dialog maxWidth={"lg"} open={isOpen} onClose={setClose}>
            <DialogTitle variant='h2' fontWeight='bold' sx={{ mb: "5px", textTransform: 'uppercase' }}>Create New Department</DialogTitle>
            <DialogContent>
                <DepartmentForm
                    handleFormSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    checkoutSchema={checkoutSchema}
                    setClose={setClose}
                    btnLoading={isLoading}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreateDepartment