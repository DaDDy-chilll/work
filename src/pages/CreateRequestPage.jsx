import { Box, Paper, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';
import { transformDate } from '../helpers';
import DocumentForm from '../components/form/DocumentForm';

const CreateRequestPage = () => {
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
          {transformDate(Date.now())}
        </Box>
        <DocumentForm oldData={undefined} />
      </Paper>
    </Box>
  );
};

export default CreateRequestPage;
