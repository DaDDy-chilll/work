import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { groupRoute } from "../../../utils/APIRoutes";
import { toastOptions } from "../../../utils/toastOptions";
import { ToastContainer, toast } from "react-toastify";
import { Box, Button } from "@mui/material";
import PageTitle from "../../../components/mains/PageTitle";
import { Link } from "react-router-dom";
import DepartmentFlowForm from "../../../forms/DepartmentFlowForm";
import { colors } from "../../../utils/theme";
import { useDisclosure } from "../../../hooks/dialog";
import WorkFlowForm from "../../../forms/WorkFlowForm";
import { Formik } from "formik";
import { checkoutSchema, initialValues } from "../../../schemas/Group.schema";
import { useDispatch } from "react-redux";
import { apiSlice } from "../../../services/apiSlice";

const CreateGroup = () => {

  const accessToken = Cookies.get('accessToken')

  const { isOpen, setOpen, setClose } = useDisclosure()

  const [selectDepartments, setSelectDepartments] = useState([])

  const handleDepartmentChange = (e) => {

    if (e.target.checked === true) {
      setSelectDepartments((prev) => ([
        ...prev.filter(selectedDepartment => selectedDepartment.name !== e.target.name),
        {
          _id: e.target.name,
          name: e.target.value,
          order: prev.length
        }
      ]))

    } else if (e.target.checked === false) {
      setSelectDepartments(
        prev => prev.filter(selectedDepartment => selectedDepartment._id !== e.target.name)
          .map((department, index) => ({
            ...department,
            order: index
          }))
      )
    }
  }

  const [selectedUsers, setSelectedUsers] = useState([])

  const handleSelectChange = ({ userId, userName, departmentId, departmentName, checked }) => {
    if (checked === true) {
      setSelectedUsers((prev) => ([
        ...prev,
        { userId, name: userName, departmentId, departmentName, index: prev.length }
      ]))

    } else if (checked === false) {
      setSelectedUsers(prev => prev.filter(user => user.userId !== userId).map((user, index) => ({
        ...user,
        index
      })))
    }
  }

  const dispatch = useDispatch()

  const departments = selectDepartments.map((department) => {
    return {
      name: department.name,
      users: selectedUsers.filter(user => {
        if(user.departmentId === department._id){
          return user
        }
      })
    }
  })

  const handleFormSubmit = async (values) => {
    const { groupName } = values

    const departmentOrders = selectDepartments.map((department) => ({
      department: department._id, 
      index: department.order
    }))

    const reviewers = selectedUsers.map((user) => ({
      reviewer: user.userId,
      department: user.departmentId,
      index: user.index
    }))

    try {

      const { data } = await axios.post(groupRoute,
        {
          name: groupName,
          reviewers,
          departmentOrders
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken
          }
        }
      );

      // setClose()

      toast.success(data.message, toastOptions);

      return dispatch(apiSlice.util.invalidateTags(["Group"]))

    } catch (err) {
      return toast.error(err.response.data.message, toastOptions);
    }
  }

  return (
    <Box>
      <PageTitle title="Create Form" />

      <Box sx={{ display: "flex", justifyContent: "right", mb: "20px", mx: "20px" }}>
        <Link to="/work-flows" style={{ textDecoration: "none" }}>
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
            <form onSubmit={handleSubmit} style={{ height: "auto" }}>
              {
                !isOpen &&
                <DepartmentFlowForm
                  selectDepartments={selectDepartments}
                  handleDepartmentChange={handleDepartmentChange}
                  setOpen={setOpen}

                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              }
              {
                isOpen &&
                <WorkFlowForm
                  selectDepartments={selectDepartments}
                  selectedUsers={selectedUsers}
                  departments={departments}
                  handleSelectChange={handleSelectChange}
                  setClose={setClose}
                />
              }
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default CreateGroup
