/* eslint-disable react/prop-types */
import { Info } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';

const CustomTooltip = ({ innerText }) => {
  return (
    <Tooltip
      sx={{ bgcolor: colors.paleBlue[100] }}
      arrow
      placement="top-start"
      title={<Typography>{innerText}</Typography>}
    >
      <IconButton sx={{ color: colors.paleBlue[800] }}>
        <Info />
      </IconButton>
    </Tooltip>
  );
};

export default CustomTooltip;
