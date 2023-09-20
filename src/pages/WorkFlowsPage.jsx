import { Box, CircularProgress, Pagination } from '@mui/material';
import DataTable from '../components/ui/DataTable';
import { colors } from '../assets/theme/theme';
import { useGetAllWorkflows } from '../api';
import { WorkflowColumn } from '../components/column';
import WorkflowRow from '../components/row/WorkflowRow';
import LinkButton from '../components/ui/LinkButton';
import { useState } from 'react';
import Navbar from '../components/Navbar';

const WorkFlowsPage = () => {
  const [page, setPage] = useState(1);

  const { isError, error, data, isFetching } = useGetAllWorkflows({
    page,
    limit: 10,
  });

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Box m={3} borderRadius="1rem" bgcolor={colors.white[100]}>
      <Navbar />
      <Box p={3}>
        <Box sx={{ display: 'flex', justifyContent: 'right', mb: '20px' }}>
          <LinkButton
            width="200px"
            color="primary"
            innerText="Create New Work Flow"
            to={'/workflows/create'}
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
                columns={WorkflowColumn}
                rows={<WorkflowRow payload={data?.payload} />}
                hasAction={false}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                  count={Math.ceil(data?.total / 10)}
                  shape="rounded"
                  color="primary"
                  sx={{ bgcolor: colors.white[100] }}
                  size="large"
                  page={page}
                  onChange={(_e, value) => {
                    setPage(value);
                  }}
                />
              </Box>
            </>
          )}
        </>
      </Box>
    </Box>
  );
};

export default WorkFlowsPage;
