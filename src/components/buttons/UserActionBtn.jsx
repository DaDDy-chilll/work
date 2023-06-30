import { Box, Button, Checkbox, CircularProgress, Dialog, DialogContent, DialogTitle, FormControlLabel, FormGroup, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";

// icons
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/toastOptions";
import { userRoute } from "../../utils/APIRoutes";
import axios from "axios";
import Cookies from "js-cookie";
import { useDisclosure } from "../../hooks/dialog";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { apiSlice } from "../../services/apiSlice";

const UserActionBtn = ({ id, isDisabled, isUser }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [btnLoading, setBtnLoading] = useState()

  const { isOpen, setOpen, setClose } = useDisclosure()

  const [permissions, setPermissions] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const handleView = () => {
    navigate(`${id}`)
  }

  const handleEdit = () => {
    setOpen()
  }

  const checkoutSchema = yup.object().shape({
    canApprove: yup.boolean(),
    canEdit: yup.boolean(),
    canPrepare: yup.boolean(),
    canVerify: yup.boolean(),
  });

  const accessToken = Cookies.get('accessToken')

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    async function fetchData() {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`${userRoute}/${id}`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          }
        })
        setPermissions(data.payload.permissions);
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        return toast.error(err.response.data.message, toastOptions);
      }
    }
    fetchData()
  }, [id])

  const initialValues = permissions && {
    canApprove: permissions.canApprove,
    canEdit: permissions.canEdit,
    canPrepare: permissions.canPrepare,
    canVerify: permissions.canVerify,
  }

  const dispatch = useDispatch()

  const handleFormSubmit = async (value) => {
    const { canApprove, canEdit, canPrepare, canVerify } = value
    try {
      setBtnLoading(true)
      const { data } = await axios.patch(`${userRoute}/${id}`,
        {
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

  const handleStatusChange = async () => {
    try {
      const { data } = await axios.post(`${userRoute}/${id}/disable`, null, {
        headers: {
          Authorization: "Bearer " + accessToken,
        }
      })
      if (data) {
        toast.success("Success", toastOptions)
      }
      window.location.reload()
      // return dispatch(apiSlice.util.invalidateTags(["User"]))
    } catch (err) {
      return toast.error(err.response.data.message, toastOptions);
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button variant="contained" color="primary" onClick={() => handleView()}>
          View
        </Button>
        {
          isUser && <Button variant="contained" color="warning" onClick={() => handleEdit()}>
            Edit
          </Button>
        }
        {
          isUser && <Button variant="contained" color="error" disabled={isDisabled} onClick={() => handleStatusChange()}>
            Disable
          </Button>
        }
      </Box>
      <Dialog open={isOpen} onClose={setClose}>
        <DialogTitle
          variant='h2'
          fontWeight='bold'
          sx={{ mb: "5px", textTransform: 'uppercase' }}
        >
          Edit User Permission
        </DialogTitle>
        <DialogContent>
          {
            isLoading ? "loading..." :
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
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box
                      display="grid"
                      gap="40px"
                      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                      sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                      }}
                    >
                      {/* Permissions */}
                      <FormGroup>
                        <Box sx={{ display: "flex", gap: 5 }}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Create"
                            checked={true}
                            disabled={true}
                            value={values.canCreate}
                            name="canCreate"
                            // error={!!touched.approve && !!errors.approve}
                            // helpertext={touched.approve && errors.approve}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Acknowledge"
                            checked={true}
                            disabled={true}
                            value={values.canAcknowledge}
                            name="canAcknowledge"
                            // error={!!touched.approve && !!errors.approve}
                            // helpertext={touched.approve && errors.approve}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Comment"
                            checked={true}
                            disabled={true}
                            value={values.canComment}
                            name="canComment"
                            // error={!!touched.approve && !!errors.approve}
                            // helpertext={touched.approve && errors.approve}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Edit"
                            checked={values.canPrepare}
                            value={values.canPrepare}
                            name="canPrepare"
                            // error={!!touched.approve && !!errors.approve}
                            // helpertext={touched.approve && errors.approve}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </Box>
                        <Box sx={{ display: "flex", gap: 5 }}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Revise"
                            checked={values.canEdit}
                            value={values.canEdit}
                            name="canEdit"
                            // error={!!touched.reject && !!errors.reject}
                            // helpertext={touched.reject && errors.reject}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Verify"
                            checked={values.canVerify}
                            value={values.canVerify}
                            name="canVerify"
                            // error={!!touched.reject && !!errors.reject}
                            // helpertext={touched.reject && errors.reject}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Approve"
                            checked={values.canApprove}
                            value={values.canApprove}
                            name="canApprove"
                            // error={!!touched.approve && !!errors.approve}
                            // helpertext={touched.approve && errors.approve}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Reject"
                            checked={true}
                            disabled={true}
                            value={values.canReject}
                            name="canReject"
                            // error={!!touched.approve && !!errors.approve}
                            // helpertext={touched.approve && errors.approve}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </Box>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Reverse"
                          checked={true}
                          disabled={true}
                          value={values.canRequestRevision}
                          name="canRequestRevision"
                          // error={!!touched.approve && !!errors.approve}
                          // helpertext={touched.approve && errors.approve}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Box>
                    <Box display="flex" justifyContent="center" gap={5} mt="40px">
                      <Button
                        sx={{ width: "200px" }}
                        type="reset"
                        color="primary"
                        variant="outlined"
                        onClick={setClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        sx={{ width: "200px" }}
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={btnLoading ? true : false}
                      >
                        {btnLoading ? <CircularProgress size="20px" /> : "Submit"}
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
          }
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserActionBtn;