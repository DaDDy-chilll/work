import { Box, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';
import { transformDate } from '../helpers';
import DocumentForm from '../components/form/DocumentForm';
import { useGetDocumentDetail } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const EditRequestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetDocumentDetail(id);

  let oldData;

  if (data?.payload) {
    oldData = {
      name: data?.payload?.name,
      description: data?.payload?.description,
      amount: data?.payload?.amount,
    };
  }

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
      <Typography variant="h1">Edit Request</Typography>
      <Box bgcolor={colors.white[100]} borderRadius="1rem">
        <Box
          sx={{
            borderBottom: `1px solid ${colors.grey[400]}`,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 5,
          }}
        >
          {transformDate(data?.payload?.createdAt)}
        </Box>
        <DocumentForm
          oldData={oldData}
          onClick={() => navigate(`/detail/${id}`)}
        />
      </Box>
    </Box>
  );
};

export default EditRequestPage;
