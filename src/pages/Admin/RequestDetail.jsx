import React, { useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { Box, Button } from '@mui/material'
import { useDisclosure } from '../../hooks/dialog'
import { useGetDocumentQuery } from '../../services/documentSlice'
import { toastOptions } from '../../utils/toastOptions'
import DocumentDetail from '../../components/details/DocumentDetail'
import PageTitle from '../../components/mains/PageTitle'
import { colors } from '../../utils/theme'
import Loading from '../../components/mains/Loading'
import AddAction from '../../components/modals/AddAction'
import { useGetGroupsQuery } from '../../services/groupSlice'
import { useGetMyInfoQuery } from '../../services/userSlice'
import { useGetRemarksQuery } from '../../services/historySlice'
import { useGetRevisionsQuery } from '../../services/revisionSlice'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { documentRoute, remarkRoute, revisionRoute } from '../../utils/APIRoutes'
import { useState } from 'react'

// components

const RequestDetail = ({ path }) => {
  const [originalDocument, setOriginalDocument] = useState()
  const [originalRemarks, setOriginalRemarks] = useState()
  const [originalRevisions, setOriginalRevisions] = useState()

  const { id } = useParams()

  const scrollToRef = useRef();

  const { isOpen, setOpen, setClose } = useDisclosure()

  // fetch my info
  const { isLoading: myInfoLoading, data: me, error: myInfoError } = useGetMyInfoQuery()

  if (myInfoError) {
    toast.error(myInfoError.data.message, toastOptions)
  }

  const { isLoading: remarksLoading, data: remarks, error: remarksError } = useGetRemarksQuery(id)

  if (remarksError) {
    toast.error(remarksError.data.message, toastOptions)
  }

  // fetch document detail
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

  const { data: revisions } = useGetRevisionsQuery(id)

  if (error) {
    toast.error(error.data.message, toastOptions)
  } else {
    // console.log({ current: data && data.payload.reviewers.list[data.payload.reviewers.currentReviewerIndex] });
    content =
      <DocumentDetail
        document={data && data.payload}
        remarks={remarks && remarks.payload}
        revisions={revisions && revisions.payload}
        me={me}
        scrollToRef={scrollToRef}
      />
  }

  // fetch groups
  const { isLoading: groupLoading, data: groupData, error: groupError } = useGetGroupsQuery()

  const navigate = useNavigate()

  const handlePrepare = () => {
    navigate(`${path}/edit/${id}`)
  }
  const handleRevise = () => {
    navigate(`${path}/revise/${id}`)
  }

  console.log(revisions && revisions.payload);

  return (
    <Box p="20px">

      <PageTitle title="Request Details" />

      <ToastContainer />

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

      {
        revisions && revisions.payload && revisions.payload.acknowledgements
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

      <Box
        bgcolor={colors.white[100]}
        py="20px"
        px="50px"
        borderRadius="10px"
        sx={{
          border: `1px solid
          ${revisions && revisions.payload && revisions.payload.acknowledgements
              .filter((acknowledgement) => {
                if (acknowledgement.user === me.payload._id && acknowledgement.hasAcknowledged === false)
                  return acknowledgement
              }).length ?
              colors.red[800] : "none"
            }
          `
        }}
      >
        {
          isLoading ? <Loading open={!isLoading && isLoading === undefined ? false : true} /> :
            content
        }

        {/* button */}
        {
          data && groupData && me &&
          me.payload._id === data.payload.currentReviewer &&
          <>
            <Box display="flex" justifyContent="flex-end" gap="10px" mt="40px">
              {
                data.payload.status !== "REQUESTED_REVISION" && data.payload.reviewers.list[data.payload.reviewers.currentReviewerIndex].canPrepare &&
                <Button
                  sx={{ width: "200px" }}
                  type="submit"
                  color="info"
                  variant="contained"
                  onClick={handlePrepare}
                >
                  Edit
                </Button>
              }

              {
                data.payload.status === "REQUESTED_REVISION" &&
                <Button
                  sx={{ width: "200px" }}
                  type="submit"
                  color="warning"
                  variant="contained"
                  onClick={handleRevise}
                >
                  Revise
                </Button>
              }

              {
                data.payload.status !== "REQUESTED_REVISION" &&
                <Button
                  sx={{ width: "200px" }}
                  type="submit"
                  color="primary"
                  variant="contained"
                  onClick={setOpen}
                >
                  Add Remark
                </Button>
              }
            </Box>
            <AddAction
              setClose={setClose}
              isOpen={isOpen}
              groups={groupData && groupData.payload}
              title="Request"
              reviewer={data.payload.reviewers.list[data.payload.reviewers.currentReviewerIndex]}
            />
          </>
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

          {/* button */}
          {
            originalDocument && groupData && me && data &&
            data.payload.isClaimDocument === false &&
            me.payload._id === originalDocument.currentReviewer &&
            <>
              <Box display="flex" justifyContent="flex-end" gap="10px" mt="40px">
                {
                  originalDocument.status !== "REQUESTED_REVISION" && originalDocument.reviewers.list[originalDocument.reviewers.currentReviewerIndex].canPrepare &&
                  <Button
                    sx={{ width: "200px" }}
                    type="submit"
                    color="info"
                    variant="contained"
                    onClick={handlePrepare}
                  >
                    Edit
                  </Button>
                }

                {
                  originalDocument.status === "REQUESTED_REVISION" &&
                  <Button
                    sx={{ width: "200px" }}
                    type="submit"
                    color="warning"
                    variant="contained"
                    onClick={handleRevise}
                  >
                    Revise
                  </Button>
                }

                {
                  originalDocument.status !== "REQUESTED_REVISION" &&
                  <Button
                    sx={{ width: "200px" }}
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={setOpen}
                  >
                    Add Remark
                  </Button>
                }
              </Box>
              <AddAction
                setClose={setClose}
                isOpen={isOpen}
                groups={groupData && groupData.payload}
                title="Request"
                reviewer={originalDocument.reviewers.list[originalDocument.reviewers.currentReviewerIndex]}
              />
            </>
          }
        </Box>
      }

    </Box>
  )
}

export default RequestDetail
