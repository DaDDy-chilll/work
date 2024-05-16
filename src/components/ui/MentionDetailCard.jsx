/* eslint-disable react/prop-types */
import { Box, Chip, CircularProgress, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';
import { Link, useParams } from 'react-router-dom';
import { useGetAllMentions } from '../../api';
import { filterMentions, transformLocalTime } from '../../helpers';
import { useAuth, useDisclosure } from '../../hooks';
import { AttachFile } from '@mui/icons-material';
import Modal from './Modal';
import CustomSlider from './CustomSlider';
import { useState } from 'react';

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

const MentionDetail = ({ item }) => {
  const [currentImageUrl, setCurrentImageUrl] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleClick = (url) => {
    setCurrentImageUrl(url);
    onOpen();
  };

  return (
    <>
      <div
        style={{
          fontSize: '16px',
          wordWrap: 'break-word',
          fontWeight: 500,
          color: colors.black[100],
        }}
        dangerouslySetInnerHTML={{
          __html: item?.remark,
        }}
      />
      <Box sx={{ fontSize: '14px', display: 'flex', gap: 1 }}>
        <span style={{ color: colors.darkBlue[800] }}>
          {transformLocalTime(item?.createdAt).date}
        </span>
        <span style={{ color: colors.red[800] }}>
          {transformLocalTime(item?.createdAt).time}
        </span>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {item?.attachments?.map((attachment) => (
          <div key={attachment._id}>
            {attachment?.mimetype?.includes('image') ? (
              <Chip
                label={attachment.filename}
                variant="outlined"
                color="primary"
                icon={<AttachFile sx={{ transform: 'rotate(45deg)' }} />}
                onClick={() => handleClick(attachment.url)}
                size="small"
                sx={{
                  padding: 1,
                  '& .MuiChip-label': {
                    fontSize: '14px',
                  },
                }}
              />
            ) : (
              <LinkButton attachment={attachment} action="view">
                <Chip
                  label={attachment.filename}
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
            items={item?.attachments}
            currentImageUrl={currentImageUrl}
          />
        }
      />
    </>
  );
};

const MentionDetailCard = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetAllMentions(id);

  const { user } = useAuth();

  let mentions;

  if (data?.payload) {
    mentions = filterMentions({ data: data?.payload, user });
  }

  return (
    <>
      {mentions && mentions?.length ? (
        <Box bgcolor={colors.white[100]} borderRadius="1rem">
          <Typography
            sx={{
              borderBottom: `1px solid ${colors.grey[400]}`,
              py: 2,
              px: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              fontSize: '20px',
              fontWeight: 600,
              color: colors.black[100],
            }}
          >
            Mention Info Detail
          </Typography>
          {isLoading ? (
            <CircularProgress size={48} />
          ) : (
            mentions &&
            mentions?.map((item, i) => (
              <Box
                key={item._id}
                sx={{
                  borderBottom: `1px solid ${
                    mentions.length - 1 !== i && colors.grey[400]
                  }`,
                  py: 2,
                  px: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  cursor: 'pointer',
                }}
              >
                <MentionDetail item={item} />
              </Box>
            ))
          )}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default MentionDetailCard;
