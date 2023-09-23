/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';

const DepartmentCard = ({ department, index }) => {
  return (
    <Box
      sx={{
        bgcolor: colors.white[200],
        width: '31%',
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

export default DepartmentCard;
