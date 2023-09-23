// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserDetail } from '../api';
import { toast } from 'react-toastify';
import { Box, Divider, Typography } from '@mui/material';
import { colors } from '../assets/theme/theme';
// import { ToastContainer, toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import { Box, Button, Divider, Typography } from '@mui/material';
// import { ArrowBackOutlined } from '@mui/icons-material';

// import PageTitle from '../../../components/mains/PageTitle';
// import { colors } from '../../../utils/theme';


const UserDetail = () => {
  const { id } = useParams();

  const { data, error } = useGetUserDetail(id);

  console.log(data);

  if (error) {
    toast.error(error.data.message);
  }

  return (
    // <Box p="20px">
    //   <PageTitle title="User Details" />
    //   <Box display="flex" justifyContent="right" alignItems="center" mb={2}>
    //     <Link to="/users" style={{ textDecoration: 'none' }}>
    //       <Button className="no-underline" variant="contained" color="primary">
    //         <ArrowBackOutlined sx={{ mr: '5px' }} /> View Users
    //       </Button>
    //     </Link>
    //   </Box>
    //   <ToastContainer />
    //   {isLoading ? (
    //     <Loading open={!isLoading && isLoading === undefined ? false : true} />
    //   ) : (
    //     data.payload && (
    //       <Box
    //         bgcolor={colors.white[100]}
    //         py="20px"
    //         px="50px"
    //         borderRadius="10px"
    //       >
    // <Box
    //   sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
    // >
    //   <Typography variant="h3" fontWeight="bold">
    //     {data.payload.updatedAt.split('T')[0]}
    //   </Typography>
    // </Box>
    // <Divider />

    //         <Box
    //           sx={{
    //             display: 'flex',
    //             flexDirection: 'column',
    //             gap: '10px',
    //             mt: 2,
    //           }}
    //         >
    //           <Typography variant="h4" fontWeight="bold">
    //             User Id
    //           </Typography>
    //           <Typography variant="h5">{data.payload.userId}</Typography>
    //         </Box>

    //         <Box
    //           sx={{
    //             display: 'flex',
    //             flexDirection: 'column',
    //             gap: '10px',
    //             mt: 2,
    //           }}
    //         >
    //           <Typography variant="h4" fontWeight="bold">
    //             Name
    //           </Typography>
    //           <Typography variant="h5">{data.payload.name}</Typography>
    //         </Box>

    //         <Box
    //           sx={{
    //             display: 'flex',
    //             flexDirection: 'column',
    //             gap: '10px',
    //             my: 2,
    //           }}
    //         >
    //           <Typography variant="h4" fontWeight="bold">
    //             Email
    //           </Typography>
    //           <Typography variant="h5">{data.payload.email}</Typography>
    //         </Box>

    //         <Box
    //           sx={{
    //             display: 'flex',
    //             flexDirection: 'column',
    //             gap: '10px',
    //             my: 2,
    //           }}
    //         >
    //           <Typography variant="h4" fontWeight="bold">
    //             Job Label
    //           </Typography>
    //           <Typography variant="h5">{data.payload.jobLabel}</Typography>
    //         </Box>

    //         <Box
    //           sx={{
    //             display: 'flex',
    //             flexDirection: 'column',
    //             gap: '10px',
    //             my: 2,
    //           }}
    //         >
    //           <Typography variant="h4" fontWeight="bold">
    //             Role
    //           </Typography>
    //           <Typography variant="h5">{data.payload.role}</Typography>
    //         </Box>
    //         <Box
    //           sx={{
    //             display: 'flex',
    //             flexDirection: 'column',
    //             gap: '10px',
    //             my: 2,
    //           }}
    //         >
    //           <Typography variant="h4" fontWeight="bold">
    //             Permissions
    //           </Typography>
    //           <Typography variant="h5">{`canApprove: ${data.payload.permissions.canApprove}`}</Typography>
    //           <Typography variant="h5">{`canRevise: ${data.payload.permissions.canEdit}`}</Typography>
    //           <Typography variant="h5">{`canEdit: ${data.payload.permissions.canPrepare}`}</Typography>
    //           <Typography variant="h5">{`canEditAmount: ${data.payload.permissions.canEditAmount}`}</Typography>
    //           <Typography variant="h5">{`canVerify: ${data.payload.permissions.canVerify}`}</Typography>
    //         </Box>
    //       </Box>
    //     )
    //   )}
    // </Box>


    // {isLoading && (

    //   <CircularProgress/>
    // )}


    data.payload.length !== 0 && (
      <Box
        display="flex"
        width="80%"
        bgcolor={colors.white[100]}
        borderRadius="20px"
        height="800px"
        marginTop="50px"
        sx={{ margin: 'auto' }}
        flexDirection="column"
      >

        <Box
          sx={{
            display: 'flex',
            mb: 2,
            marginLeft: '3%',
            mt: '30px',
            width: '80%',
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
          sx={{ margin: '50px', mt: "-20px", flexDirection: 'column' }}
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

      </Box>
    )
  )
}

export default UserDetail;
