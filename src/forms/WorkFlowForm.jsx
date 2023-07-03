import { Box, Button, CircularProgress } from '@mui/material'
import React from 'react'
import { userRoute } from '../utils/APIRoutes'
import axios from 'axios'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useState } from 'react'
import DepartmentLists from '../components/details/DepartmentLists'
import { toast } from 'react-toastify'
import { toastOptions } from '../utils/toastOptions'

const WorkFlowForm = ({
    selectDepartments,
    setClose,
    handleSelectChange,
    selectedUsers,
    departments,
    btnLoading
}) => {

    const [payloads, setPayloads] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const accessToken = Cookies.get("accessToken")
        async function fetchData() {
            try {
                setIsLoading(true)
                for (let i = 0; i < selectDepartments.length; i++) {
                    const { data } = await axios.get(`${userRoute}?department=${selectDepartments[i]._id}`, {
                        headers: {
                            "Authorization": "Bearer " + accessToken
                        }
                    })
                    data && setPayloads((prev) => ([
                        ...prev,
                        ...data.payload
                        // {
                        //     departmentName: data.payload[0].department.name,
                        //     users: data.payload
                        // }
                    ]))
                }
                setIsLoading(false)

            } catch (err) {
                return toast.error(err.response.data.message, toastOptions)
            }
        }
        fetchData()
    }, [selectDepartments])

    return (
        <Box>
            <DepartmentLists
                departments={departments}
                handleSelectChange={handleSelectChange}
                isLoading={isLoading}
                payloads={payloads}
                selectedUsers={selectedUsers}
            />
            <Box display="flex" justifyContent="end" gap="10px" mt="40px">
                <Button
                    sx={{ width: "200px" }}
                    type="button"
                    color="primary"
                    variant="outlined"
                    onClick={setClose}
                >
                    Back
                </Button>
                <Button
                    sx={{ width: "200px" }}
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={btnLoading ? true : false}
                >
                    {btnLoading ? <CircularProgress size="20px" /> : "Create"}
                </Button>
            </Box>
        </Box>
    )
}

export default WorkFlowForm
