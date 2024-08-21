/* eslint-disable react/prop-types */
import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button, CircularProgress, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useDisableUser, useGetAllRequests, useGetUserDetail } from '../../api';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { useDisclosure } from '../../hooks/useDisclosure';
import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';
import UserForm from '../form/UserForm';
import { colors } from '../../assets/theme/theme';

const DeleteUserAlertMessage = ({ onClose, userId }) => {
  const { data } = useGetAllRequests({
    pendingReviewer: userId,
    limit: 0,
  });

  return (
    <div>
      <div className="flex flex-col gap-3">
        <p className="font-semibold">You can’t delete this user.</p>
        <p>
          If you want to delete this user, this user have to complete the
          following documents.
        </p>
        <ul className="list-inside list-disc">
          {data?.payload &&
            data?.payload?.map((item) => (
              <li key={item._id}>
                {item.name}{' '}
                <span
                  className="font-semibold"
                  style={{ color: colors.paleBlue[800] }}
                >
                  ({item.documentId})
                </span>
              </li>
            ))}
        </ul>
      </div>
      <Box display="flex" justifyContent="end" gap={2} mt={2}>
        <Button color="primary" variant="contained" onClick={onClose}>
          Ok
        </Button>
      </Box>
    </div>
  );
};

const DeleteUserModal = ({ userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const { mutate: disableUser, isLoading } = useDisableUser();

  const [showAlert, setShowAlert] = useState(false);

  const onDisableUser = () => {
    disableUser(userId, {
      onSuccess: () => {
        toast.success('Deleted!');
        onClose();
        queryClient.invalidateQueries(['users']);
      },
      onError: () => {
        setShowAlert(true);
      },
    });
  };

  const onCloseAlert = () => {
    setShowAlert(false);
    onClose();
  };

  return (
    <div>
      <MenuItem sx={{ fontSize: '14px' }} onClick={onOpen} disableRipple>
        Delete
      </MenuItem>
      <Modal
        title="Delete User"
        isOpen={isOpen}
        onClose={onClose}
        content={
          showAlert ? (
            <DeleteUserAlertMessage onClose={onCloseAlert} userId={userId} />
          ) : (
            <div>
              <p>Are you sure to delete this user?</p>
              <Box display="flex" justifyContent="end" gap={2} mt={2}>
                <Button color="primary" variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={isLoading}
                  onClick={onDisableUser}
                >
                  {isLoading ? <CircularProgress size="20px" /> : 'Delete'}
                </Button>
              </Box>
            </div>
          )
        }
        maxWidth="sm"
      />
    </div>
  );
};

const TableActionButton = ({ userId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [isChangePassword, setIsChangePassword] = useState(false);

  const { data } = useGetUserDetail(userId);
  let oldData;

  if (data?.payload) {
    oldData = {
      id: data?.payload?._id,
      name: data?.payload?.name,
      email: data?.payload?.email,
      jobLabel: data?.payload?.jobLabel,
      department: data?.payload?.department,

      canApprove: data?.payload?.permissions?.canApprove,
      canVerify: data?.payload?.permissions?.canVerify,
      canPrepare: data?.payload?.permissions?.canPrepare,
      canEdit: data?.payload?.permissions?.canEdit,
      canEditAmount: data?.payload?.permissions?.canEditAmount,
      canForward: data?.payload?.permissions?.canForward,
      canMention: data?.payload?.permissions?.canMention,
      canNormalReturn: data?.payload?.permissions?.canNormalReturn,
      canAdvanceReturn: data?.payload?.permissions?.canAdvanceReturn,
    };
  }

  return (
    <div>
      <Button
        id="table-action-button"
        aria-controls={open ? 'table-action-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        Actions
      </Button>
      <Menu
        id="table-action-menu"
        MenuListProps={{
          'aria-labelledby': 'table-action-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          sx={{ fontSize: '14px' }}
          onClick={() => navigate(`/users/${userId}`)}
          disableRipple
        >
          View
        </MenuItem>
        {!data?.payload?.isDisabled && (
          <>
            <MenuItem
              sx={{ fontSize: '14px' }}
              onClick={() => {
                setIsChangePassword(false);
                onOpen();
              }}
              disableRipple
            >
              Edit
            </MenuItem>
            <DeleteUserModal userId={userId} />
            <MenuItem
              sx={{ fontSize: '14px' }}
              onClick={() => {
                setIsChangePassword(true);
                onOpen();
              }}
              disableRipple
            >
              Change Password
            </MenuItem>
          </>
        )}
      </Menu>
      <Box>
        <Modal
          title={isChangePassword ? 'Change Password' : 'Edit User'}
          isOpen={isOpen}
          onClose={onClose}
          content={
            <UserForm
              onClose={onClose}
              oldData={oldData}
              isChangePassword={isChangePassword}
            />
          }
        />
      </Box>
    </div>
  );
};

export default TableActionButton;
