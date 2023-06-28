import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

// components
import { Box, Button } from '@mui/material'
import { useGetDocumentQuery } from '../../services/documentSlice'
import { toastOptions } from '../../utils/toastOptions'
import DocumentDetail from '../../components/details/DocumentDetail'
import { colors } from '../../utils/theme'
import Loading from '../../components/mains/Loading'
import PageTitle from '../../components/mains/PageTitle'
import { useGetRemarksQuery } from '../../services/historySlice'
import { initialCreateValues } from '../../schemas/Document.schema'
import RequestForm from '../../forms/RequestForm'
import axios from 'axios'
import { documentRoute, remarkRoute, revisionRoute } from '../../utils/APIRoutes'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useGetRevisionsQuery } from '../../services/revisionSlice'
import { useGetMyInfoQuery } from '../../services/userSlice'
import { useRef } from 'react'

const MyRequestDetail = () => {

  const [originalDocument, setOriginalDocument] = useState()
  const [originalRemarks, setOriginalRemarks] = useState()
  const [originalRevisions, setOriginalRevisions] = useState()

  const { id } = useParams()

  const { data: remarks, error: remarksError } = useGetRemarksQuery(id)

  if (remarksError) {
    toast.error(remarksError.data.message, toastOptions)
  }

  const { isLoading, data, error } = useGetDocumentQuery(id)

  useEffect(() => {

    const accessToken = Cookies.get("accessToken")

    async function fetchData() {

      if (data && data.payload.isClaimDocument) {
        try {

          const { data: response } = await axios.get(`${documentRoute}/${data.payload.originalDocument}`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            }
          })

          setOriginalDocument(response.payload)

        } catch (err) {
          return toast.error(err.response.data.message, toastOptions);
        }
      }
    }

    fetchData()

    async function fetchRemarks() {
      if (data && data.payload.isClaimDocument) {
        try {

          const { data: response } = await axios.get(`${remarkRoute}?documentId=${data.payload.originalDocument}`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            }
          })

          setOriginalRemarks(response.payload)

        } catch (err) {
          return toast.error(err.response.data.message, toastOptions);
        }
      }
    }

    fetchRemarks()

    async function fetchRevisions() {
      if (data && data.payload.isClaimDocument) {
        try {

          const { data: response } = await axios.get(`${revisionRoute}/active?documentId=${data.payload.originalDocument}`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            }
          })

          setOriginalRevisions(response.payload)

        } catch (err) {
          return toast.error(err.response.data.message, toastOptions);
        }
      }
    }

    fetchRevisions()

  }, [data])

  let content;

  const scrollToRef = useRef();

  const { data: revisions } = useGetRevisionsQuery(id)

  // fetch my info
  const { data: me } = useGetMyInfoQuery()

  if (error) {
    toast.error(error.data.message, toastOptions)
  } else {
    content = <DocumentDetail
      document={data && data.payload}
      remarks={remarks && remarks.payload}
      revisions={revisions && revisions.payload}
      me={me}
      scrollToRef={scrollToRef}
    />
  }

  const [btnLoading, setBtnLoading] = useState(false)

  const navigate = useNavigate()

  const handleFormSubmit = async (values) => {
    const accessToken = Cookies.get('accessToken')

    const payload = {
      ...values,
      type: "CLAIM",
      originalDocumentId: id
    }

    const { attachments } = payload

    const formData = new FormData();

    for (let value in payload) {
      if (value === 'attachments') {
        continue;
      }
      formData.append(value, payload[value]);
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

      return navigate('/my-requests')

    } catch (err) {
      setBtnLoading(false)
      return toast.error(err.response.data.message, toastOptions);
    }
  }

  return (
    <Box p="20px">
      <PageTitle title="My Request Details" />

      <ToastContainer />

      <Box sx={{ display: "flex", justifyContent: "right", mb: "20px", mx: "20px" }}>
        <Link to="/my-requests" style={{ textDecoration: "none" }}>
          <Button
            className="no-underline"
            variant="contained"
            color="primary"
          >
            Back
          </Button>
        </Link>
      </Box>

      {
        data && data.payload.type === "ADVANCE" &&
        data.payload.status === "APPROVED" && data.payload.isCaseClosed === false &&

        <Box bgcolor={colors.white[100]} m="20px" p="20px" borderRadius="10px">
          {
            <RequestForm isClaimDocument={true} handleFormSubmit={handleFormSubmit} btnLoading={btnLoading} loading={false} initialValues={initialCreateValues} disabled={false} />
          }
        </Box>
      }

      {
        revisions && revisions.payload && revisions.payload.acknowledgements
          // eslint-disable-next-line array-callback-return
          .filter((acknowledgement) => {
            if (acknowledgement.user === me.payload._id && acknowledgement.hasAcknowledged === false)
              return acknowledgement
          }).length
          ?
          <>
            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
              <Button variant='contained' color='error' onClick={() => scrollToRef.current.scrollIntoView()}>
                Acknowledge for Changes
              </Button>
            </Box>
          </> : <></>
      }

      <Box bgcolor={colors.white[100]} py="20px" px="50px" borderRadius="10px">
        {
          isLoading ? <Loading open={!isLoading && isLoading === undefined ? false : true} /> :
            content
        }
      </Box>

      {
        originalDocument &&
        <Box
          bgcolor={colors.white[100]}
          py="20px"
          px="50px"
          borderRadius="10px"
          mt={2}
          sx={{
            border: `1px solid
        ${originalRevisions && originalRevisions.acknowledgements
                // eslint-disable-next-line array-callback-return
                .filter((acknowledgement) => {
                  if (acknowledgement.user === me.payload._id && acknowledgement.hasAcknowledged === false)
                    return acknowledgement
                }).length ?
                colors.red[800] : "none"
              }
        `
          }}
        >
          <DocumentDetail document={originalDocument} remarks={originalRemarks} />
        </Box>
      }

    </Box>
  )
}

export default MyRequestDetail
