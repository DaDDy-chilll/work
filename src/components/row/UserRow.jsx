/* eslint-disable react/prop-types */
import { Button, TableBody } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../styled';
import { Link } from 'react-router-dom';
import { useDisclosure } from '../../hooks/useDisclosure';
import Modal from '../ui/Modal';
import UserForm from '../form/UserForm';
import { useDisableUser } from '../../api';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { useState } from 'react';

const UserRow = ({ payload }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [changePassword, setChangePassword] = useState(false);

  const { mutate: disableMutation } = useDisableUser();

  const queryClient = useQueryClient();

  const handleDisable = (id) => {
    disableMutation(id, {
      onSuccess: () => {
        toast.success('ok');
      },
      onSettled: () => {
        queryClient.invalidateQueries(['users']);
      },
    });
  };

  const handleChangePasswordOpen = () => {
    setChangePassword(true);
  };

  const handleChangePasswordClose = () => {
    setChangePassword(false);
  };

  return (
    <TableBody>
      {payload &&
        payload.map((data) => (
          <StyledTableRow key={data?._id}>
            <StyledTableCell>{data?.userId}</StyledTableCell>
            <StyledTableCell>{data?.name}</StyledTableCell>
            <StyledTableCell>{data?.email}</StyledTableCell>
            <StyledTableCell>{data?.department.name}</StyledTableCell>
            <StyledTableCell>{data?.jobLabel}</StyledTableCell>
            <StyledTableCell align="center" sx={{ display: 'flex', gap: 1 }}>
              <Link to={`/users/${data?._id}`}>
                <Button variant="contained" color="primary">
                  View
                </Button>
              </Link>

              <Button variant="contained" color="warning" onClick={onOpen}>
                Edit
              </Button>
              <Modal
                title="Edit User"
                isOpen={isOpen}
                onClose={onClose}
                content={<UserForm onClose={onClose} />}
              />

              <Button
                disabled={data?.isDisabled}
                variant="contained"
                color="error"
                onClick={() => handleDisable(data?._id)}
              >
                Disable
              </Button>

              <Button
                variant="contained"
                color="success"
                onClick={handleChangePasswordOpen}
              >
                Change Password
              </Button>
              <Modal
                title="Change Password"
                isOpen={changePassword}
                onClose={handleChangePasswordClose}
                content={<UserForm onClose={handleChangePasswordClose} />}
              />
            </StyledTableCell>
          </StyledTableRow>
        ))}
    </TableBody>
  );
};

export default UserRow;
