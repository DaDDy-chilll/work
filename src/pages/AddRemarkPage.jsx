import { Box, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';
import { useNavigate } from 'react-router';
import { usePageTitle } from '../hooks';
import RemarkForm from '../components/form/RemarkForm';
import { useParams } from 'react-router-dom';

const AddRemarkPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
        Give Decision
      </Typography>
      <Box bgcolor={colors.white[100]} borderRadius="1rem">
        <RemarkForm onClick={() => navigate(`/detail/${id}`)} />
      </Box>
    </Box>
  );
};

export default AddRemarkPage;
