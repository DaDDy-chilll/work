import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { colors } from "../../utils/theme";
import { financialAccess, normalAccess, requestAccess } from "../../utils/accessControl";

// icons
import { ArticleOutlined, MenuOutlined, PaidOutlined, PeopleOutlined, PublishOutlined, RequestQuoteOutlined } from '@mui/icons-material';

// image
import ParamiHospital from "../../assets/ParamiHospital.png"

const Item = ({ title, to, icon, selected, setSelected }) => {
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.white[100],
                margin: "3px",
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography variant="h4">{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const Sidebar = ({ me }) => {

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.paleBlue[800]} !important`,
                    minHeight: "100vh"
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item:hover": {
                    backgroundColor: `${colors.white[100]} !important`,
                    color: `${colors.paleBlue[800]} !important`,
                    borderRadius: "10px",

                },
                "& .pro-menu-item.active": {
                    backgroundColor: `${colors.white[100]} !important`,
                    color: `${colors.paleBlue[800]} !important`,
                    borderRadius: "10px",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mx="15px"
                        my="10px"
                    >
                        {
                            !isCollapsed &&
                            <img style={{ width: "103.6px", height: "37px", objectFit: "cover" }} src={ParamiHospital} alt="" />
                        }
                        <IconButton
                            color="secondary" onClick={() => setIsCollapsed(!isCollapsed)}
                            sx={{ mx: isCollapsed && "5px" }}
                        >
                            <MenuOutlined />
                        </IconButton>
                    </Box>
                    {/* user */}
                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Avatar
                                    alt={me.name}
                                    sx={{ width: 81, height: 81, fontSize: "36px", bgcolor: colors.white[100], color: colors.paleBlue[800] }}
                                    src="/static/images/avatar/1.jpg"
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.white[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0" }}
                                >
                                    {me && me.name}
                                </Typography>
                                <Typography variant="h4" color={colors.white[100]}>
                                    {me && me.email}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box>
                        {
                            normalAccess.includes(me.role) &&
                            <>
                                <Item
                                    title="My Requests"
                                    to="/"
                                    icon={<PublishOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title="My Financial Requests"
                                    to="/myFinancials"
                                    icon={<RequestQuoteOutlined />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        }
                        {
                            requestAccess.includes(me.role) &&
                            <Item
                                title="Admin Dept"
                                to="/requests"
                                icon={<ArticleOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        }

                        {
                            financialAccess.includes(me.role) &&
                            <Item
                                title="FAD Dept"
                                to="/financials"
                                icon={<PaidOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        }

                        {
                            me.role === "superadmin" &&
                            <Item
                                title="Users"
                                to="/users"
                                icon={<PeopleOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        }
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
