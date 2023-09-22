/* eslint-disable react/prop-types */
import { Box, CircularProgress, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';
import DepartmentLists from '../components/form/DepartmentLists';
import { useGetWorkflowDetail } from '../api/workflow';
import { useParams } from 'react-router-dom';
import DepartmentMemberLists from '../components/form/DepartmentMemberLists';
import LinkButton from '../components/ui/LinkButton';

const Item = ({ fieldName, value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minWidth: '30%',
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        {fieldName}
      </Typography>
      {value}
    </Box>
  );
};

const WorkflowDetailPage = () => {
  const { id } = useParams();
  const { data: workflow, isLoading: workflowLoading } =
    useGetWorkflowDetail(id);

  let payloads;

  if (workflow) {
    let departments = [];
    workflow?.payload?.reviewers.forEach((r) => {
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
      <Typography variant="h1">View Workflow Detail</Typography>
      <Box
        bgcolor={colors.white[100]}
        borderRadius="1rem"
        py={3}
        px={5}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Item fieldName="Workflow Title" value={workflow?.payload?.name} />
          <Item
            fieldName="Workflow Description"
            value={workflow?.payload?.description}
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
                <DepartmentMemberLists key={i} department={department} />
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
            to="/workflows"
            variant="contained"
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WorkflowDetailPage;
