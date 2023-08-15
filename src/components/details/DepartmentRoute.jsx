import { Box } from '@mui/material'
import React from 'react'
import { colors } from '../../utils/theme'

const DepartmentRoute = ({ name, departments }) => {
    const concatString = ">>"
    return (
        <Box sx={{ display: "flex", gap: 1 }}>
            {
                departments.map((department, i) => (
                    <>
                        <span style={{ color: colors.paleBlue[800] }}>{department}</span>
                        {
                            i !== departments.length - 1 && <span>{concatString}</span>   
                        }                  
                    </>
                ))
            }
            {
                name && <span>({name})</span>
            }
        </Box>
    )
}

export default DepartmentRoute