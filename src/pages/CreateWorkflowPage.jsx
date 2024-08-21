import { Box, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';
import { useDisclosure } from '../hooks/useDisclosure';
import { usePageTitle } from '../hooks';
import { WorkflowForm } from '@/features/workflow';

const CreateWorkflowPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { pageTitle, setPageTitle } = usePageTitle('Create Workflow');

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
      <Typography
        variant="h2"
        sx={{ fontWeight: 500, color: colors.black[100] }}
      >
        Create New Work Flow
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <Box bgcolor={colors.white[100]} borderRadius="1rem" py={3} px={5}>
          <WorkflowForm isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateWorkflowPage;
