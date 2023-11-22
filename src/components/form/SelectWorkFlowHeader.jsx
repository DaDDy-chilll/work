/* eslint-disable react/prop-types */
import { AccountTree, FavoriteBorder } from '@mui/icons-material';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SelectWorkFlowHeader = ({ index, onChange }) => {
  return (
    <Box sx={{ borderBottom: `1px solid ${colors.grey[400]}` }}>
      <Tabs value={index} onChange={onChange} aria-label="navbar-tab">
        <Tab
          {...tabProps(0)}
          label={
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 400,
                color: colors.black[100],
              }}
            >
              My Work Flows
            </Typography>
          }
          icon={<FavoriteBorder sx={{ fontSize: '20px' }} />}
          iconPosition="start"
        />
        <Tab
          {...tabProps(0)}
          label={
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 400,
                color: colors.black[100],
              }}
            >
              All Work Flows
            </Typography>
          }
          icon={<AccountTree sx={{ fontSize: '20px' }} />}
          iconPosition="start"
        />
      </Tabs>
    </Box>
  );
};

export default SelectWorkFlowHeader;
