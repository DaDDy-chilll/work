/* eslint-disable react/prop-types */
import { Avatar, Box, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';
import { getDuration } from '../../helpers';

const NotificationDetail = ({ noti }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          backgroundColor: colors.paleBlue[800],
          width: '2.5rem',
          height: '2.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
        }}
      >
        <Avatar
          sx={{ bgcolor: colors.paleBlue[800], textTransform: 'capitalize' }}
          alt={noti?.from?.name}
          src="/static/images/avatar/1.jpg"
        />
      </Box>
      <Box>
        <Typography sx={{ fontSize: '14px', fontWeight: 400, mx: 1 }}>
          <Typography
            sx={{
              textTransform: 'lowercase',
              fontSize: '14px',
              fontWeight: 400,
              color: colors.black[200],
              display: 'flex',
              gap: 1,
            }}
          >
            <Typography sx={{ textTransform: 'capitalize', fontWeight: 600 }}>
              {noti?.from?.name}
            </Typography>{' '}
            {noti?.action}{' '}
            {noti?.action === 'SUBMITTED' ? 'a form.' : 'your requested form.'}
          </Typography>
        </Typography>
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 400,
            mx: 1,
            color: colors.grey[800],
          }}
        >
          {getDuration(noti?.createdAt)}
        </Typography>
      </Box>
    </Box>
  );
};

export default NotificationDetail;
