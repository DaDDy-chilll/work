import { Box, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';
import WorkFlowForm from '../components/form/WorkFlowForm';
import FormProgressBar from '../components/form/FormProgressBar';
import { useDisclosure } from '../hooks/useDisclosure';

const CreateWorkflowPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
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
      <Box sx={{ position: 'relative' }}>
        <FormProgressBar isOpen={isOpen} />
        <Box bgcolor={colors.white[100]} borderRadius="1rem" py={3} px={5}>
          <WorkFlowForm isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateWorkflowPage;
