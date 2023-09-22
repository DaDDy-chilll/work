/* eslint-disable react/prop-types */
import { Box, Checkbox, CircularProgress, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';
import { ApartmentOutlined } from '@mui/icons-material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useFetchAllDepartments } from '../../api';

const ItemIcon = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: colors.bgColor,
        py: '3px',
        px: '4px',
        borderRadius: '50%',
      }}
    >
      {children}
    </Box>
  );
};

const ItemCard = ({ children, title }) => {
  return (
    <Box
      sx={{
        bgcolor: colors.white[200],
        width: '50%',
        borderRadius: '1rem',
        p: 2,
        border: `1px solid ${colors.grey[400]}`,
        height: '400px',
        overflowY: 'scroll',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: `0.2px solid ${colors.grey[500]}`,
          mb: 2,
          pb: 2,
        }}
      >
        <ItemIcon>
          <ApartmentOutlined
            sx={{
              color: colors.paleBlue[800],
              fontSize: '25px',
            }}
          />
        </ItemIcon>
        <label>{title}</label>
      </Box>
      {children}
    </Box>
  );
};

const Item = ({ department }) => {
  return (
    <Typography
      sx={{ textTransform: 'capitalize' }}
      variant="h5"
      fontWeight="bold"
      component="span"
    >
      {department.name}
    </Typography>
  );
};

const DepartmentFlow = ({ selectedDepartments, handleDepartmentChange }) => {
  const { data: departments, isLoading: departmentLoading } =
    useFetchAllDepartments({
      limit: 0,
    });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <label>Department Work Flow</label>

      <Box sx={{ display: 'flex', gap: 5 }}>
        <ItemCard title="Department Lists">
          {departmentLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              {departments &&
                departments.payload.map((department) => (
                  <Box
                    key={department._id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox
                      name={department._id}
                      value={department.name}
                      onChange={handleDepartmentChange}
                    />
                    <Typography variant="h5">{department.name}</Typography>
                  </Box>
                ))}
            </Box>
          )}
        </ItemCard>
        <ItemCard title="Department Order">
          <Timeline
            position="right"
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {selectedDepartments.length !== 0 ? (
              selectedDepartments.map((department, i) => (
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
                  <TimelineContent sx={{ py: 3, px: 2 }}>
                    <Item department={department} />
                  </TimelineContent>
                </TimelineItem>
              ))
            ) : (
              <label style={{ textAlign: 'center' }}>
                No Selected Departments
              </label>
            )}
          </Timeline>
        </ItemCard>
      </Box>
    </Box>
  );
};

export default DepartmentFlow;
