import { Box, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';
import { useNavigate } from 'react-router';
import { usePageTitle } from '../hooks';
import MentionForm from '../components/form/MentionForm';

const AddMentionPage = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { pageTitle, setPageTitle } = usePageTitle('Add Remark Page');

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
        Mention
      </Typography>
      <Box bgcolor={colors.white[100]} borderRadius="1rem">
        <MentionForm onClick={() => navigate('/')} />
      </Box>
    </Box>
  );
};

export default AddMentionPage;
