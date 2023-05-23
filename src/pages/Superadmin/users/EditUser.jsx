import { Box, Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import UserForm from './UserForm'

// icons
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined"
import Cookies from 'js-cookie'
import { toastOptions } from '../../../utils/toastOptions'
import { userRoute } from '../../../utils/APIRoutes'
import PageTitle from '../../../components/mains/PageTitle'
import Header from '../../../components/mains/Header'

const EditUser = () => {
    const accessToken = Cookies.get('accessToken')

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    const handleFormSubmit = async (values) => {
        const { name, jobLabel, approvalAmount, role, approve, reject, verify, acknowledge } = values

        let permissions;

        if (role === "executive") {
            permissions = {
                executive: {
                    approve, reject, verify, acknowledge
                }
            }
        }
        if (role === "fad") {
            permissions = {
                fad: {
                    approve, reject, verify, acknowledge
                }
            }
        }

        if (role === "admin") {
            permissions = {
                admin: {
                    approve, reject, verify
                }
            }
        }
        if (role === "normal") {
            permissions = {
                normal: {
                    approve, reject, verify, acknowledge
                }
            }
        }

        try {
            const { data } = await axios.patch(`${userRoute}/${id}`,
                {
                    name, jobLabel, approvalAmount, role, permissions
                },
                {
                    headers: {
                        Authorization: "Bearer " + accessToken
                    }
                }
            );

            return toast.success(data.message, toastOptions);

        } catch (err) {

            return toast.error(err.response.data.message, toastOptions);

        }
    }

    useEffect(() => {
        const accessToken = Cookies.get('accessToken')
        const fetchData = async () => {
            
            try {
                setLoading(true)
                const { data } = await axios.get(`${userRoute}/${id}`, {
                    headers: {
                        Authorization: "Bearer " + accessToken
                    }
                })
                setUser(data.payload)
                setLoading(false)

            } catch (err) {
                setLoading(false)
                toast.error(err.response.data.message, toastOptions)
            }
            
        }
        fetchData()
    }, [id])

    let initialEditValues;

    let virtualPermissions;

    if (user) {
        const { name, email, jobLabel, approvalAmount, role, permissions } = user

        if (role === "executive") {
            const { executive } = permissions
            virtualPermissions = executive

        }
        if (role === "fad") {
            const { fad } = permissions
            virtualPermissions = fad
        }
        if (role === "admin") {
            const { admin } = permissions
            virtualPermissions = admin
        }
        if (role === "normal") {
            const { normal } = permissions
            virtualPermissions = normal
        }

        const { approve, reject, verify, acknowledge } = virtualPermissions

        initialEditValues = { name, email, password: "Test@1234", confirmPassword: "Test@1234", jobLabel, approvalAmount, role, approve, reject, verify, acknowledge };
    }

    return (
        <Box width="75%" mx="auto">
            <PageTitle title="Edit User" />
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Edit User" subtitle="Edit User" />
                <Link to="/users" style={{ textDecoration: "none" }}>
                    <Button
                        className="no-underline"
                        variant="contained"
                        color="secondary"
                    >
                        <ArrowBackOutlinedIcon sx={{ mr: "5px" }} /> View Users
                    </Button>
                </Link>
            </Box>
            <ToastContainer />

            <UserForm handleFormSubmit={handleFormSubmit} loading={loading} initialValues={initialEditValues} disabled={true} />
        </Box>
    )
}

export default EditUser
