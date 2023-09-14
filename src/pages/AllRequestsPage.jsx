import { Box, CircularProgress, Pagination } from '@mui/material';
import DataTable from '../components/ui/DataTable';
import { colors } from '../assets/theme/theme';
import { useGetAllRequests } from '../api';
import DocumentRow from '../components/row/DocumentRow';
import { DocumentColumn } from '../components/column/DocumentColumn';
import { useState } from 'react';

const AllRequestsPage = () => {
  const [page, setPage] = useState(1)

  const {
    isError,
    error,
    data,
    isFetching,
  } = useGetAllRequests(page)

  if (isError) return <p>Error: {error.message}</p>

  return (
    <Box sx={{ mt: 2 }}>
      {
        isFetching ?
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={56} />
          </Box>
          :
          <>
            <DataTable
              columns={DocumentColumn}
              rows={<DocumentRow payload={data?.payload} />}
              hasAction={false}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <Pagination
                count={Math.ceil(data?.total / 10)}
                shape="rounded"
                color="primary"
                sx={{ bgcolor: colors.white[100] }}
                size="large"
                page={page}
                onChange={(_e, value) => {
                  setPage(value)
                }}
              />
            </Box>
          </>
      }
    </Box>
  );
};

export default AllRequestsPage;
