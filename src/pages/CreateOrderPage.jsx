import { Box, Button, Typography } from '@mui/material';
import { transformLocalTime } from '../helpers';
import DocumentForm from '../components/form/DocumentForm';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { colors } from '../assets/theme/theme';
import { WORKFLOW_TYPES_LIST } from '../constants';

const CreateOrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const doc = searchParams.get('doc');
  const orderId = searchParams.get('orderId');
  // const flowType = searchParams.get('workflowType');
  const isPurchaseRequest = location.pathname.includes('purchase-request');
  const isPurchaseOrder = location.pathname.includes('purchase-order');


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          my: 2,
          mx: 'auto',
          width: '100%',
          px: 2,
        }}
      >
      {doc && (

        <Box display="flex" justifyContent="start" gap={2}>
        <Button
            sx={{
              borderRadius: '5vmax',
              width: '15%',
            }}
            type="submit"
            color="primary"
            variant={isPurchaseOrder ? 'contained' : 'outlined'}

          >
            Purchase Order
          </Button>
          <Button
            sx={{
              borderRadius: '5vmax',
              width: '15%',
            }}
            type="submit"
            color="primary"
            variant={isPurchaseRequest ? 'contained' : 'outlined'}
            onClick={() => navigate(`/detail/${doc}?workflowType=PURCHASE_REQUEST&doc=${id}&orderId=${orderId}`)}
          >
            Purchase Request
          </Button>
       
        </Box>
      )}
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
            workflowType={Object.keys(WORKFLOW_TYPES_LIST)[1]}
            oldData={undefined}
            onClick={() => navigate(-1)}
            originalDocumentId={doc}
            orderId={orderId}
          />
        </Box>
      </Box>
    </>
  );
};

export default CreateOrderPage;
