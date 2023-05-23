import { Dialog, DialogContent } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios';
import Cookies from 'js-cookie';
import ActionForm from '../../forms/ActionForm';
import { documentRoute } from '../../utils/APIRoutes';
import { toastOptions } from '../../utils/toastOptions';
import { toast } from 'react-toastify';

const AddAction = ({ setClose, isOpen, groups, reviewer }) => {

    const departments = [
        "OFFICE_ADMIN",
        "COO",
        "BOM",
        "FAD"
    ]

    const accessToken = Cookies.get('accessToken')

    const [loading, setLoading] = useState(false)

    const { id } = useParams()

    const [selected, setSelected] = useState()

    const handleFormSubmit = async (values) => {

        const { remark, groupId, department } = values

        const approveRoute = "actions/approve"
        const rejectRoute = "reject"
        const verifyRoute = "actions/verify"
        const prepareRoute = "actions/prepare"
        const commentRoute = "actions/comment"
        const requestRevisionRoute = "revisions"

        try {
            setLoading(true)
            const { data } = await axios.post(`${documentRoute}/${id}/${selected === "approve" ? approveRoute :
                    selected === "reject" ? rejectRoute :
                    selected === "verify" ? verifyRoute :
                    selected === "prepare" ? prepareRoute :
                    selected === "comment" ? commentRoute :
                    selected === "revision" && requestRevisionRoute
                }`,
                {
                    remark,
                    groupId,
                    department
                },
                {
                    headers: {
                        Authorization: "Bearer " + accessToken
                    }
                })

            setLoading(false)

            setClose()

            return toast.success(data.message, toastOptions)

        } catch (err) {
            setLoading(false)
            return toast.error(err.response.data.message, toastOptions)
        }
    }

    return (
        <Dialog fullWidth
            maxWidth="lg" open={isOpen} onClose={setClose}>
            <DialogContent sx={{ p: 5 }}>
                <ActionForm
                    handleFormSubmit={handleFormSubmit}
                    selected={selected}
                    setSelected={setSelected}
                    groups={groups}
                    loading={loading}
                    reviewer={reviewer}
                    existingDepartments={departments}
                />
            </DialogContent>
        </Dialog >
    )
}

export default AddAction
