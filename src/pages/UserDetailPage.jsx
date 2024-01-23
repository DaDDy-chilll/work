/* eslint-disable react/prop-types */
import { Box, Checkbox, CircularProgress, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserDetail } from '../api/user';
import { colors } from '../assets/theme/theme';
import LinkButton from '../components/ui/LinkButton';
import { PERMISSIONS } from '../constants/auth';
import { usePageTitle } from '../hooks';

const Item = ({ fieldName, value }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minWidth: '30%',
      }}
    >
      <Typography
        sx={{ fontSize: '16px', fontWeight: 'bold', color: colors.black[100] }}
      >
        {fieldName}
      </Typography>
      {value}
    </Box>
  );
};

const PermissionCheckbox = ({ label, defaultValue }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Checkbox
        sx={{
          '& .MuiSvgIcon-root': { fontSize: '20px' },
        }}
        checked={defaultValue}
        disabled
      />
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 400,
          color: colors.black[300],
          textTransform: 'capitalize',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

const UserPermissions = ({ permissions }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: 'repeat(4, 22%)',
      }}
    >
      <PermissionCheckbox label={PERMISSIONS.CREATE} defaultValue={true} />
      <PermissionCheckbox label={PERMISSIONS.COMMENT} defaultValue={true} />
      <PermissionCheckbox label={PERMISSIONS.REJECT} defaultValue={true} />
      <PermissionCheckbox label={PERMISSIONS.ACKNOWLEDGE} defaultValue={true} />
      <PermissionCheckbox label={PERMISSIONS.REVERSE} defaultValue={true} />
      <PermissionCheckbox
        label={PERMISSIONS.APPROVE}
        defaultValue={permissions.canApprove}
      />

      <PermissionCheckbox
        label={PERMISSIONS.VERIFY}
        defaultValue={permissions.canVerify}
      />
      <PermissionCheckbox
        label={PERMISSIONS.PREPARE}
        defaultValue={permissions.canPrepare}
      />
      <PermissionCheckbox
        label={PERMISSIONS.EDIT_AMOUNT}
        defaultValue={permissions.canEditAmount}
      />
      <PermissionCheckbox
        label={PERMISSIONS.REVISE}
        defaultValue={permissions.canEdit}
      />
      <PermissionCheckbox
        label={PERMISSIONS.FORWARD}
        defaultValue={permissions.canForward}
      />
      <PermissionCheckbox
        label={PERMISSIONS.MENTION}
        defaultValue={permissions.canMention}
      />
    </Box>
  );
};

const UserDetailPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { pageTitle, setPageTitle } = usePageTitle('User Detail');

  const { id } = useParams();

  const { data: user, isLoading } = useGetUserDetail(id);

  const navigate = useNavigate();

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
      <Typography
        variant="h2"
        sx={{ fontWeight: 500, color: colors.black[100] }}
      >
        View User Information
      </Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={48} />
        </Box>
      ) : (
        user?.payload && (
          <Box bgcolor={colors.white[100]} borderRadius="1rem">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                px: 4,
                py: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  columnGap: 5,
                  rowGap: 3,
                }}
              >
                <Item fieldName="User Id" value={user?.payload?.userId} />
                <Item fieldName="Name" value={user?.payload?.name} />
                <Item fieldName="Email" value={user?.payload?.email} />
                <Item fieldName="Job Label" value={user?.payload?.jobLabel} />
                <Item
                  fieldName="Department"
                  value={user?.payload?.department.name}
                />
                <Item
                  fieldName="Disabled"
                  value={user?.payload?.isDisabled ? 'Yes' : 'No'}
                />
                <Item
                  fieldName="Role"
                  value={
                    <Typography sx={{ textTransform: 'capitalize' }}>
                      {user?.payload?.department?.type}
                    </Typography>
                  }
                />
              </Box>
              <Item
                fieldName="Permissions"
                value={
                  <UserPermissions permissions={user?.payload?.permissions} />
                }
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
                borderTop: `1px solid ${colors.grey[400]}`,
                py: 2,
                px: 4,
                gap: 1,
              }}
            >
              <LinkButton
                width="200px"
                innerText="Back"
                onClick={() => navigate('/users')}
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
