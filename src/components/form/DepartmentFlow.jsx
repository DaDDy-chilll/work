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
import { useGetAllDepartments } from '../../api';
import CustomFormLabel from '../shared/CustomFormLabel';
import CustomTooltip from '../shared/CustomTooltip';
import { ROLES } from '../../constants/auth';

const ItemIcon = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: colors.bgColor,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
        py: 1,
        px: 2,
        border: `1px solid ${colors.grey[400]}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: `0.2px solid ${colors.grey[500]}`,
          mb: 1,
          pb: 1,
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
        <Typography
          sx={{ fontSize: '16px', fontWeight: 400, color: colors.black[300] }}
        >
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

const Item = ({ department }) => {
  return (
    <Typography
      sx={{
        textTransform: 'capitalize',
        fontSize: '16px',
        fontWeight: 400,
        color: colors.black[300],
      }}
    >
      {department.name}
    </Typography>
  );
};

const DepartmentFlow = ({ selectedDepartments, handleDepartmentChange }) => {
  const { data, isLoading: departmentLoading } = useGetAllDepartments({
    limit: 0,
  });

  let departments;
  if (data?.payload) {
    departments = data?.payload?.filter(
      (department) => department.name !== ROLES.SUPER_ADMIN,
    );
  }

  console.log(departments);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CustomFormLabel label="Department Work Flow" required={true} />
        <CustomTooltip innerText="Your form will be requested as your selected member order." />
      </Box>
      <Box sx={{ display: 'flex', gap: 5 }}>
        <ItemCard title="Department Lists">
          {departmentLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box
              className="department_card"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                overflowY: 'scroll',
                height: '330px',
              }}
            >
              {departments &&
                departments?.map((department) => (
                  <Box
                    key={department._id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: '17px' },
                      }}
                      name={department._id}
                      value={department.name}
                      onChange={handleDepartmentChange}
                    />
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: 400,
                        color: colors.black[300],
                      }}
                    >
                      {department.name}
                    </Typography>
                  </Box>
                ))}
            </Box>
          )}
        </ItemCard>
        <ItemCard title="Department Order">
          <Box
            className="department_card"
            sx={{ overflowY: 'scroll', height: '330px' }}
          >
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
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: colors.black[300],
                    textAlign: 'center',
                  }}
                >
                  No Selected Departments
                </Typography>
              )}
            </Timeline>
          </Box>
        </ItemCard>
      </Box>
    </Box>
  );
};

export default DepartmentFlow;
