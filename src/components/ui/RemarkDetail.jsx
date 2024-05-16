/* eslint-disable react/prop-types */
import { ApartmentOutlined, AttachFile } from '@mui/icons-material';
import { Box, Chip, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';
import { changeTextColor, transformLocalTime } from '../../helpers';
import CustomSlider from './CustomSlider';
import { useDisclosure } from '../../hooks';
import { useState } from 'react';
import Modal from './Modal';
import { Link } from 'react-router-dom';

const LinkButton = ({ attachment, action, children }) => {
  const isPdfFile = attachment?.mimetype?.includes('pdf');
  return (
    <Link
      to={`${import.meta.env.VITE_API_URL}/documents/file/${attachment.key}/${
        isPdfFile ? action : 'download'
      }`}
      target="_blank"
    >
      {children}
    </Link>
  );
};

const RemarkDetail = ({ remark }) => {
  const textColor = changeTextColor({ action: remark.action });

  const [currentImageUrl, setCurrentImageUrl] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleClick = (url) => {
    setCurrentImageUrl(url);
    onOpen();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Typography
          sx={{ textTransform: 'capitalize' }}
          fontSize="14px"
          fontWeight={500}
          color={textColor && textColor}
          component="span"
        >
          <span>
            {remark.action === 'FORWARDED'
              ? 'Forwarded and Approved'
              : remark.action.toLowerCase()}
          </span>{' '}
          by {remark.actor.name}
        </Typography>
        <Box
          sx={{
            border: `0.3px solid ${colors.grey[500]}`,
            px: 1,
            py: '3px',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <ApartmentOutlined fontSize="small" />
          <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>
            {remark.actor.department.name}
          </Typography>
        </Box>
      </Box>
      <div
        style={{ fontSize: '16px', fontWeight: 400 }}
        dangerouslySetInnerHTML={{ __html: remark.content }}
      />
      <Typography
        fontSize="14px"
        fontWeight={500}
        component="span"
        color={colors.darkBlue[800]}
      >
        {transformLocalTime(remark?.createdAt).date}{' '}
        <span style={{ color: colors.red[800] }}>
          {transformLocalTime(remark?.createdAt).time}
        </span>
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {remark?.attachments?.map((item) => (
          <div key={item._id}>
            {item?.mimetype?.includes('image') ? (
              <Chip
                label={item.filename}
                variant="outlined"
                color="primary"
                icon={<AttachFile sx={{ transform: 'rotate(45deg)' }} />}
                onClick={() => handleClick(item.url)}
                size="small"
                sx={{
                  padding: 1,
                  '& .MuiChip-label': {
                    fontSize: '14px',
                  },
                }}
              />
            ) : (
              <LinkButton attachment={item} action="view">
                <Chip
                  label={item.filename}
                  variant="outlined"
                  color="primary"
                  icon={<AttachFile sx={{ transform: 'rotate(45deg)' }} />}
                  size="small"
                  sx={{
                    padding: 1,
                    '& .MuiChip-label': {
                      fontSize: '14px',
                    },
                  }}
                />
              </LinkButton>
            )}
          </div>
        ))}
      </Box>
      <Modal
        title="View Attachments"
        isOpen={isOpen}
        onClose={onClose}
        content={
          <CustomSlider
            items={remark?.attachments}
            currentImageUrl={currentImageUrl}
          />
        }
      />
    </Box>
  );
};

export default RemarkDetail;
