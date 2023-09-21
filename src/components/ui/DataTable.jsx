/* eslint-disable react/prop-types */
import { Table, TableContainer, TableHead, TableRow } from '@mui/material';
import { StyledTableCell } from '../styled';
import { colors } from '../../assets/theme/theme';

const DataTable = ({ rows, columns, hasAction }) => {
  return (
    <TableContainer
      sx={{
        border: `1px solid ${colors.bgColor}`,
        borderTopRightRadius: '1rem',
        borderTopLeftRadius: '1rem',
      }}
    >
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column, i) => (
              <StyledTableCell key={i}>{column}</StyledTableCell>
            ))}
            {hasAction && <StyledTableCell>Action</StyledTableCell>}
          </TableRow>
        </TableHead>
        {rows}
      </Table>
    </TableContainer>
  );
};

export default DataTable;
