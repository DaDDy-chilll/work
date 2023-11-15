/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import { useDisclosure } from '../../hooks';
import CustomSlider from './CustomSlider';
import Modal from './Modal';
import AttachmentDetail from './AttachmentDetail';

const Attachments = ({ attachments }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
      {attachments.map((attachment) => (
        <Box
          key={attachment.url}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            maxWidth: '150px',
          }}
        >
          <AttachmentDetail attachment={attachment} onOpen={onOpen} />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ wordWrap: 'break-word' }}
          >
            {attachment.filename}
          </Typography>
        </Box>
      ))}
      <Modal
        title="View Attachments"
        isOpen={isOpen}
        onClose={onClose}
        content={<CustomSlider items={attachments} />}
      />
    </Box>
  );
};

export default Attachments;
