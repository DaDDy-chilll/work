import React from "react";
import { toastOptions } from "../../../utils/toastOptions";
import { ToastContainer, toast } from "react-toastify";
import { Box, Button, Typography } from "@mui/material";
import PageTitle from "../../../components/mains/PageTitle";
import { Link, useParams } from "react-router-dom";
import { colors } from "../../../utils/theme";
import { useGetGroupQuery } from "../../../services/groupSlice";
import DepartmentLists from "../../../components/details/DepartmentLists";
import Loading from "../../../components/mains/Loading";

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

    render = (
      <Box>
        <Typography variant="h3" mb={1}>Work Flow Name</Typography>
        <Typography variant="h3" mb={3} ml={2}>{data && data.payload.name}</Typography>
        <Typography variant="h3" mb={1}>Work Flow Description</Typography>
        <Typography variant="h3" mb={5} ml={2}>{data && data.payload.description}</Typography>
        <DepartmentLists
          departments={payloads}
        />
      </Box>
    )

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

      <Box bgcolor={colors.white[100]} m="20px" p={5} borderRadius="10px">
        {
          isLoading ? <Loading open={isLoading} /> :
            data && render
        }
      </Box>
    </Box>
  )
}

export default GroupDetail
