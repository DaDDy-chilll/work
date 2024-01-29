import { Textsms } from '@mui/icons-material';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { colors } from '../../assets/theme/theme';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetAllMentions } from '../../api';
import { useAuth } from '../../hooks';
import { filterMentions } from '../../helpers';

const MentionFormStatus = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetAllMentions(id);

  const { user } = useAuth();

  let mentions;

  if (data?.payload) {
    mentions = filterMentions({ data: data?.payload, user });
  }

  return (
    <>
      {isLoading ? (
        <CircularProgress size={48} />
      ) : (
        mentions &&
        mentions?.map((item) => (
          <TimelineItem key={item._id}>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                color="warning"
              >
                <Textsms
                  sx={{ color: colors.paleBlue[800], fontSize: '23px' }}
                />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Box
                sx={{
                  borderBottom: `1px solid ${colors.grey[500]}`,
                  pb: 2,
                  mt: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: colors.black[200],
                  }}
                >
                  {item.actor.name} Mention
                </Typography>
                {item.reviewers.map((person) => (
                  <Box
                    key={person._id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mt: 1,
                      color: colors.paleBlue[800],
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      {person.name} ({person.userId})
                    </Typography>
                  </Box>
                ))}
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))
      )}
    </>
  );
};

export default MentionFormStatus;
