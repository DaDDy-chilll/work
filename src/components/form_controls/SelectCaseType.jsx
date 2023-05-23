import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { colors } from '../../utils/theme'

const SelectCaseType = ({ documentCase, handleChange }) => {    

    const types = [
        "OPEN",
        "CLOSED"
    ]

    return (
        <FormControl variant="filled" sx={{ width: "220px", backgroundColor: colors.white[100] }}>
            <InputLabel id="demo-simple-select-filled-label">
                Select Case Type
            </InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={documentCase}
                name="type"
                sx={{ backgroundColor: colors.white[100] }}
                onChange={(e) => handleChange(e.target.value)}
            >
                {types.map((type, i) => (
                    <MenuItem sx={{ textTransform: "capitalize" }} value={type} key={i}>
                        {type}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectCaseType
