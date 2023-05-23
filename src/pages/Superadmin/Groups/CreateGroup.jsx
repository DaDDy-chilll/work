import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { groupRoute } from "../../../utils/APIRoutes";
import { toastOptions } from "../../../utils/toastOptions";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Loading from "../../../components/mains/Loading";
import GroupForm from "../../../forms/GroupForm";
import { useDispatch } from "react-redux";
import { apiSlice } from "../../../services/apiSlice";

const CreateGroup = ({ setClose, isOpen, clinicalAdmins, BOMs, FADs, loading }) => {

  const accessToken = Cookies.get('accessToken')

  const [btnLoading, setBtnLoading] = useState(false)

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (selectedList, selectedItem) => {
    setSelectedOptions(selectedList);
  };

  const [selectedUsers, setSelectedUsers] = useState([])

  const handleSelectChange = ({ reviewer, checked, department }) => {

    if (checked === true) {
      setSelectedUsers((prev) => ([
        ...prev,
        { reviewer, department, index: prev.length }
      ]))

    } else if (checked === false) {
      setSelectedUsers(prev => prev.filter(user => user.reviewer !== reviewer).map((user, index) => ({
        ...user,
        index
      })))
    }

  }

  const handleApproveClick = ({ reviewer, checked, department }) => {

    if (checked === true) {
      setSelectedUsers((prev) => ([
        ...selectedUsers.filter(selectedUser => selectedUser.reviewer !== reviewer),

        ...selectedUsers.filter(selectedUser => selectedUser.reviewer === reviewer).map((user, index) => ({
          ...user,
          canApprove: true
        }))
      ]))

    } else if (checked === false) {
      setSelectedUsers((prev) => ([
        ...selectedUsers.filter(selectedUser => selectedUser.reviewer !== reviewer),

        ...selectedUsers.filter(selectedUser => selectedUser.reviewer === reviewer).map((user, index) => ({
          ...user,
          canApprove: false
        }))
      ]))
    }

  }

  const handleVerifyClick = ({ reviewer, checked, department }) => {

    if (checked === true) {
      setSelectedUsers((prev) => ([
        ...selectedUsers.filter(selectedUser => selectedUser.reviewer !== reviewer),

        ...selectedUsers.filter(selectedUser => selectedUser.reviewer === reviewer).map((user, index) => ({
          ...user,
          canVerify: true
        }))
      ]))

    } else if (checked === false) {
      setSelectedUsers((prev) => ([
        ...selectedUsers.filter(selectedUser => selectedUser.reviewer !== reviewer),

        ...selectedUsers.filter(selectedUser => selectedUser.reviewer === reviewer).map((user, index) => ({
          ...user,
          canVerify: false
        }))
      ]))
    }

  }

  const handleEditClick = ({ reviewer, checked, department }) => {

    if (checked === true) {
      setSelectedUsers((prev) => ([
        ...selectedUsers.filter(selectedUser => selectedUser.reviewer !== reviewer),

        ...selectedUsers.filter(selectedUser => selectedUser.reviewer === reviewer).map((user, index) => ({
          ...user,
          canEdit: true
        }))
      ]))

    } else if (checked === false) {
      setSelectedUsers((prev) => ([
        ...selectedUsers.filter(selectedUser => selectedUser.reviewer !== reviewer),

        ...selectedUsers.filter(selectedUser => selectedUser.reviewer === reviewer).map((user, index) => ({
          ...user,
          canEdit: false
        }))
      ]))
    }

  }

  const handlePrepareClick = ({ reviewer, checked, department }) => {

    if (checked === true) {
      setSelectedUsers((prev) => ([
        ...prev.filter(selectedUser => selectedUser.reviewer !== reviewer),

        ...prev.filter(selectedUser => selectedUser.reviewer === reviewer).map((user, index) => ({
          ...user,
          canPrepare: true
        }))
      ]))

    } else if (checked === false) {
      setSelectedUsers((prev) => ([
        ...selectedUsers.filter(selectedUser => selectedUser.reviewer !== reviewer),

        ...selectedUsers.filter(selectedUser => selectedUser.reviewer === reviewer).map((user, index) => ({
          ...user,
          canPrepare: false
        }))
      ]))
    }

  }

  const dispatch = useDispatch()

  const handleFormSubmit = async (values) => {
    const { groupName } = values

    try {
      setBtnLoading(true)

      const { data } = await axios.post(groupRoute,
        {
          name: groupName,
          reviewers: selectedUsers
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

      return dispatch(apiSlice.util.invalidateTags(["Group"]))

    } catch (err) {
      setBtnLoading(false)
      return toast.error(err.response.data.message, toastOptions);
    }
  }

  return (
    <Dialog maxWidth={"lg"} open={isOpen} onClose={setClose}>
      <DialogTitle variant='h2' fontWeight='bold' sx={{ mb: "5px", textTransform: 'uppercase' }}>Create New Work Flow</DialogTitle>
      <DialogContent>
        {
          loading ? <Loading /> :
            <GroupForm
              handleSelectChange={handleSelectChange}
              handleApproveClick={handleApproveClick}
              handleVerifyClick={handleVerifyClick}
              handleEditClick={handleEditClick}
              handlePrepareClick={handlePrepareClick}
              selectedUsers={selectedUsers}

              clinicalAdmins={clinicalAdmins}
              BOMs={BOMs}
              FADs={FADs}
              btnLoading={btnLoading}
              handleFormSubmit={handleFormSubmit}
              setClose={setClose}
              loading={false}
              handleSelect={handleSelect}
              selectedOptions={selectedOptions}
            />
        }
      </DialogContent>
    </Dialog>
  )
}

export default CreateGroup
