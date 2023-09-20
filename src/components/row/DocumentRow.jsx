/* eslint-disable react/prop-types */
import { TableBody } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../styled';
import DocumentLastActivity from '../ui/DocumentLastActivity';
import { transformDate } from '../../helpers';
import DocumentCase from '../ui/DocumentCase';
import LinkButton from '../ui/LinkButton';

const DocumentRow = ({ payload }) => {
  return (
    <TableBody>
      {payload &&
        payload.map((data) => (
          <StyledTableRow key={data?._id}>
            <StyledTableCell>{data?.documentId}</StyledTableCell>
            <StyledTableCell>{transformDate(data?.createdAt)}</StyledTableCell>
            {/* <StyledTableCell>{data?.name}</StyledTableCell> */}
            {/* <StyledTableCell>{data?.description}</StyledTableCell> */}
            <StyledTableCell>
              <DocumentCase documentCase={data?.isCaseClosed} />
            </StyledTableCell>
            <StyledTableCell>
              <DocumentLastActivity lastActivity={data.lastActivity} />
            </StyledTableCell>
            <StyledTableCell>
              <LinkButton
                innerText="View"
                to={`/detail/${data._id}`}
                variant="contained"
                color="primary"
              />
            </StyledTableCell>
          </StyledTableRow>
        ))}
    </TableBody>
  );
};

export default DocumentRow;
