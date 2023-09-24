/* eslint-disable react/prop-types */
import { Info } from '@mui/icons-material';
import { Tooltip, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';

const CustomTooltip = ({ innerText }) => {
  return (
    <Tooltip
      sx={{ bgcolor: colors.paleBlue[100] }}
      arrow
      placement="top-start"
      title={<Typography sx={{ fontSize: '14px' }}>{innerText}</Typography>}
    >
      <Info
        sx={{
          fontSize: '22px',
          cursor: 'pointer',
          color: colors.paleBlue[800],
        }}
      />
    </Tooltip>
  );
};

export default CustomTooltip;
