import React, { useRef, useState } from "react";
import { Avatar, Badge, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";

// icons
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { colors } from "../../utils/theme";

// image
import ParamiHospital from "../../assets/ParamiHospital.png"
import { NotificationsNone } from "@mui/icons-material";
import RightDrawer from "./RightDrawer";
import { useGetNotificationsQuery } from "../../services/notificationSlice";
import { toastOptions } from "../../utils/toastOptions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { apiSlice } from "../../services/apiSlice";

const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);

  const onClose = () => setIsOpen(false);

  return { isOpen, onOpen, onClose };
};

const Topbar = ({ me }) => {
  const anchorEl = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [open, setOpen] = useState(false);

  const { data, error } = useGetNotificationsQuery()

  if (error) {
    toast.error(error.data.message, toastOptions)
  }

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove('accessToken')    
    navigate('/login')
    dispatch(apiSlice.util.resetApiState());
  }
  
  return (
    <>
      <Box
        sx={{
          color: colors.paleBlue[800],
          backgroundColor: colors.white[100],
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          m: "20px",
          borderRadius: "10px",
          p: 1
        }}
      >

        <img style={{ borderRight: `0.2px solid ${colors.grey[500]}` }} src={ParamiHospital} alt="" />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {
            data &&
            <>
              <IconButton onClick={() => setOpen(true)}>
                <Badge
                  badgeContent={
                    data.payload.filter((noti) => (noti.isOpen === false)).length
                  }
                  invisible={data.payload.filter((noti) => (noti.isOpen === false)).length === 0 ? true : false}
                  overlap="circular"
                  sx={{
                    "& .MuiBadge-badge": {
                      color: colors.white[100],
                      backgroundColor: colors.red[700],
                    }
                  }}
                >
                  <NotificationsNone sx={{ fontSize: "32px", color: colors.paleBlue[800] }} />
                </Badge>
              </IconButton>
              <RightDrawer open={open} setOpen={setOpen} notis={data && data.payload} me={me} />
            </>
          }
          <Box
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", borderLeft: `0.2px solid ${colors.grey[500]}`, pl: "10px" }}
            id="basic-button"
            aria-controls={isOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isOpen ? 'true' : undefined}
            onClick={onOpen}
            ref={anchorEl}
          >
            <Avatar sx={{ bgcolor: colors.paleBlue[800] }} alt={me.name} src="/static/images/avatar/1.jpg" />
            <Typography variant="h4" mx='10px'>{me.email}</Typography>
            <ArrowDropDownOutlinedIcon />
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl.current}
            open={isOpen}
            onClose={onClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default Topbar;