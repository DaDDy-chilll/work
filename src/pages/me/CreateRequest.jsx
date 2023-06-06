import { Box, Button } from '@mui/material'
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { toastOptions } from '../../utils/toastOptions';
import { documentRoute } from '../../utils/APIRoutes';
import PageTitle from '../../components/mains/PageTitle';
import RequestForm from '../../forms/RequestForm';
import { colors } from '../../utils/theme';
import { initialCreateValues } from '../../schemas/Document.schema';
import { apiSlice } from '../../services/apiSlice';
import { useDispatch } from 'react-redux';

const CreateRequest = () => {
    const accessToken = Cookies.get('accessToken')
    const [btnLoading, setBtnLoading] = useState(false)

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

        try {
            setBtnLoading(true)
            const { data } = await axios.post(documentRoute,
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    }
                }
            );
            setBtnLoading(false)

            toast.success(data.message, toastOptions);

            dispatch(apiSlice.util.invalidateTags(["Document"]))

            return navigate('/my-requests')

        } catch (err) {
            setBtnLoading(false)
            return toast.error(err.response.data.message, toastOptions);
        }
    }

    return (
        <Box>
            <PageTitle title="Create Form" />

            <Box sx={{ display: "flex", justifyContent: "right", mb: "20px", mx: "20px" }}>
                <Link to="/" style={{ textDecoration: "none" }}>
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
                {
                    <RequestForm isClaimDocument={false} handleFormSubmit={handleFormSubmit} btnLoading={btnLoading} loading={false} initialValues={initialCreateValues} disabled={false} />
                }
            </Box>
        </Box>
    )
}

export default CreateRequest
