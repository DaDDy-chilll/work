import { Box, CircularProgress } from '@mui/material';
import DataTable from '../components/ui/DataTable';
import { colors } from '../assets/theme/theme';
import { useGetMyRequests } from '../api';
import LinkButton from '../components/ui/LinkButton';
import DocumentRow from '../components/row/DocumentRow';
import { DocumentColumn } from '../components/column/DocumentColumn';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AddOutlined } from '@mui/icons-material';
import CustomPagination from '../components/shared/CustomPagination';
import { usePageTitle } from '../hooks';

const MyRequestPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { pageTitle, setPageTitle } = usePageTitle('My Requests');

  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { isError, error, data, isFetching } = useGetMyRequests({
    sort: '-createdAt',
    page,
    limit: 10,
  });

  if (isError) return <p>Error: {error?.response?.data?.message}</p>;

  return (
    <Box m={2} borderRadius="1rem" bgcolor={colors.white[100]}>
      <Navbar />
      <Box p={3}>
        <Box sx={{ display: 'flex', justifyContent: 'right', mb: 1 }}>
          <LinkButton
            icon={<AddOutlined sx={{ ml: 1 }} />}
            width="200px"
            color="primary"
            innerText="Create New Request"
            onClick={() => navigate('/my-requests/create')}
            variant="contained"
          />
        </Box>
        <>
          {isFetching ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={56} />
            </Box>
          ) : (
            <>
              <DataTable
                columns={DocumentColumn}
                rows={<DocumentRow payload={data?.payload} />}
                hasAction={true}
              />
              <CustomPagination
                count={Math.ceil(data?.total / 10)}
                page={page}
                onChange={(_e, value) => {
                  setPage(value);
                }}
              />
            </>
          )}
        </>
      </Box>
    </Box>
  );
};

export default MyRequestPage;
