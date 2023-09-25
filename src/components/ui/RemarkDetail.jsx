/* eslint-disable react/prop-types */
import { ApartmentOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';
import { changeTextColor, transformDate, transformTime } from '../../helpers';

const RemarkDetail = ({ remark }) => {
  console.log(remark);

  const textColor = changeTextColor({ action: remark.action });
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Typography
          sx={{ textTransform: 'capitalize' }}
          fontSize="14px"
          fontWeight={500}
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
          <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>
            {remark.actor.department.name}
          </Typography>
        </Box>
      </Box>
      <div
        style={{ fontSize: '16px', fontWeight: 400 }}
        dangerouslySetInnerHTML={{ __html: remark.content }}
      />
      <Typography
        fontSize="14px"
        fontWeight={500}
        component="span"
        color={colors.darkBlue[800]}
      >
        {transformDate(remark?.createdAt)}{' '}
        <span style={{ color: colors.red[800] }}>
          {transformTime(remark?.createdAt)}
        </span>
      </Typography>
    </Box>
  );
};

export default RemarkDetail;
