import Timeline from '@mui/lab/Timeline';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Box } from '@mui/material';

const Remarks = () => {
  return (
    <Box>
      <Timeline
        position="right"
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {/* {remarks &&
          remarks.map((remark, i) => (
            <TimelineItem key={i}>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot sx={{ px: 1 }} color="primary">
                  {i + 1}
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '10px', px: 2 }}>
                <Item
                  remark={remark}
                  revisions={revisions}
                  me={me}
                  scrollToRef={scrollToRef}
                  handleAcknowledge={handleAcknowledge}
                  btnLoading={btnLoading}
                />
              </TimelineContent>
            </TimelineItem>
          ))} */}
      </Timeline>
    </Box>
  );
};

export default Remarks;
