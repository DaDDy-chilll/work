/* eslint-disable react/prop-types */
import { Box } from '@mui/material';

const AttachmentDetail = ({ children, attachment }) => {
  const handleClick = () => {};

  return attachment.mimetype.includes('image') ? (
    <Box
      onClick={() =>
        handleClick({ url: attachment.url, filename: attachment.filename })
      }
    >
      {children}
    </Box>
  ) : (
    <a href={attachment.url}>{children}</a>
  );
};

export default AttachmentDetail;
