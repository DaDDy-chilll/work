import { Box, Button, CircularProgress, Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import { checkoutSchema, initialValues } from '../../schemas/ApproveRemark.schema'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { toastOptions } from '../../utils/toastOptions'
import axios from 'axios'
import { documentRoute } from '../../utils/APIRoutes'
import { useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { apiSlice } from '../../services/apiSlice'

const AssignWorkFlow = ({
    isOpen,
    setClose,
    groups
}) => {

    const [loading, setLoading] = useState(false)

    const { id } = useParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleFormSubmit = async (values) => {
        const { groupId } = values

        const accessToken = Cookies.get('accessToken')

        try {
            setLoading(true)
            const { data } = await axios.post(`${documentRoute}/${id}/choose-workflow`,
                {
                    workflowId: groupId
                },
                {
                    headers: {
                        Authorization: "Bearer " + accessToken
                    }
                })

            setLoading(false)

            toast.success(data.message, toastOptions);

            dispatch(apiSlice.util.invalidateTags(["Document"]))
            dispatch(apiSlice.util.invalidateTags(["History"]))

            setClose()

            toast.success(data.message, toastOptions)

            window.location.pathname.includes("all") ? navigate(`/${id}`) :
                window.location.pathname.includes("inbox") && navigate(`/inbox/${id}`)

        } catch (err) {
            setLoading(false)
            return toast.error(err.response.data.message, toastOptions)
        }
    }

    return (
        <Dialog fullWidth
            maxWidth="lg" open={isOpen} onClose={setClose}>
            <DialogContent sx={{ p: 5 }}>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue
                    }) => (
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Typography variant='h4' fontWeight="bold" mb={2}>Please select a work flow</Typography>
                            <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "space-evenly", gap: "20px", mt: 5 }}>

                                {/* SELECT REVIEWER GROUP */}
                                <FormControl variant="filled" sx={{ gridColumn: "span 4" }}>
                                    <InputLabel id="demo-simple-select-filled-label">
                                        Select Work Flow
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={values.groupId}
                                        name="groupId"
                                        error={!!touched.groupId && !!errors.groupId}
                                        helpertext={touched.groupId && errors.groupId}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    >
                                        {groups && groups.map((group, i) => (
                                            <MenuItem sx={{ textTransform: "capitalize" }} value={group._id} key={i}>
                                                {group.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Box display="flex" justifyContent="flex-end" gap="10px">
                                    <Button
                                        sx={{ width: "200px" }}
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        disabled={loading ? true : false}
                                    >
                                        {loading ? <CircularProgress size="20px" /> : "Add"}
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog >
    )
}

export default AssignWorkFlow
