/* eslint-disable react/prop-types */
import { ApartmentOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';
import { changeTextColor } from '../../helpers';

const RemarkDetail = ({ remark }) => {
  const textColor = changeTextColor({ action: remark.action });
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Typography
          sx={{ textTransform: 'capitalize' }}
          variant="h5"
          fontWeight="bold"
          color={textColor && textColor}
          component="span"
        >
          {remark.action} by {remark.actor.name}
        </Typography>
        <Box
          sx={{
            border: `0.3px solid ${colors.grey[500]}`,
            px: 1,
            py: '3px',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <ApartmentOutlined fontSize="small" />
          <Typography variant="h6">{remark.actor.department.name}</Typography>
        </Box>
      </Box>
      <div dangerouslySetInnerHTML={{ __html: remark.content }} />
    </Box>
  );
};

export default RemarkDetail;
