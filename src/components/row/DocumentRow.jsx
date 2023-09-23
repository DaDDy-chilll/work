/* eslint-disable react/prop-types */
import { TableBody } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../styled';
import DocumentLastActivity from '../ui/DocumentLastActivity';
import { transformDate } from '../../helpers';
import DocumentCase from '../ui/DocumentCase';
import LinkButton from '../ui/LinkButton';
import { useNavigate } from 'react-router-dom';

const DocumentRow = ({ payload }) => {
  const navigate = useNavigate();
  return (
    <TableBody>
      {payload &&
        payload.map((data) => (
          <StyledTableRow key={data?._id}>
            <StyledTableCell>{data?.documentId}</StyledTableCell>
            <StyledTableCell>{transformDate(data?.createdAt)}</StyledTableCell>
            <StyledTableCell>
              <div style={{ width: '100px' }}>{data?.name}</div>
            </StyledTableCell>
            <StyledTableCell>
              <div
                style={{ width: '300px' }}
                dangerouslySetInnerHTML={{ __html: data?.description }}
              />
            </StyledTableCell>
            <StyledTableCell>
              <DocumentCase documentCase={data?.isCaseClosed} />
            </StyledTableCell>
            <StyledTableCell>
              <DocumentLastActivity lastActivity={data.lastActivity} />
            </StyledTableCell>
            <StyledTableCell>
              <LinkButton
                width="100px"
                innerText="View"
                onClick={() => navigate(`/detail/${data._id}`)}
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
