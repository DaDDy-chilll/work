import { Box, Button } from '@mui/material'
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';

// icon
import { documentRoute } from '../../utils/APIRoutes';
import { toastOptions } from '../../utils/toastOptions';
import PageTitle from '../../components/mains/PageTitle';
import RequestForm from '../../forms/RequestForm';
import { useGetDocumentQuery } from '../../services/documentSlice';
import { colors } from '../../utils/theme';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../../services/apiSlice';

const EditRequest = ({ status, path }) => {

    const accessToken = Cookies.get('accessToken')

    const [btnLoading, setBtnLoading] = useState(false)

    const { id } = useParams()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleFormSubmit = async (values) => {

        const { attachments } = values

        const formData = new FormData();

        for (let value in values) {
            if (value === 'attachments') {
                continue;
            }
            formData.append(value, values[value]);
        }

        // formData.append("adminReviewers", JSON.stringify(adminReviewers))

        for (let i = 0; i < attachments.length; i++) {
            const attachment = attachments[i];
            formData.append("attachments", attachment)
        }

        if (status === "PREPARED") {
            try {
                setBtnLoading(true)
                const { data } = await axios.post(`${documentRoute}/${id}/actions/prepare`,
                    formData,
                    {
                        headers: {
                            Authorization: "Bearer " + accessToken
                        }
                    }
                );
                setBtnLoading(false)

                toast.success(data.message, toastOptions);

                dispatch(apiSlice.util.invalidateTags(["Document"]))

                navigate(`/all/${id}`)

            } catch (err) {
                setBtnLoading(false)
                return toast.error(err.response.data.message, toastOptions);
            }
        }

        if (status === "REVISED") {
            try {
                setBtnLoading(true)
                const { data } = await axios.patch(`${documentRoute}/${id}/revisions`,
                    formData,
                    {
                        headers: {
                            Authorization: "Bearer " + accessToken
                        }
                    }
                );
                setBtnLoading(false)
                return toast.success(data.message, toastOptions);

            } catch (err) {
                setBtnLoading(false)
                return toast.error(err.response.data.message, toastOptions);
            }
        }


    }

    const { isLoading, data, error } = useGetDocumentQuery(id)

    if (error) {
        toast.error(error.data.message, toastOptions)
    }

    let initialEditValues;

    if (data) {
        initialEditValues = {
            name: data.payload.name,
            description: data.payload.description,
            type: data.payload.type,
            amount: data.payload.amount,
            attachments: []
        };
    }

    return (
        <Box>
            <PageTitle title="Edit Form" />

            <Box sx={{ display: "flex", justifyContent: "right", mb: "20px", mx: "20px" }}>
                <Link to={path} style={{ textDecoration: "none" }}>
                    <Button
                        className="no-underline"
                        variant="contained"
                        color="primary"
                    >
                        Back
                    </Button>
                </Link>
            </Box>

            <ToastContainer />

            <Box bgcolor={colors.white[100]} m="20px" p="20px" borderRadius="10px">
                <RequestForm handleFormSubmit={handleFormSubmit} btnLoading={btnLoading} loading={isLoading} initialValues={initialEditValues} disabled={true} />
            </Box>
        </Box>
    )
}

export default EditRequest
