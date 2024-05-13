/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { colors } from '../../assets/theme/theme';
import { Download, Visibility } from '@mui/icons-material';
import PDFImage from '../../assets/images/PDF.png';
import { Link } from 'react-router-dom';

const DownloadButton = ({ attachment, action, children }) => {
  const isPdfFile = attachment?.mimetype?.includes('pdf');
  return (
    <Link
      to={`${import.meta.env.VITE_API_URL}/documents/file/${attachment.key}/${
        isPdfFile ? action : 'download'
      }`}
      target="_blank"
    >
      <div
        className={`attachment_btn_container attachment_${action}_btn`}
        style={{
          backgroundColor: colors.bgColor,
        }}
      >
        {children}
      </div>
    </Link>
  );
};

const ViewButton = ({ onClick }) => {
  return (
    <div
      className={`attachment_btn_container attachment_view_btn`}
      style={{
        backgroundColor: colors.bgColor,
      }}
      onClick={onClick}
    >
      <Visibility
        sx={{
          color: colors.black[300],
          fontSize: '22px',
        }}
      />
    </div>
  );
};

const AttachmentDetail = ({ attachment, onOpen }) => {
  return (
    <Box sx={{ maxWidth: '100%', height: '180px' }}>
      <div key={attachment.url} className="attachment_container">
        <img
          src={
            attachment?.mimetype?.includes('image') ? attachment.url : PDFImage
          }
          alt={attachment.filename}
        />
        <DownloadButton attachment={attachment} action="download">
          <Download
            sx={{
              color: colors.black[300],
              fontSize: '22px',
            }}
          />
        </DownloadButton>
        {attachment?.mimetype?.includes('image') ? (
          <ViewButton onClick={onOpen} />
        ) : (
          <DownloadButton attachment={attachment} action="view">
            <Visibility
              sx={{
                color: colors.black[300],
                fontSize: '22px',
              }}
            />
          </DownloadButton>
        )}
      </div>
    </Box>
  );
};

export default AttachmentDetail;
