import { Box, CircularProgress } from '@mui/material';
import DataTable from '../components/ui/DataTable';
import { colors } from '../assets/theme/theme';
import { useGetInbox } from '../api';
import DocumentRow from '../components/row/DocumentRow';
import { DocumentColumn } from '../components/column/DocumentColumn';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import CustomPagination from '../components/shared/CustomPagination';
import { usePageTitle } from '../hooks';

const InboxPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { pageTitle, setPageTitle } = usePageTitle('Inbox');

  const [page, setPage] = useState(1);

  const { isError, error, data, isFetching } = useGetInbox({
    sort: '-createdAt',
    page,
    limit: 10,
  });

  if (isError) return <p>Error: {error?.response?.data?.message}</p>;

  return (
    <Box m={2} borderRadius="1rem" bgcolor={colors.white[100]}>
      <Navbar />
      <Box p={3}>
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
      </Box>
    </Box>
  );
};

export default InboxPage;
