/* eslint-disable react/prop-types */
import { TableBody } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../styled';
import WorkflowRoute from '../ui/WorkflowRoute';
import { getDepartmentsFromWorkflow } from '../../helpers';
import LinkButton from '../ui/LinkButton';
import { useNavigate } from 'react-router-dom';

const WorkflowRow = ({ payload }) => {
  const navigate = useNavigate();
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
            <StyledTableCell>
              <LinkButton
                width="100px"
                innerText="View"
                onClick={() => navigate(`/workflows/detail/${data._id}`)}
                variant="contained"
                color="primary"
              />
            </StyledTableCell>
          </StyledTableRow>
        ))}
    </TableBody>
  );
};

export default WorkflowRow;
