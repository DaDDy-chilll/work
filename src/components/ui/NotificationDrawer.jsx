/* eslint-disable react/prop-types */
import { Close } from '@mui/icons-material';
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
import { colors } from '../../assets/theme/theme';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import React, { useEffect } from 'react';
import NotificationDetail from './NotificationDetail';

// eslint-disable-next-line react/display-name
const Item = React.forwardRef(({ noti, handleOpen, onClose }, ref) => {
  const handleClick = () => {
    handleOpen({ id: noti?._id, documentId: noti?.documentId,workflowType:noti?.workflowType });
    onClose();
  };

  const itemContent = (
    <ListItem
      key={noti?._id}
      sx={{
        bgcolor: noti?.isOpen ? colors.white[100] : colors.bgColor,
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <ListItemText
        disableTypography
        primary={<NotificationDetail noti={noti} />}
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
  
  const handleOpen = ({ id, documentId,workflowType }) => {
    openNotification(id, {
      onSettled: () => {
        setNotiOpen(false);
        queryClient.invalidateQueries(['notifications']);
        navigate(workflowType === 'PURCHASE_ORDER' ? `/detail/${documentId}?workflowType=PURCHASE_ORDER` : `/detail/${documentId}`);
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
                onClose={() => setNotiOpen(false)}
              />
            );
          }
          return (
            <Item
              key={noti._id}
              noti={noti}
              handleOpen={handleOpen}
              onClose={() => setNotiOpen(false)}
            />
          );
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
              <Typography variant="h1">Notifications</Typography>
              <IconButton onClick={() => setNotiOpen(false)}>
                <Close sx={{ color: colors.grey[800], fontSize: '32px' }} />
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
