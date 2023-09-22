import { Box, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';
import WorkFlowForm from '../components/form/WorkFlowForm';

const TestPage = () => {
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
      <Box bgcolor={colors.white[100]} borderRadius="1rem" py={3} px={5}>
        <WorkFlowForm />
      </Box>
    </Box>
  );
};

export default TestPage;
