/* eslint-disable react/prop-types */
import { TableBody } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../styled';
import WorkflowRoute from '../ui/WorkflowRoute';
import { getDepartmentsFromWorkflow } from '../../helpers';

const WorkflowRow = ({ payload }) => {
  return (
    <TableBody>
      {payload &&
        payload.map((data) => (
          <StyledTableRow key={data?._id}>
            <StyledTableCell>{data?.groupId}</StyledTableCell>
            <StyledTableCell>{data?.name}</StyledTableCell>
            <StyledTableCell>{data?.description}</StyledTableCell>
            <StyledTableCell>
              <WorkflowRoute
                departments={getDepartmentsFromWorkflow(data?.reviewers)}
              />
            </StyledTableCell>
          </StyledTableRow>
        ))}
    </TableBody>
  );
};

export default WorkflowRow;
