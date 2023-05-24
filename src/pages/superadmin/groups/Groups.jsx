import { Box, Button } from '@mui/material'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'

// icons
import { AddOutlined } from '@mui/icons-material'
import { useDisclosure } from '../../../hooks/dialog'
import { useGetGroupsQuery } from '../../../services/groupSlice'
import { toastOptions } from '../../../utils/toastOptions'
import DataTable from '../../../components/tables/DataTable'
import { useGetBOMsQuery, useGetClinicalAdminsQuery, useGetFADsQuery, useGetUsersQuery } from '../../../services/userSlice'
import PageTitle from '../../../components/mains/PageTitle'
import CreateGroup from './CreateGroup'
import { getColumns } from '../../../columns/Group.columns'

const Groups = () => {

  const { isOpen, setOpen, setClose } = useDisclosure()

  // fetch groups
  const { isLoading: groupsLoading, data: groupsData, error: groupsError } = useGetGroupsQuery()

  const columns = getColumns()

  let dataTable;

  if (groupsError) {
    toast.error(groupsError.data.message, toastOptions)
  } else {
    dataTable = <DataTable loading={groupsLoading} rows={groupsData && groupsData.payload} columns={columns} />
  }

  // // fetch clinical admins
  // const { isLoading: clinicalAdminsLoading, data: clinicalAdmins, error: clinicalAdminsError } = useGetClinicalAdminsQuery()
  // const { isLoading: BOMsLoading, data: BOMs, error: BOMsError } = useGetBOMsQuery()
  // const { isLoading: FADsLoading, data: FADs, error: FADsError } = useGetFADsQuery()

  // let createForm;

  // if (clinicalAdminsError || BOMsError || FADsError) {
  //   toast.error(clinicalAdminsError.data.message, toastOptions)
  // } else {
  //   createForm = <CreateGroup loading={clinicalAdminsLoading} clinicalAdmins={clinicalAdmins && clinicalAdmins.payload} BOMs={BOMs && BOMs.payload} FADs={FADs && FADs.payload} setClose={setClose} isOpen={isOpen} />
  // }

  return (
    <Box>
      <PageTitle title={"Work Flows"} />

      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Button
          className="no-underline"
          variant="contained"
          color="primary"
          onClick={setOpen}
        >
          Create New Work Flow <AddOutlined sx={{ ml: "5px" }} />
        </Button>
      </Box>

      <ToastContainer />

      {dataTable}

      {/* {createForm} */}

    </Box>
  )
}

export default Groups
