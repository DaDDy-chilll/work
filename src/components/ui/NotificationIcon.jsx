/* eslint-disable react/prop-types */
import { NotificationsNone } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import { colors } from '../../assets/theme/theme';

const Notifications = ({ notifications, setNotiOpen }) => {
  const unreadNotis = notifications?.payload?.filter(
    (noti) => noti.isOpen === false,
  );

  return (
    <IconButton onClick={() => setNotiOpen(true)}>
      <Badge
        badgeContent={unreadNotis.length}
        invisible={unreadNotis.length === 0 ? true : false}
        overlap="circular"
        sx={{
          '& .MuiBadge-badge': {
            fontSize: '13px',
            fontWeight: 500,
            color: colors.white[100],
            backgroundColor: colors.red[700],
          },
        }}
      >
        <NotificationsNone
          sx={{ fontSize: '32px', color: colors.paleBlue[800] }}
        />
      </Badge>
    </IconButton>
  );
};

export default Notifications;
