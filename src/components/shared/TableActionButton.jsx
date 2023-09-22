/* eslint-disable react/prop-types */
import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button, CircularProgress, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useDisableUser, useGetUserDetail } from '../../api';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { useDisclosure } from '../../hooks/useDisclosure';
import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';
import UserForm from '../form/UserForm';

const TableActionButton = ({ userId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isOpen, onClose, onOpen } = useDisclosure();

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
    };
  }

  const { mutate: disableMutation, isLoading: disableLoading } =
    useDisableUser();
  const handleDisable = () => {
    disableMutation(userId, {
      onSuccess: () => {
        toast.success('ok');
      },
      onSettled: () => {
        queryClient.invalidateQueries(['users']);
      },
    });
  };

  const [isChangePassword, setIsChangePassword] = useState(false);

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
        <MenuItem onClick={() => navigate(`/users/${userId}`)} disableRipple>
          View
        </MenuItem>
        {!data?.payload?.isDisabled && (
          <>
            <MenuItem onClick={onOpen} disableRipple>
              Edit
            </MenuItem>
            <MenuItem onClick={handleDisable} disableRipple>
              {disableLoading ? <CircularProgress size={20} /> : 'Disable'}
            </MenuItem>
            <MenuItem onClick={() => setIsChangePassword(true)} disableRipple>
              Change Password
            </MenuItem>
          </>
        )}
      </Menu>
      <Box>
        <Modal
          title="Edit User"
          isOpen={isOpen}
          onClose={onClose}
          content={<UserForm onClose={onClose} oldData={oldData} />}
        />
        <Modal
          title="Edit User Password"
          isOpen={isChangePassword}
          onClose={() => setIsChangePassword(false)}
          content={
            <UserForm
              onClose={() => setIsChangePassword(false)}
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
