import { Box, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { colors } from '../../utils/theme';
import Loading from '../mains/Loading';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const DataTable = ({
    rows,
    rowCount,
    columns,
    loading,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange
}) => {
    console.log({loading});

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
                // loading && page === 1 ? <Loading open={loading} /> :
                rows && <DataGrid
                    // autoHeight
                    rows={rows}
                    rowCount={rowCount}
                    loading={loading}
                    rowsPerPageOptions={[10, 30, 50, 70, 100]}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode="server"
                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                    columns={columns}

                    getRowId={(row) => row._id}

                    components={{ Toolbar: GridToolbar }}
                    initialState={{ pinnedColumns: { left: ['name'], right: ['actions'] } }}                   

                />
                
                // : <Loading open={true} />
            }
        </Box>
    )
}

export default DataTable
