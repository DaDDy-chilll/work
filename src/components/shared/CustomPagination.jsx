/* eslint-disable react/prop-types */
import { Box, Pagination } from '@mui/material';
import { colors } from '../../assets/theme/theme';

const CustomPagination = ({ count, page, onChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Pagination
        count={count}
        shape="rounded"
        color="primary"
        sx={{ bgcolor: colors.white[100] }}
        size="large"
        page={page}
        onChange={onChange}
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default CustomPagination;
