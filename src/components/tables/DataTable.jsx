import { Box } from '@mui/material'
import React, { useState } from 'react'
import { colors } from '../../utils/theme';
import Loading from '../mains/Loading';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const DataTable = ({ rows, columns, loading, total }) => {

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10
    })

    const handlePageChange = ({ page, pageSize }) => {

        setPaginationModel({
            page: page,
            pageSize
        })
    }

    return (
        <Box
            height="75vh"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.paleGreen[800],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.paleBlue[800],
                    color: colors.white[100],
                    borderBottom: "none",
                    fontSize: "15px",
                },
                "& .MuiDataGrid-cellContent": {
                    fontSize: "15px",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.white[100],
                    border: `2px solid ${colors.paleBlue[800]}`
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.paleBlue[800],
                    color: `${colors.white[100]} !important`,
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.paleBlue[400]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.paleBlue[800]} !important`,
                },
            }}
        >
            {
                rows ? <DataGrid
                    // checkboxSelection
                    getRowId={(row) => row._id}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pinnedColumns: { left: ['name'], right: ['actions'] },
                    }}

                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePageChange}
                    rowCount={total}
                    loading={loading}

                    components={{ Toolbar: GridToolbar }}

                /> : <Loading open={loading ? true : false} />
            }
        </Box>
    )
}

export default DataTable
