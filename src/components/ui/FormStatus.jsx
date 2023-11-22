/* eslint-disable react/prop-types */
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ApartmentOutlined, CheckCircle } from '@mui/icons-material';
import { changeDepartmentStatus, changeTextColor } from '../../helpers';
import { colors } from '../../assets/theme/theme';

const FormStatus = ({ reviewers, isLoading }) => {
  const departments = changeDepartmentStatus(reviewers);

  console.log({ departments });

  return (
    <Timeline
      position="right"
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {isLoading ? (
        <CircularProgress size={48} />
      ) : (
        departments &&
        departments.map((department, i) => (
          <TimelineItem key={i}>
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
                <ApartmentOutlined
                  sx={{
                    color: colors.paleBlue[800],
                    fontSize: '25px',
                  }}
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
                  {department.name}
                </Typography>{' '}
                {department.users?.map((user) => (
                  <Box
                    key={user._id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mt: 1,
                      color: changeTextColor({ action: user.status }),
                    }}
                  >
                    <CheckCircle sx={{ fontSize: '25px' }} />
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: 500,
                      }}
                    >
                      {user.status} by {user.reviewer.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))
      )}
    </Timeline>
  );
};

export default FormStatus;
