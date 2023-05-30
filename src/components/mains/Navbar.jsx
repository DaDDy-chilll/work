import { ArticleOutlined, Groups, PeopleOutlined, PublishOutlined } from '@mui/icons-material';
import { Box, Button } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { departmentAccess, groupAccess, normalAccess, userAccess } from '../../utils/accessControl'

const Item = ({ title, to, icon, selected, setSelected }) => {
    return (
        <Link to={to} style={{ textDecoration: "none" }}>
            <Button
                variant='contained' sx={{ borderRadius: "50px" }} 
                onClick={() => setSelected(title)}
                color={selected === title ? "primary" : 'secondary'}
            > {icon} {title}</Button>
        </Link>
    );
};

const Navbar = ({ me }) => {
    const isActive = (path) => {
        return window.location.pathname.includes(path)
    }

    const [selected, setSelected] = useState(
        isActive("all") ? "All Requests" :
        isActive("inbox") ? "Inbox" :
        isActive("to-acknowledge") ? "To Acknowledge" :
        isActive("users") ? "Users" :
        isActive("work-flows") ? "Work Flows" : 
        isActive("departments") ? "Departments" : "My Requests"
    );

    return (
        <Box display="flex" gap="10px">            
            {
                normalAccess.includes(me.role) &&
                <Item title="My Requests" to="/" selected={selected} setSelected={setSelected} icon={<PublishOutlined sx={{ mr: 1 }} />} />
            }
            {
                normalAccess.includes(me.role) &&
                <Item title="All Requests" to="/all" selected={selected} setSelected={setSelected} icon={<PublishOutlined sx={{ mr: 1 }} />} />
            }
            {
                normalAccess.includes(me.role) &&
                <Item title="Inbox" to="/inbox" selected={selected} setSelected={setSelected} icon={<ArticleOutlined sx={{ mr: 1 }} />} />
            }
            {
                normalAccess.includes(me.role) &&
                <Item title="To Acknowledge" to="/to-acknowledge" selected={selected} setSelected={setSelected} icon={<ArticleOutlined sx={{ mr: 1 }} />} />
            }            
            
            {/* FOR SUPERADMIN */}
            {
                userAccess.includes(me.role) &&
                <Item title="Users" to="/users" selected={selected} setSelected={setSelected} icon={<PeopleOutlined sx={{ mr: 1 }} />} />
            }
            {
                groupAccess.includes(me.role) &&
                <Item title="Work Flows" to="/work-flows" selected={selected} setSelected={setSelected} icon={<Groups sx={{ mr: 1 }} />} />
            }
            {
                departmentAccess.includes(me.role) &&
                <Item title="Departments" to="/departments" selected={selected} setSelected={setSelected} icon={<Groups sx={{ mr: 1 }} />} />
            }
        </Box>
    )
}

export default Navbar
