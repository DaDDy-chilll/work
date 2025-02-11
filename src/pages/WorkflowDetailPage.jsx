/* eslint-disable react/prop-types */
import { Box, CircularProgress, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';
import DepartmentLists from '../components/form/DepartmentLists';
import { useGetWorkflowDetail } from '../api/workflow';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import DepartmentMemberLists from '../components/form/DepartmentMemberLists';
import LinkButton from '../components/ui/LinkButton';
import { usePageTitle } from '../hooks';
import { WORKFLOW_TYPES_LIST } from '@/constants';
import WorkflowRoute from '../components/ui/WorkflowRoute';
import { getDepartmentsFromWorkflow } from '../helpers';
const Item = ({ fieldName, value, sx, onClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minWidth: '30%',
      }}
    >
      <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
        {fieldName}
      </Typography>
      <Typography
        sx={{ ...sx, cursor: onClick ? 'pointer' : 'default' }}
        onClick={onClick}
      >
        {value}
      </Typography>
    </Box>
  );
};

const WorkflowDetailPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { pageTitle, setPageTitle } = usePageTitle('Workflow Detail');

  const navigate = useNavigate();

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const workflowType = orderId ? 'PURCHASE_ORDER' : 'PURCHASE_REQUEST';
  const { data: workflow, isLoading: workflowLoading } = useGetWorkflowDetail(
    id,
    workflowType,
  );

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

  console.log('payloads', workflow);

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
        <Box sx={{ display: 'flex', gap: 5, justifyContent: 'flex-start' }}>
          <Box
            sx={{
              display: 'flex',
              gap: 5,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginRight: '10%',
            }}
          >
            <Item
              sx={{ color: colors.black[100] }}
              fieldName="Workflow Title"
              value={workflow?.payload?.name}
            />

            <Item
              sx={{ color: colors.black[100] }}
              fieldName="Workflow Description"
              value={workflow?.payload?.description}
            />

            <Item
              sx={{ color: colors.black[100] }}
              fieldName="Private Work Flow ?"
              value={workflow?.payload?.type === 'normal' ? 'No' : 'Yes'}
            />
          </Box>

          <Item
            sx={{ color: colors.black[100] }}
            fieldName="Workflow Type"
            value={WORKFLOW_TYPES_LIST[workflow?.payload?.workflowType]}
          />
          {workflow?.payload?.workflowOrderId &&
            workflow?.payload?.reviewers && (
              <Item
                fieldName="Purchase Order Work Flow"
                value={
                  <WorkflowRoute
                    name={workflow?.payload?.workflowOrderId.name}
                    departments={getDepartmentsFromWorkflow(
                      workflow?.payload?.workflowOrderId.reviewers,
                    )}
                  />
                }
              />
            )}
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
