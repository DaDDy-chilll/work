/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';

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
          gap: 1,
          borderBottom: `0.1px solid ${colors.grey[200]}`,
          mb: 2,
          pb: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: colors.paleBlue[800],
            color: colors.white[100],
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
          }}
        >
          {index + 1}
        </Box>
        <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>
          {department.name}
        </Typography>
      </Box>
      {department.users.length === 0 ? (
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 400,
            color: colors.black[300],
            textAlign: 'center',
          }}
        >
          No Selected Reviewers
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {department.users.map((user, i) => (
            <Box
              sx={{
                fontSize: '14px',
                fontWeight: 400,
                color: colors.black[300],
                display: 'flex',
                gap: 1,
              }}
              key={user._id}
            >
              <Typography>{i + 1}</Typography>
              <Typography>{user.name}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default DepartmentCard;
