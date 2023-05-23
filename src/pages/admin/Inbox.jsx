import { Box } from '@mui/material';
import React, { useState } from 'react'
import PageTitle from '../../components/mains/PageTitle';
import { ToastContainer, toast } from 'react-toastify';
import { getColumns } from '../../columns/Document.columns';
import DataTable from '../../components/tables/DataTable';
import { toastOptions } from '../../utils/toastOptions';
import { useGetInboxQuery } from '../../services/documentSlice';
import SelectCaseType from '../../components/form_controls/SelectCaseType';

const Inbox = () => {

    const [documentCase, setDocumentCase] = useState()

    const handleChange = async (value) => {
        setDocumentCase(value)
    }

    const { isLoading, data, error } = useGetInboxQuery(
        documentCase === "OPEN" ? "open" :
        documentCase === "CLOSED" ? "closed" : null
    )

    const columns = getColumns()

    let content;

    if (error) {
        toast.error(error.data.message, toastOptions)
    } else {
        content = <DataTable loading={isLoading} rows={data && data.payload} columns={columns} />
    }


    return (
        <Box mt="20px">

            <PageTitle title={"Inbox"} />

            <Box sx={{ display: "flex", justifyContent: "right", gap: 2 }}>

                <SelectCaseType documentCase={documentCase} handleChange={handleChange} />

            </Box>

            <ToastContainer />

            {content}

        </Box>
    )
}

export default Inbox
