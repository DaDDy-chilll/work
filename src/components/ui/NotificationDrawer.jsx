/* eslint-disable react/prop-types */
import { Close, DescriptionOutlined } from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useOpenNotification } from '../../api';
import { getDuration, getNotiText } from '../../helpers';
import { colors } from '../../assets/theme/theme';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

const NotificationDrawer = ({ setNotiOpen, notiOpen, notifications }) => {
  console.log({ notifications });

  const { mutate: openNotification } = useOpenNotification();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleOpen = ({ id, documentId }) => {
    openNotification(id, {
      onSettled: () => {
        queryClient.invalidateQueries(['notifications']);
        navigate(`/detail/${documentId}`);
      },
    });
  };

  return (
    <Drawer
      open={notiOpen}
      anchor={'right'}
      onClose={() => setNotiOpen(false)}
      PaperProps={{
        sx: {
          width: '413px',
        },
      }}
    >
      <ListItem>
        <ListItemText
          disableTypography
          primary={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h2" style={{ color: '#000' }}>
                Notifications
              </Typography>
              <IconButton onClick={() => setNotiOpen(false)}>
                <Close sx={{ color: colors.grey[800] }} />
              </IconButton>
            </Box>
          }
        />
      </ListItem>
      {notifications &&
        notifications?.total !== 0 &&
        notifications?.payload?.map((noti) => (
          <ListItem
            key={noti?._id}
            sx={{
              bgcolor: noti?.isOpen ? colors.white[100] : colors.bgColor,
              cursor: 'pointer',
            }}
            onClick={() =>
              handleOpen({ id: noti?._id, documentId: noti?.documentId })
            }
          >
            <ListItemText
              disableTypography
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      backgroundColor: colors.paleBlue[800],
                      py: '8px',
                      px: '10px',
                      borderRadius: '50%',
                    }}
                  >
                    <DescriptionOutlined sx={{ color: colors.white[100] }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" mx="10px">
                      {getNotiText({
                        from: noti?.from?.name,
                        action: noti?.action,
                      })}
                    </Typography>
                    <Typography sx={{ fontSize: '10px' }} mx="10px">
                      {getDuration(noti?.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </ListItem>
        ))}
    </Drawer>
  );
};

export default NotificationDrawer;
