/* eslint-disable react/prop-types */
import { Box, CircularProgress, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';
import DepartmentMemberLists from './DepartmentMemberLists';

const DepartmentCard = ({ department, index }) => {
  return (
    <Box
      sx={{
        bgcolor: colors.white[200],
        width: '32%',
        borderRadius: '10px',
        p: 2,
        border: `1px solid ${colors.grey[400]}`,
      }}
    >
      <Box
        key={department.name}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: `0.2px solid ${colors.grey[500]}`,
          mb: 2,
          pb: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: colors.paleBlue[800],
            py: 1,
            px: 2,
            color: colors.white[100],
            borderRadius: '50%',
          }}
        >
          {index + 1}
        </Box>
        <Typography variant="h5">{department.name}</Typography>
      </Box>
      {department.users.map((user, i) => (
        <Box key={user._id} sx={{ display: 'flex', gap: 1, p: 1 }}>
          <Typography>{i + 1}</Typography>
          <Typography>{user.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

const DepartmentLists = ({
  departments,
  isLoading,
  payloads,
  handleSelectChange,
}) => {
  let result;

  if (!isLoading) {
    if (payloads) {
      let depts = [];
      payloads.forEach((p) => {
        depts.push(p.department.name);
      });

      depts = [...new Set([...depts])];

      result = depts.map((dpt) => {
        const users = payloads.filter((p) => p.department.name === dpt);
        return {
          name: dpt,
          users,
        };
      });
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <label>Department Lists</label>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        {departments &&
          departments.map((department, i) => (
            <DepartmentCard key={i} department={department} index={i} />
          ))}
      </Box>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        result &&
        result.map((department, i) => (
          <DepartmentMemberLists
            handleSelectChange={handleSelectChange}
            key={i}
            department={department}
          />
        ))
      )}
    </Box>
  );
};

export default DepartmentLists;
