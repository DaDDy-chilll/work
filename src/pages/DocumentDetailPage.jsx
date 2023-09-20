/* eslint-disable react/prop-types */
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetDocumentDetail } from '../api/document';
import { colors } from '../assets/theme/theme';
import { transformDate } from '../helpers';
import { ArrowBack } from '@mui/icons-material';
import Attachments from '../components/ui/Attachments';
import Remarks from '../components/ui/Remarks';
import FormStatus from '../components/ui/FormStatus';
import LinkButton from '../components/ui/LinkButton';
import { useAuth } from '../hooks/useAuth';
import { useDisclosure } from '../hooks/useDisclosure';
import Modal from '../components/ui/Modal';
import RemarkForm from '../components/form/RemarkForm';
import ModalButton from '../components/ui/ModalButton';

const Item = ({ fieldName, value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        mt: 2,
        minWidth: '30%',
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        {fieldName}
      </Typography>
      {value}
    </Box>
  );
};

const DocumentDetailPage = () => {
  const { id } = useParams();

  const { user } = useAuth();

  const { data: document, isLoading } = useGetDocumentDetail(id);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
      <Typography variant="h1">View Document Request</Typography>
      {isLoading ? (
        <CircularProgress size={48} />
      ) : (
        document?.payload && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Paper sx={{ px: 4, py: 2, width: '80%' }}>
              <Box
                sx={{
                  borderBottom: `1px solid ${colors.grey[400]}`,
                  pb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <ArrowBack />
                {transformDate(document?.payload?.updatedAt)}
              </Box>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Item
                    fieldName="Document Id"
                    value={document?.payload?.documentId}
                  />
                  <Item fieldName="Subject" value={document?.payload?.name} />
                  <Item
                    fieldName="Document Type"
                    value={document?.payload?.type}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: colors.bgColor,
                    borderRadius: '1rem',
                    p: 3,
                  }}
                >
                  <div
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
                  borderTop: `1px solid ${colors.grey[400]}`,
                  pt: 2,
                  gap: 1,
                }}
              >
                <LinkButton
                  innerText="Back"
                  to="/all"
                  variant="contained"
                  color="primary"
                />
                {user?._id === document?.payload?.currentReviewer &&
                  user?.permissions?.canPrepare && (
                    <LinkButton
                      color="info"
                      innerText="Edit"
                      to={`/edit/${id}`}
                      variant="contained"
                    />
                  )}
                {user?._id === document?.payload?.currentReviewer && (
                  <>
                    <ModalButton
                      color="success"
                      innerText="Add Remark"
                      onOpen={onOpen}
                    />
                    <Modal
                      isOpen={isOpen}
                      onClose={onClose}
                      content={<RemarkForm onClose={onClose} />}
                      title="Add Remark"
                    />
                  </>
                )}
              </Box>
            </Paper>
            <Paper sx={{ p: 2, width: '20%' }}>
              <Box
                sx={{
                  borderBottom: `1px solid ${colors.grey[400]}`,
                  pb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                Form Status
              </Box>
              <FormStatus
                isLoading={isLoading}
                reviewers={document?.payload?.reviewers?.list}
              />
            </Paper>
          </Box>
        )
      )}
    </Box>
  );
};

export default DocumentDetailPage;
