/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import AttachmentDetail from './AttachmentDetail';
import PDFImage from '../../assets/images/PDF.png';

const Attachments = ({ attachments }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
      {attachments.map((attachment) => (
        <Box
          key={attachment.url}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            maxWidth: '10rem',
          }}
        >
          <AttachmentDetail attachment={attachment}>
            <img
              style={{ width: '145px', height: '145px', objectFit: 'cover' }}
              src={
                attachment?.mimetype?.includes('image')
                  ? attachment.url
                  : PDFImage
              }
              alt={attachment.filename}
            />
          </AttachmentDetail>
          <Typography variant="h5" fontWeight="bold">
            {attachment.filename}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Attachments;
