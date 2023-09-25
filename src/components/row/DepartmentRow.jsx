/* eslint-disable react/prop-types */
import { TableBody, Typography } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../styled';

const DepartmentRow = ({ payload }) => {
  return (
    <TableBody>
      {payload &&
        payload.map((data) => (
          <StyledTableRow key={data?._id}>
            <StyledTableCell>{data?.departmentId}</StyledTableCell>
            <StyledTableCell>{data?.name}</StyledTableCell>
            <StyledTableCell>
              <Typography sx={{ textTransform: 'capitalize' }}>
                {data?.type}
              </Typography>
            </StyledTableCell>
          </StyledTableRow>
        ))}
    </TableBody>
  );
};

export default DepartmentRow;
