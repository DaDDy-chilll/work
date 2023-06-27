import { Box, Button } from "@mui/material";
import React from "react";

// icons
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/toastOptions";
import { userRoute } from "../../utils/APIRoutes";
import axios from "axios";
import Cookies from "js-cookie";

const ActionBtn = ({ id, isDisabled, isUser }) => {

  const navigate = useNavigate()

  const handleView = () => {
    navigate(`${id}`)
  }

  const accessToken = Cookies.get('accessToken')

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
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button variant="contained" color="primary" onClick={() => handleView()}>
        View
      </Button>
      {
        isUser && <Button variant="contained" color="error" disabled={isDisabled} onClick={() => handleStatusChange()}>
          Diable
        </Button>
      }
    </Box>
  );
};

export default ActionBtn;