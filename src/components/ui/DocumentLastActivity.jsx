/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import {
  changeBgColor,
  changeTextColor,
  transformLastActivity,
} from '../../helpers';
import { colors } from '../../assets/theme/theme';

const DocumentLastActivity = ({ lastActivity }) => {
  const textColor = changeTextColor({
    action: transformLastActivity(lastActivity?.action),
  });

  const bgColor = changeBgColor({
    action: transformLastActivity(lastActivity?.action),
  });

  return (
    <Box
      sx={{
        backgroundColor: bgColor ? bgColor : colors.grey[600],
        p: 1,
        borderRadius: '50px',
      }}
    >
      <Typography
        sx={{
          color: textColor ? textColor : colors.grey[600],
          fontSize: '14px',
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        <span style={{ textTransform: 'capitalize' }}>
          {transformLastActivity(lastActivity?.action) === 'FORWARDED'
            ? 'Forwarded and Approved'
            : transformLastActivity(lastActivity?.action).toLowerCase()}
        </span>{' '}
        by {lastActivity?.actor?.name} ({lastActivity.department?.name})
      </Typography>
    </Box>
  );
};

export default DocumentLastActivity;
