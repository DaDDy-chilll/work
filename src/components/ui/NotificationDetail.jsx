/* eslint-disable react/prop-types */
import { Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';

const NotificationDetail = ({ from, action }) => {
  console.log(action);
  return (
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
        {from}
      </Typography>{' '}
      {action} {action === 'SUBMITTED' ? 'a form.' : 'your requested form.'}
    </Typography>
  );
};

export default NotificationDetail;
