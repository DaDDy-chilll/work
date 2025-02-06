/* eslint-disable react/prop-types */
import { TableBody } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../styled';
import WorkflowRoute from '../ui/WorkflowRoute';
import { getDepartmentsFromWorkflow } from '../../helpers';
import { TableActionButton } from '@/components';
import { Error } from '@mui/icons-material';
import { WORKFLOW_TYPES_LIST } from '@/constants';
const WorkflowRow = ({ payload }) => {
console.log(payload)
  return (
    <TableBody>
      {payload &&
        payload.map((data) => (
          <StyledTableRow key={data?._id}>
            <StyledTableCell>
              <div className="flex gap-1 items-center">
                {data?.isDisabled && <Error className="text-xl text-red-500" />}
                <span>{data?.groupId}</span>
              </div>
            </StyledTableCell>
            <StyledTableCell>{data?.name}</StyledTableCell>
            <StyledTableCell>{data?.description}</StyledTableCell>
            <StyledTableCell>
              <WorkflowRoute
                departments={getDepartmentsFromWorkflow(data?.reviewers)}
              />
            </StyledTableCell>
            <StyledTableCell>
              {WORKFLOW_TYPES_LIST[data?.workflowType]}
            </StyledTableCell>
            <StyledTableCell align="center" sx={{ display: 'flex', gap: 1 }}>
              <TableActionButton id={data?._id} orderId={data?.workflowOrderId || ''} />
            </StyledTableCell>
          </StyledTableRow>
        ))}
    </TableBody>
  );
};

export default WorkflowRow;
