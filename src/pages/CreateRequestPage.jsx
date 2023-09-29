import { Box, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';
import { transformLocalTime } from '../helpers';
import DocumentForm from '../components/form/DocumentForm';
import { useNavigate } from 'react-router';
import { usePageTitle } from '../hooks';

const CreateRequestPage = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { pageTitle, setPageTitle } = usePageTitle('Create Request');

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
        Create New Request
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
          oldData={undefined}
          onClick={() => navigate('/my-requests')}
        />
      </Box>
    </Box>
  );
};

export default CreateRequestPage;
