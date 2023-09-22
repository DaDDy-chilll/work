/* eslint-disable react/prop-types */
import { NotificationsNone } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import { colors } from '../../assets/theme/theme';

const Notifications = ({ notifications, setNotiOpen }) => {
  return (
    <IconButton onClick={() => setNotiOpen(true)}>
      <Badge
        badgeContent={notifications.total}
        invisible={notifications.total === 0 ? true : false}
        overlap="circular"
        sx={{
          '& .MuiBadge-badge': {
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
