/* eslint-disable react/prop-types */
import { TableBody } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../styled';
import DocumentLastActivity from '../ui/DocumentLastActivity';
import { removeHtmlTags, transformLocalTime } from '../../helpers';
import DocumentCase from '../ui/DocumentCase';
import LinkButton from '../ui/LinkButton';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../assets/theme/theme';

const DocumentRow = ({ payload, currentPath }) => {
  const navigate = useNavigate();


  return (
    <TableBody>
      {payload &&
        payload.map((data) => (
          <StyledTableRow key={data?._id}>
            <StyledTableCell>{data?.documentId}</StyledTableCell>
            {currentPath === '/purchase-order' && (
              <StyledTableCell
                sx={{
                  cursor: 'pointer',
                  '&': {
                    color: `${colors.paleBlue[800]} !important`,
                  },
                }}
                onClick={() =>
                  navigate(`/detail/${data?.documentRequestId?.id}`)
                }
              >
                {data?.documentRequestId?.documentId}
              </StyledTableCell>
            )}
            <StyledTableCell>
              {transformLocalTime(data?.createdAt).date}
            </StyledTableCell>
            <StyledTableCell>
              <div style={{ width: '150px' }}>
                {data?.name.length > 20
                  ? data?.name.slice(0, 20) + '...'
                  : data?.name}
              </div>
            </StyledTableCell>
            <StyledTableCell>
              {data?.description ? (
                <div
                  style={{ fontSize: '16px' }}
                  dangerouslySetInnerHTML={{
                    __html:
                      removeHtmlTags(data?.description).length > 45
                        ? removeHtmlTags(data?.description).slice(0, 45) + '...'
                        : removeHtmlTags(data?.description),
                  }}
                />
              ) : (
                ''
              )}
            </StyledTableCell>
            <StyledTableCell>
              <DocumentCase documentCase={data?.isCaseClosed} />
            </StyledTableCell>
            <StyledTableCell>
              <DocumentLastActivity
                lastActivity={data.lastStep ? data.lastStep : data.lastActivity}
              />
            </StyledTableCell>
            <StyledTableCell>
              <LinkButton
                width="100px"
                innerText="View"
                onClick={() =>
                  navigate(
                    (currentPath === '/purchase-order' || !currentPath) &&
                      data?.lastStep?.action === false
                      ? `/purchase-order/create?id=${data?.orderWorkflow}&workflowType=PURCHASE_ORDER&doc=${data?.originalDocument}&orderId=${data?._id}`
                      : data?.lastStep === null ? `/detail/${data._id}?workflowType=PURCHASE_ORDER` : `/detail/${data._id}`,
                  )
                }
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
