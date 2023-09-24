/* eslint-disable react/prop-types */
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetUserDetail } from '../api/user';
import { colors } from '../assets/theme/theme';
import LinkButton from '../components/ui/LinkButton';

const Item = ({ fieldName, value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minWidth: '30%',
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        {fieldName}
      </Typography>
      {value}
    </Box>
  );
};

const UserPermissionCheckbox = ({ label }) => {
  return (
    <FormControlLabel
      control={<Checkbox />}
      label={label}
      checked={true}
      value={true}
      disabled
    />
  );
};

const UserPermissions = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: 'repeat(4, 22%)',
      }}
    >
      <UserPermissionCheckbox label="Create" />
      <UserPermissionCheckbox label="Comment" />
      <UserPermissionCheckbox label="Reject" />
      <UserPermissionCheckbox label="Acknowledge" />
      <UserPermissionCheckbox label="Create" />
      <UserPermissionCheckbox label="Comment" />
      <UserPermissionCheckbox label="Reject" />
      <UserPermissionCheckbox label="Acknowledge" />
    </Box>
  );
};

const UserDetailPage = () => {
  const { id } = useParams();

  const { data: user, isLoading } = useGetUserDetail(id);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        m: 2,
        mx: 'auto',
        width: '80%',
      }}
    >
      <Typography variant="h1">View User Detail</Typography>
      {isLoading ? (
        <CircularProgress size={48} />
      ) : (
        user?.payload && (
          <Box bgcolor={colors.white[100]} borderRadius="1rem">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                px: 4,
                py: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Item fieldName="User Id" value={user?.payload?.userId} />
                <Item fieldName="Name" value={user?.payload?.name} />
                <Item fieldName="Email" value={user?.payload?.email} />
              </Box>
              <Item fieldName="User Permissions" value={<UserPermissions />} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'right',
                borderTop: `1px solid ${colors.grey[400]}`,
                pt: 2,
                px: 4,
                gap: 1,
              }}
            >
              <LinkButton
                width="200px"
                innerText="Back"
                to="/users"
                variant="contained"
                color="primary"
              />
            </Box>
          </Box>
        )
      )}
    </Box>
  );
};

export default UserDetailPage;
