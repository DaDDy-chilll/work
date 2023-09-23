/* eslint-disable react/prop-types */
import { Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
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

  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, m: 2 }}>
      <Typography variant="h1">View Document Request</Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={48} />
        </Box>
      ) : (
        document?.payload && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box
              bgcolor={colors.white[100]}
              borderRadius="1rem"
              sx={{ width: '80%' }}
            >
              <Box
                sx={{
                  borderBottom: `1px solid ${colors.grey[400]}`,
                  px: 4,
                  py: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/')}
              >
                <ArrowBack />
                {transformDate(document?.payload?.updatedAt)}
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Item
                    fieldName="Document Id"
                    value={document?.payload?.documentId}
                  />
                  <Item fieldName="Subject" value={document?.payload?.name} />
                  <Item fieldName="Amount" value={document?.payload?.amount} />
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
                {user?._id === document?.payload?.currentReviewer &&
                  user?.permissions?.canPrepare && (
                    <LinkButton
                      width="200px"
                      color="info"
                      innerText="Edit"
                      onClick={() => navigate(`/edit/${id}`)}
                      variant="contained"
                    />
                  )}
                {user?._id === document?.payload?.currentReviewer && (
                  <>
                    <ModalButton
                      width="200px"
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
            </Box>
            <Box
              bgcolor={colors.white[100]}
              borderRadius="1rem"
              sx={{ p: 2, width: '20%' }}
            >
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
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};

export default DocumentDetailPage;
