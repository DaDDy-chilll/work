/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import AttachmentDetail from './AttachmentDetail';
import PDFImage from '../../assets/images/PDF.png';

const Attachments = ({ attachments }) => {
  console.log({ attachments });

  return (
    <Box sx={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
      {attachments.map((attachment) => (
        <Box
          key={attachment.url}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '10px',
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
