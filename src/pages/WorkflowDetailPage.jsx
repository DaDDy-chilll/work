/* eslint-disable react/prop-types */
import { Box, CircularProgress, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';
import DepartmentLists from '../components/form/DepartmentLists';
import { useGetWorkflowDetail } from '../api/workflow';
import { useNavigate, useParams } from 'react-router-dom';
import DepartmentMemberLists from '../components/form/DepartmentMemberLists';
import LinkButton from '../components/ui/LinkButton';
import { usePageTitle } from '../hooks';
import { WORKFLOW_TYPES_LIST } from '@/constants';
const Item = ({ fieldName, value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minWidth: '30%',
      }}
    >
      <Typography
        sx={{ fontSize: '16px', fontWeight: 'bold', color: colors.black[100] }}
      >
        {fieldName}
      </Typography>
      {value}
    </Box>
  );
};

const WorkflowDetailPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { pageTitle, setPageTitle } = usePageTitle('Workflow Detail');

  const navigate = useNavigate();

  const { id } = useParams();
  const { data: workflow, isLoading: workflowLoading } =
    useGetWorkflowDetail(id);

    console.log(workflow)

  let payloads;

  if (workflow) {
    let departments = [];
    workflow?.payload?.reviewers?.forEach((r) => {
      departments.push(r.reviewer.department.name);
    });

    departments = [...new Set([...departments])];

    payloads = departments.map((dpt) => {
      const users = workflow?.payload?.reviewers
        .filter((r) => r.reviewer.department.name === dpt)
        .map((user) => user.reviewer);
      return {
        name: dpt,
        users,
      };
    });
  }

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
        View Workflow Detail
      </Typography>
      <Box
        bgcolor={colors.white[100]}
        borderRadius="1rem"
        py={3}
        px={5}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <Box sx={{ display: 'flex', columnGap: 5, rowGap: 3 }}>
          <Item fieldName="Workflow Title" value={workflow?.payload?.name} />
          <Item
            fieldName="Workflow Description"
            value={workflow?.payload?.description}
          />
            <Item
            fieldName="Workflow Type"
            value={WORKFLOW_TYPES_LIST[workflow?.payload?.workflowType]}
          />
        </Box>
        {workflowLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <DepartmentLists departments={payloads}>
            {payloads &&
              payloads.map((department, i) => (
                <DepartmentMemberLists
                  key={i}
                  department={department}
                  isDetail={true}
                />
              ))}
          </DepartmentLists>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            borderTop: `1px solid ${colors.grey[400]}`,
            pt: 2,
            px: 4,
            gap: 1,
          }}
        >
          <LinkButton
            width="200px"
            innerText="Back"
            onClick={() => navigate('/workflows')}
            variant="contained"
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WorkflowDetailPage;
