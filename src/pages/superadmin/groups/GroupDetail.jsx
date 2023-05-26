import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { groupRoute } from "../../../utils/APIRoutes";
import { toastOptions } from "../../../utils/toastOptions";
import { ToastContainer, toast } from "react-toastify";
import { Box, Button } from "@mui/material";
import PageTitle from "../../../components/mains/PageTitle";
import { Link, useParams } from "react-router-dom";
import DepartmentFlowForm from "../../../forms/DepartmentFlowForm";
import { colors } from "../../../utils/theme";
import { useDisclosure } from "../../../hooks/dialog";
import WorkFlowForm from "../../../forms/WorkFlowForm";
import { Formik } from "formik";
import { checkoutSchema, initialValues } from "../../../schemas/Group.schema";
import { useGetGroupQuery } from "../../../services/groupSlice";
import DepartmentLists from "../../../components/details/DepartmentLists";

const GroupDetail = () => {

  const { id } = useParams()

  const { isLoading, data, error } = useGetGroupQuery(id)

  if (error) {
    toast.error(error.data.message, toastOptions)
  }

  let render

  if (data) {

    let departments = [];
    data.payload.reviewers.forEach(r => {
      departments.push(r.reviewer.department.name)
    })

    departments = [...new Set([...departments])]

    const payloads = departments.map(dpt => {
      const users = data.payload.reviewers.filter(r => r.reviewer.department.name === dpt)
        .map((user) => (
          user.reviewer
          // {

          //   // permissions: user.reviewer.permissions,
          //   // name: user.reviewer.name,
          //   // userName: user.reviewer.name,
          //   // department: {
          //   //   name: user.department.name
          //   // }
          // }
        ))
      return {
        name: dpt,
        users
      }
    })

    // console.log({ departments: payloads });

    render =
      <DepartmentLists
        departments={payloads}
      />
    // const result = data.payload.reviewers.filter(user => user.department.name === "Customer Service")
    // console.log({ result });
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
        {
          data && render
        }
      </Box>
    </Box>
  )
}

export default GroupDetail
