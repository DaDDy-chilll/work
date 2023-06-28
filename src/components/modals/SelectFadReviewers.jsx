import { Box, Button, CircularProgress, Dialog, DialogContent, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip, Typography, useMediaQuery } from '@mui/material'
import axios from 'axios'
import { Formik } from 'formik'
import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { documentRoute, groupRoute } from '../../utils/APIRoutes'
import { toastOptions } from '../../utils/toastOptions'
import { toast } from 'react-toastify'
import { useGetFadGroupsQuery } from '../../services/groupSlice'
import { useGetFadUsersQuery } from '../../services/userSlice'
import { checkoutSchema, initialValues } from '../../schemas/FadReviewers.schema'
import { colors } from '../../utils/theme'
import { Info } from '@mui/icons-material'
import MultipleSelect from '../form_controls/MultipleSelect'


const SelectFadReviewers = ({ setClose, isOpen }) => {
    const { id } = useParams()

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [btnLoading, setBtnLoading] = useState(false)

    const [setIsLoading] = useState(true)

    const handleFormSubmit = async (values) => {
        const accessToken = Cookies.get('accessToken')

        const { groupId } = values

        let fadReviewers;

        if (groupId === "custom") {

            fadReviewers = selectedOptions.map((selectedOption, index) => (
                {
                    user: selectedOption._id,
                    order: index
                }
            ))

        } else {

            try {
                setIsLoading(true)
                const { data } = await axios.get(`${groupRoute}/${groupId}`, {
                    headers: {
                        Authorization: "Bearer " + accessToken
                    }
                })

                fadReviewers = data.payload.reviewers

                setIsLoading(false)

            } catch (err) {
                setIsLoading(false)
                toast.error(err.response.data.message, toastOptions)
            }

        }

        if (fadReviewers) {
            const formData = new FormData();

            formData.append("fadReviewers", JSON.stringify(fadReviewers))

            try {
                setBtnLoading(true)
                const { data } = await axios.post(`${documentRoute}/fad/${id}`,
                    formData,
                    {
                        headers: {
                            Authorization: "Bearer " + accessToken,
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

    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleSelect = async (selectedList, selectedItem) => {
        setSelectedOptions(selectedList);
    };

    // fetch groups
    const { data: groupsData, error: groupsError } = useGetFadGroupsQuery()

    if (groupsError) {
        toast.error(groupsError.data.message, toastOptions)
    }

    // fetch users
    const { data: usersData, error: usersError } = useGetFadUsersQuery()

    if (usersError) {
        toast.error(usersError.data.message, toastOptions)
    }

    return (
        <Dialog fullWidth
            maxWidth="md" open={isOpen} onClose={setClose}>
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
                    }) => (
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Box
                                display="grid"
                                gap="40px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                {/* select reviewers group */}
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
                                        {groupsData && groupsData.payload.map((group, i) => (
                                            <MenuItem sx={{ textTransform: "capitalize" }} value={group._id} key={i}>
                                                {group.groupName}
                                            </MenuItem>
                                        ))}
                                        <MenuItem value="custom" key={"custom"}>Custom</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* custom reviewers group */}
                                {
                                    values.groupId === "custom" &&
                                    <Box sx={{ gridColumn: "span 4" }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant='h5'>Member Lists</Typography>
                                            <Tooltip
                                                sx={{ bgcolor: colors.paleBlue[100] }}
                                                arrow placement='top-start'
                                                title={
                                                    <Typography>
                                                        Your form will be requested as your selected member order.
                                                    </Typography>
                                                }
                                            >
                                                <IconButton sx={{ color: colors.paleBlue[800] }}>
                                                    <Info />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        {
                                            usersData &&
                                            <MultipleSelect handleSelect={handleSelect} selectedOptions={selectedOptions} users={usersData && usersData.payload} />
                                        }
                                    </Box>
                                }
                            </Box>
                            <Box display="flex" justifyContent="flex-end" gap="10px" mt="40px">
                                <Button
                                    sx={{ width: "200px" }}
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    onClick={setClose}
                                >
                                    {btnLoading ? <CircularProgress color='secondary' size="20px" /> : "Submit"}
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}

export default SelectFadReviewers
