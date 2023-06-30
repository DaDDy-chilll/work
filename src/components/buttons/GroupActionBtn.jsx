import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const GroupActionBtn = ({ id }) => {

    const navigate = useNavigate()

    const handleView = () => {
        navigate(`${id}`)
    }

    return (
        <Button variant="contained" color="primary" onClick={handleView}>
            View
        </Button>
    )
}

export default GroupActionBtn
