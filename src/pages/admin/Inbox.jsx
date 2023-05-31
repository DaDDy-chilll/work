import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/mains/PageTitle';
import { ToastContainer, toast } from 'react-toastify';
import { getColumns } from '../../columns/Document.columns';
import DataTable from '../../components/tables/DataTable';
import { toastOptions } from '../../utils/toastOptions';
import { useGetInboxQuery } from '../../services/documentSlice';
import SelectCaseType from '../../components/form_controls/SelectCaseType';
import Cookies from 'js-cookie';
import axios from 'axios';
import { documentRoute } from '../../utils/APIRoutes';
import Loading from '../../components/mains/Loading';

const Inbox = () => {

    const [documentCase, setDocumentCase] = useState()

    const handleChange = async (value) => {
        setDocumentCase(value)
    }

    // const { isLoading, data, error } = useGetInboxQuery(
    //     documentCase === "OPEN" ? "open" :
    //         documentCase === "CLOSED" ? "closed" : null
    // )

    const columns = getColumns()

    // let content;

    // if (error) {
    //     toast.error(error.data.message, toastOptions)
    // } else {
    //     content = <DataTable loading={isLoading} rows={data && data.payload} columns={columns} />
    // }

    const [pageState, setPageState] = useState({
        isLoading: true,
        data: undefined,
        total: 0,
        page: 1,
        pageSize: 10
    })

    useEffect(() => {
        const accessToken = Cookies.get('accessToken')
        const fetchData = async () => {
            console.log('ON')
            setPageState(old => ({ ...old, isLoading: true }))

            const { data } = await axios.get(`${documentRoute}/to-check?page=${pageState.page}&limit=${pageState.pageSize}&sort=+createdAt`, {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            })

            setPageState(old => ({ ...old, isLoading: false, data: data.payload, total: data.total }))
        }
        fetchData()
    }, [pageState.page, pageState.pageSize])

    return (
        <Box mt="20px">

            <PageTitle title={"Inbox"} />

            <Box sx={{ display: "flex", justifyContent: "right", gap: 2 }}>

                {/* <SelectCaseType documentCase={documentCase} handleChange={handleChange} /> */}

            </Box>

            <ToastContainer />

            {/* {content} */}

            {
                pageState.data ?
                <DataTable
                    rows={pageState.data}
                    rowCount={pageState.total}
                    loading={pageState.isLoading}
                    page={pageState.page - 1}
                    pageSize={pageState.pageSize}
                    onPageChange={(newPage) => {
                        setPageState(old => ({ ...old, page: newPage + 1 }))
                    }}
                    onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
                    columns={columns}
                />
                : <Loading open={true} />
            }

        </Box>
    )
}

export default Inbox
