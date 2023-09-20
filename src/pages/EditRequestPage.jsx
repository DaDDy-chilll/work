import { Box, Paper, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';
import { transformDate } from '../helpers';
import DocumentForm from '../components/form/DocumentForm';
import { useGetDocumentDetail } from '../api';
import { useParams } from 'react-router-dom';

const EditRequestPage = () => {
  const { id } = useParams();

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
      <Paper sx={{ px: 5, py: 3 }}>
        <Box
          sx={{
            borderBottom: `1px solid ${colors.grey[400]}`,
            pb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            marginBottom: 2,
          }}
        >
          {transformDate(data?.payload?.createdAt)}
        </Box>
        <DocumentForm oldData={oldData} />
      </Paper>
    </Box>
  );
};

export default EditRequestPage;
