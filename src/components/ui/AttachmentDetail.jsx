/* eslint-disable react/prop-types */
import { Box } from '@mui/material';

const AttachmentDetail = ({ children, attachment }) => {
  const handleClick = () => {};

  return attachment.mimetype.includes('image') ? (
    <Box
      sx={{ maxWidth: '100%', height: '180px' }}
      onClick={() =>
        handleClick({ url: attachment.url, filename: attachment.filename })
      }
    >
      {children}
    </Box>
  ) : (
    <Box
      sx={{ maxWidth: '100%', height: '180px' }}
      onClick={() =>
        handleClick({ url: attachment.url, filename: attachment.filename })
      }
    >
      <a href={attachment.url}>{children}</a>
    </Box>
  );
};

export default AttachmentDetail;
