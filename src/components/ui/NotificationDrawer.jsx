/* eslint-disable react/prop-types */
import { Close, DescriptionOutlined } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useInfiniteNotifications, useOpenNotification } from '../../api';
import { getDuration, getNotiText } from '../../helpers';
import { colors } from '../../assets/theme/theme';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import React, { useEffect } from 'react';

// eslint-disable-next-line react/display-name
const Item = React.forwardRef(({ noti, handleOpen }, ref) => {
  const itemContent = (
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
  );

  const content = ref ? (
    <div ref={ref}>{itemContent}</div>
  ) : (
    <div>{itemContent}</div>
  );
  return content;
});

const NotificationDrawer = ({ setNotiOpen, notiOpen }) => {
  const { ref, inView } = useInView();

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteNotifications();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const { mutate: openNotification } = useOpenNotification();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleOpen = ({ id, documentId }) => {
    openNotification(id, {
      onSettled: () => {
        setNotiOpen(false);
        queryClient.invalidateQueries(['notifications']);
        navigate(`/detail/${documentId}`);
      },
    });
  };

  const content =
    isSuccess &&
    data.pages.map(
      (page) =>
        page?.payload &&
        page?.payload?.map((noti, i) => {
          if (page?.payload?.length === i + 1) {
            return (
              <Item
                ref={ref}
                key={noti._id}
                noti={noti}
                handleOpen={handleOpen}
              />
            );
          }
          return <Item key={noti._id} noti={noti} handleOpen={handleOpen} />;
        }),
    );

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
      {content}
      <div className="flex justify-center">
        {isFetchingNextPage && <CircularProgress />}
        {isLoading && <CircularProgress />}
      </div>
    </Drawer>
  );
};

export default NotificationDrawer;
