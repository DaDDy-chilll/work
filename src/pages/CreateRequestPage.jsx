import { Box, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';
import { transformDate } from '../helpers';
import DocumentForm from '../components/form/DocumentForm';
import { useNavigate } from 'react-router';

const CreateRequestPage = () => {
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
      <Typography variant="h1">Create New Request</Typography>
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
          {transformDate(Date.now())}
        </Box>
        <DocumentForm
          oldData={undefined}
          onClick={() => navigate('/my-requests')}
        />
      </Box>
    </Box>
  );
};

export default CreateRequestPage;
