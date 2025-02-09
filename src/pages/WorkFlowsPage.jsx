import { Box, CircularProgress } from '@mui/material';
import DataTable from '../components/ui/DataTable';
import { colors } from '../assets/theme/theme';
import { useGetAllWorkflows } from '../api';
import { WorkflowColumn } from '../components/column';
import WorkflowRow from '../components/row/WorkflowRow';
import LinkButton from '../components/ui/LinkButton';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { AddOutlined } from '@mui/icons-material';
import CustomPagination from '../components/shared/CustomPagination';
import { usePageTitle } from '../hooks';
import SearchBox from '../components/shared/SearchBox';
import WorkFlowTypeFilter from '../components/ui/WorkFlowTypeFilter';

const WorkFlowsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [workflowType, setWorkflowType] = useState('');
  // eslint-disable-next-line no-unused-vars
  const { pageTitle, setPageTitle } = usePageTitle('Workflows');

  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { isError, error, data, isFetching } = useGetAllWorkflows({
    search: searchValue,
    sort: '-createdAt',
    page,
    limit: 10,
    workflowType: workflowType,
  });

  

  if (isError) return <p>Error: {error?.response?.data?.message}</p>;

  return (
    <Box m={2} borderRadius="1rem" bgcolor={colors.white[100]}>
      <Navbar />
      <Box p={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
          <SearchBox setSearch={setSearchValue} placeholder="Search ID, Work Flow Title" />
          <Box sx={{ ml: 2 }}>
            <WorkFlowTypeFilter setWorkflowType={setWorkflowType} />
          </Box>
        </Box>
          <LinkButton
            icon={<AddOutlined sx={{ ml: 1 }} />}
            width="220px"
            color="primary"
            innerText="Create New Work Flow"
            onClick={() => navigate('/workflows/create')}
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

export default WorkFlowsPage;
