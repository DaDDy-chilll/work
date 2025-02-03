/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetDocumentDetail } from '../api/document';
import { colors } from '../assets/theme/theme';
import {  transformLocalTime } from '../helpers';
import { ArrowBack } from '@mui/icons-material';
import Attachments from '../components/ui/Attachments';
import Remarks from '../components/ui/Remarks';
import FormStatus from '../components/ui/FormStatus';
import LinkButton from '../components/ui/LinkButton';
import { useAuth } from '../hooks/useAuth';
import { usePageTitle } from '../hooks';
import MentionDetailCard from '../components/ui/MentionDetailCard';

const Item = ({ fieldName, value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minWidth: '30%',
      }}
    >
      <Typography
        sx={{ fontSize: '16px', fontWeight: 'bold', color: colors.black[100] }}
      >
        {fieldName}
      </Typography>
      {value}
    </Box>
  );
};

const DocumentDetailPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { pageTitle, setPageTitle } = usePageTitle('Document Detail');

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const workflowType = searchParams.get('workflowType');
  const { user } = useAuth();
  const { data: document, isLoading } = useGetDocumentDetail(id, workflowType);
  const navigate = useNavigate();
  const orderDoc = searchParams.get('doc');
  const orderId = searchParams.get('orderId');


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, m: 2 }}>
    {orderDoc && (
            <Box display="flex" justifyContent="start" gap={2}>
          <Button
            sx={{
              borderRadius: '5vmax',
              width: '15%',
            }}
            type="submit"
            color="primary"
            variant={ 'contained' }
          >
            Purchase Request
          </Button>
          <Button
            sx={{
              borderRadius: '5vmax',
              width: '15%',
            }}
            type="submit"
            color="primary"
            variant={ 'outlined'}
            onClick={() => navigate(`/purchase-order/create?id=${orderDoc}&workflowType=PURCHASE_ORDER&doc=${id}&orderId=${orderId}`)}

          >
            Purchase Order
          </Button>
        </Box>
      )}
      <Typography
        variant="h2"
        sx={{ fontWeight: 500, color: colors.black[100] }}
      >
        View Document Request
      </Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={48} />
        </Box>
      ) : (
        document?.payload && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                maxWidth: '75%',
                minWidth: '75%',
              }}
            >
              <MentionDetailCard />
              <Box bgcolor={colors.white[100]} borderRadius="1rem">
                <Box
                  sx={{
                    borderBottom: `1px solid ${colors.grey[400]}`,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    fontSize: '20px',
                    fontWeight: 500,
                    color: colors.black[100],
                  }}
                >
                  <IconButton onClick={() => navigate('/')}>
                    <ArrowBack
                      sx={{ fontSize: '22px', color: colors.black[100] }}
                    />
                  </IconButton>
                  {transformLocalTime(document?.payload?.updatedAt).date}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    px: 4,
                    py: 2,
                  }}
                >
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Item
                      fieldName="Document Id"
                      value={document?.payload?.documentId}
                    />
                    <Item fieldName="Subject" value={document?.payload?.name} />
                    <Item
                      fieldName="Amount"
                      value={document?.payload?.amount}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: colors.bgColor,
                      borderRadius: '1rem',
                      p: 2,
                    }}
                  >
                    <div
                      style={{ fontSize: '16px', wordWrap: 'break-word' }}
                      dangerouslySetInnerHTML={{
                        __html: document?.payload?.description,
                      }}
                    />
                  </Box>
                  {/* ATTACHMENTS */}
                  <Box>
                    {document?.payload?.attachments && (
                      <Item
                        fieldName="Attachments (Optional)"
                        value={
                          <Attachments
                            attachments={document?.payload?.attachments}
                          />
                        }
                      />
                    )}
                  </Box>
                  {/* REMARKS */}
                  <Box>
                    {document?.payload?.attachments && (
                      <Item fieldName="Other Remarks" value={<Remarks />} />
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'center',
                    borderTop: `1px solid ${colors.grey[400]}`,
                    py: 2,
                    px: 4,
                    gap: 1,
                  }}
                >
                  <LinkButton
                    width="200px"
                    innerText="Back"
                    onClick={() => navigate('/')}
                    variant="contained"
                    color="primary"
                  />

                  {!document.payload.isCaseClosed &&
                    user?._id === document?.payload?.currentReviewer &&
                    user?.permissions?.canPrepare && (
                      <LinkButton
                        width="200px"
                        color="info"
                        innerText="Edit"
                        onClick={() =>
                          navigate(
                            `/edit/${id}${
                              workflowType
                                ? '?workflowType=' + workflowType
                                : ''
                            }`,
                          )
                        }
                        variant="contained"
                      />
                    )}
                  {!document.payload.isCaseClosed &&
                  user?._id === document?.payload?.currentReviewer ? (
                    <>
                      <LinkButton
                        width="200px"
                        color="success"
                        innerText="Give Decision"
                        variant="contained"
                        onClick={() =>
                          navigate(
                            `/remark/${id}${
                              workflowType
                                ? '?workflowType=' + workflowType
                                : ''
                            }`,
                          )
                        }
                      />
                    </>
                  ) : null}
                  {document?.payload?.isCaseClosed &&
                    user?.permissions?.canMention && (
                      <LinkButton
                        width="200px"
                        color="success"
                        innerText="Mention"
                        onClick={() =>
                          navigate(
                            `/mention/${id}${
                              workflowType
                                ? '?workflowType=' + workflowType
                                : ''
                            }`,
                          )
                        }
                        variant="contained"
                      />
                    )}
                </Box>
              </Box>
            </Box>
            <Box
              bgcolor={colors.white[100]}
              borderRadius="1rem"
              sx={{ p: 2, width: '25%' }}
            >
              <Box
                sx={{
                  borderBottom: `1px solid ${colors.grey[400]}`,
                  pb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: colors.black[100],
                }}
              >
                Form Status
              </Box>
              <FormStatus
                isLoading={isLoading}
                reviewers={document?.payload?.reviewers?.list}
              />
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};

export default DocumentDetailPage;
