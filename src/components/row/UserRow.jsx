/* eslint-disable react/prop-types */
import { TableBody } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../styled';
import TableActionButton from '../shared/TableActionButton';

const UserRow = ({ payload }) => {
  return (
    <TableBody>
      {payload &&
        payload.map((data) => (
          <StyledTableRow key={data?._id}>
            <StyledTableCell>{data?.userId}</StyledTableCell>
            <StyledTableCell>{data?.name}</StyledTableCell>
            <StyledTableCell>{data?.email}</StyledTableCell>
            <StyledTableCell>{data?.department.name}</StyledTableCell>
            <StyledTableCell>{data?.jobLabel}</StyledTableCell>
            <StyledTableCell align="center" sx={{ display: 'flex', gap: 1 }}>
              <TableActionButton userId={data?._id} />
            </StyledTableCell>
          </StyledTableRow>
        ))}
    </TableBody>
  );
};

export default UserRow;
