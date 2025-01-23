import { Box, Typography } from '@mui/material';
import { transformLocalTime } from '../helpers';
import DocumentForm from '../components/form/DocumentForm';
import { useNavigate } from 'react-router-dom';
import { colors } from '../assets/theme/theme';

const CreateOrderPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        my: 2,
        mx: 'auto',
        width: '80%',
      }}
    >
      <Typography
        variant="h2"
        sx={{ fontWeight: 500, color: colors.black[100] }}
      >
        Create Purchase Order
      </Typography>
      <Box bgcolor={colors.white[100]} borderRadius="1rem">
        <Box
          sx={{
            borderBottom: `1px solid ${colors.grey[400]}`,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 5,
            fontSize: '20px',
            fontWeight: 500,
            color: colors.black[100],
          }}
        >
          {transformLocalTime(Date.now()).date}
        </Box>
        <DocumentForm
          workflowType="PURCHASE_ORDER"
          oldData={undefined}
          onClick={() => navigate('/purchase-order')}
        />
      </Box>
    </Box>
  );
};

export default CreateOrderPage;
