/* eslint-disable react/prop-types */
import { Box, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetDocumentDetail } from '../api/document';
import { colors } from '../assets/theme/theme';
import { transformDate } from '../helpers';
import { ArrowBack } from '@mui/icons-material';
import Attachments from '../components/ui/Attachments';
import Remarks from '../components/ui/Remarks';

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

const DocumentDetail = () => {
  const { id } = useParams();

  const { data: document } = useGetDocumentDetail(id);

  console.log(document?.payload);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
      <Typography variant="h1">View Document Request</Typography>
      <Paper sx={{ px: 4, py: 2 }}>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Item
              fieldName="Document Id"
              value={document?.payload?.documentId}
            />
            <Item fieldName="Subject" value={document?.payload?.name} />
            <Item fieldName="Document Type" value={document?.payload?.type} />
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
                  <Attachments attachments={document?.payload?.attachments} />
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
      </Paper>
    </Box>
  );
};

export default DocumentDetail;
