import Timeline from '@mui/lab/Timeline';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetAllRemarks } from '../../api/remarks';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import RemarkDetail from './RemarkDetail';

const Remarks = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetAllRemarks(id);

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
        data?.payload &&
        data?.payload.map((remark, i) => (
          <TimelineItem key={i}>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot
                sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                color="primary"
              >
                {i + 1}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <RemarkDetail remark={remark} />
            </TimelineContent>
          </TimelineItem>
        ))
      )}
    </Timeline>
  );
};

export default Remarks;
