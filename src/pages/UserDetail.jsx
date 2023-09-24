// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserDetail } from '../api';
import { toast } from 'react-toastify';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';

const UserDetail = () => {
  const { id } = useParams();

  const { isLoading, data, error } = useGetUserDetail(id);

  console.log(data);

  if (error) {
    toast.error(error.data.message);
  }

  return (
    <>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={56} />
        </Box>
      ) : (
        data.payload && (
          <Box
            display="flex"
            width="80%"
            bgcolor={colors.white[100]}
            borderRadius="20px"
            height="700px"
            marginTop="50px"
            sx={{ margin: 'auto' }}
            flexDirection="column"
          >
            <Box
              sx={{
                display: 'flex',
                mb: '10px',
                // justifyContent: 'flex-start',
                marginLeft: '3%',
                mt: '30px',
              }}
            >
              <Typography variant="h3" fontWeight="bold">
                {data.payload.updatedAt.split('T')[0]}
              </Typography>
            </Box>
            <Divider />

            <Box
              display="flex"
              sx={{ margin: '50px', mt: '20px', flexDirection: 'column' }}
            >
              <Typography fontWeight="bold">User ID</Typography>
              <Typography variant="h4">{data.payload.id}</Typography>
            </Box>

            <Box
              display="flex"
              sx={{ margin: '50px', mt: '-20px', flexDirection: 'column' }}
            >
              <Typography fontWeight="bold">Name</Typography>
              <Typography variant="h4">{data.payload.name}</Typography>
            </Box>

            <Box
              display="flex"
              sx={{ margin: '50px', mt: '-20px', flexDirection: 'column' }}
            >
              <Typography fontWeight="bold">Email</Typography>
              <Typography variant="h4">{data.payload.email}</Typography>
            </Box>

            <Box
              display="flex"
              sx={{ margin: '50px', mt: '-20px', flexDirection: 'column' }}
            >
              <Typography fontWeight="bold">Job Label</Typography>
              <Typography variant="h4">{data.payload.jobLabel}</Typography>
            </Box>

            <Box
              display="flex"
              sx={{ margin: '50px', mt: '-20px', flexDirection: 'column' }}
            >
              <Typography fontWeight="bold">Role</Typography>
              <Typography variant="h4">{data.payload.role}</Typography>
            </Box>

            <Box
              display="flex"
              sx={{ margin: '50px', mt: '-20px', flexDirection: 'column' }}
            >
              <Typography fontWeight="bold">Permissions</Typography>
              <Typography variant="h4">{data.payload.jobLabel}</Typography>
            </Box>

            <Box
              display="flex"
              sx={{ margin: '50px', mt: '-20px', flexDirection: 'column' }}
            >
              <Typography fontWeight="bold">Job Label</Typography>
              <Typography variant="h4">{data.payload.jobLabel}</Typography>
            </Box>

            <Box
              display="flex"
              sx={{ margin: '50px', mt: '-20px', flexDirection: 'column' }}
            >
              <Typography fontWeight="bold">Permissions</Typography>
              <Typography variant="h5">{`Can Approve: ${data.payload.permissions.canApprove}`}</Typography>
              <Typography variant="h5">{`Can Edit: ${data.payload.permissions.canEdit}`}</Typography>
              <Typography variant="h5">{`Can Prepare: ${data.payload.permissions.canPrepare}`}</Typography>
              <Typography variant="h5">{`Can Verify: ${data.payload.permissions.canVerify}`}</Typography>
              <Typography variant="h5">{`Can Edit Amount: ${data.payload.permissions.canEditAmount}`}</Typography>
            </Box>
          </Box>
        )
      )}
    </>
  );
};

export default UserDetail;
