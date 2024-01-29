import { Box, CircularProgress, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';
import { useParams } from 'react-router-dom';
import { useGetAllMentions } from '../../api';
import { transformLocalTime } from '../../helpers';
import { useAuth } from '../../hooks';

const MentionDetailCard = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetAllMentions(id);

  const { user } = useAuth();

  let mentions;

  if (data?.payload) {
    mentions = data?.payload?.filter(
      (item) => item.reviewers.includes(user._id) || item.actor === user._id,
    );
  }

  return (
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
        mentions?.map((item, i) => (
          <Box
            key={item._id}
            sx={{
              borderBottom: `1px solid ${
                mentions.length !== i && colors.grey[400]
              }`,
              py: 2,
              px: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              cursor: 'pointer',
            }}
          >
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
          </Box>
        ))
      )}
    </Box>
  );
};

export default MentionDetailCard;
