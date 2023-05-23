import { Box } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { colors } from '../../utils/theme';
import Loading from '../mains/Loading';

const DataTable = ({ rows, columns, loading, pageOptions }) => {
    
    const [pageSize, setPageSize] = useState(12);

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
                    checkboxSelection
                    getRowId={(row) => row._id}
                    rows={rows}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 20, 30]}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    components={{ Toolbar: GridToolbar }}
                    initialState={{ pinnedColumns: { left: ['name'], right: ['actions'] } }}
                    
                /> : <Loading open={loading ? true : false} />
            }
        </Box>
    )
}

export default DataTable
