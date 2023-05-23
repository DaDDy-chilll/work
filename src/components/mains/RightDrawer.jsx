import { Close, DescriptionOutlined } from '@mui/icons-material'
import { Box, Drawer, IconButton, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import { colors } from '../../utils/theme'
import axios from 'axios'
import { notiRoute } from '../../utils/APIRoutes'
import Cookies from 'js-cookie'
import { toastOptions } from '../../utils/toastOptions'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getDuration, getNotiText } from '../../helpers'
import Loading from './Loading'

const RightDrawer = ({ open, setOpen, notis, me }) => {

  const navigate = useNavigate()

  const accessToken = Cookies.get('accessToken')

  const [loading, setLoading] = useState(false)

  const handleOpen = async ({ _id, documentId }) => {

    try {

      setOpen(false)

      setLoading(true)

      const { data } = await axios.patch(`${notiRoute}/${_id}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          }
        }
      );

      setLoading(false)

      // toNavigate({ action, documentId })
      if (me.role === "BASIC") navigate(`/${documentId}`)
      if (me.role === "AUTHORIZED") navigate(`/all/${documentId}`)


    } catch (err) {
      return toast.error(err.response.data.message, toastOptions);
    }
  }

  return (
    <>
      <Loading open={loading ? true : false} />
      <Drawer
        open={open}
        anchor={"right"}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "413px",
          },
        }}
      >

        {/* {getList()} */}
        <ListItem>
          <ListItemText
            disableTypography
            primary={
              <Box
                sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}
              >
                <Typography variant="h2" style={{ color: '#000' }}>Notifications</Typography>
                <IconButton onClick={() => setOpen(false)}>
                  <Close sx={{ color: colors.grey[800] }} />
                </IconButton>
              </Box>
            }
          />
        </ListItem>
        {
          notis && notis.map((noti) => (
            <ListItem
              key={noti._id}
              sx={{ bgcolor: noti.isOpen ? colors.white[100] : colors.bgColor }}
              onClick={() => handleOpen({ _id: noti._id, documentId: noti.documentId })}
            >
              <ListItemText
                disableTypography
                primary={
                  <Box
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        backgroundColor: colors.paleBlue[800],
                        py: "8px",
                        px: "10px",
                        borderRadius: "50%"
                      }}
                    >
                      <DescriptionOutlined sx={{ color: colors.white[100] }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" mx='10px'>
                        {getNotiText({ from: noti.from.name, action: noti.action })}
                      </Typography>
                      <Typography sx={{ fontSize: "10px" }} mx='10px'>
                        {getDuration(noti.createdAt)}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          ))
        }
      </Drawer>
    </>
  )
}

export default RightDrawer
