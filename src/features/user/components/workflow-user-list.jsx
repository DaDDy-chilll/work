/* eslint-disable react/prop-types */
import CustomFormLabel from '../../../components/shared/CustomFormLabel';
import CustomTooltip from '../../../components/shared/CustomTooltip';
import { Add, Check } from '@mui/icons-material';
import { useDisclosure } from '../../../hooks/useDisclosure';
import Modal from '../../../components/ui/Modal';
import { DraggableUserCard, getUsers } from '..';
import { Button, Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';

const SelectWorkflowUser = ({
  department,
  saveUsers,
  onClose,
  chosenUsers,
}) => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers({ limit: 0, department: department._id });

      setUsers(
        data?.payload.filter((item) => {
          return !chosenUsers.some((d) => d._id === item._id);
        }),
      );
    };

    fetchData();
  }, [chosenUsers, department._id]);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const onSelectUser = ({ checked, ...user }) => {
    if (checked === true) {
      setSelectedUsers((prev) => [
        ...prev,
        {
          index: prev.length,
          ...user,
        },
      ]);
    } else if (checked === false) {
      setSelectedUsers((prev) =>
        prev
          .filter((item) => item._id !== user._id)
          .map((user, index) => ({
            ...user,
            index,
          })),
      );
    }
  };

  const onSave = () => {
    onClose();
    saveUsers(selectedUsers);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <CustomFormLabel label="Select Members" />
        <CustomTooltip innerText="Your form will be requested as your selected member order." />
      </div>
      <div className="rounded-lg border">
        <div className="flex justify-between p-3 font-semibold">
          <div>Name & Role</div>
          <div className="flex gap-20">
            <div>Approve</div>
            <div>Authorize</div>
            <div>Verify</div>
            <div>Edit</div>
            <div>Return</div>
            <div className='mr-5'>Advance Return</div>
          </div>
        </div>
        {users &&
          users?.map((item) => (
            <div className="flex justify-between p-3 border-t" key={item._id}>
              <div className="flex items-center">
                <Checkbox
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: '20px' },
                  }}
                  name={item._id}
                  value={item.name}
                  onChange={({ target: { checked } }) =>
                    onSelectUser({
                      checked,
                      ...item,
                    })
                  }
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500 text-sm">{item.jobLabel}</p>
                </div>
              </div>
              <div className="flex gap-[110px] mr-20">
                {item?.permissions?.canApprove ? (
                  <Check className="text-2xl text-primary-800" />
                ):<span className='w-6'></span>}
                {item?.permissions?.canAuthorize ? (
                  <Check className="text-2xl text-primary-800" />
                ):<span className='w-6'></span>}
                {item?.permissions?.canVerify ? (
                  <Check className="text-2xl text-primary-800" />
                ):<span className='w-6'></span>}
                {item?.permissions?.canEdit ? (
                  <Check className="text-2xl text-primary-800" />
                ):<span className='w-6'></span>}
                {item?.permissions?.canNormalReturn ? (
                  <Check className="text-2xl text-primary-800" />
                ):<span className='w-6'></span>}
                {item?.permissions?.canAdvanceReturn ? (
                  <Check className="text-2xl text-primary-800" />
                ):<span className='w-6'></span>}
              </div>
            </div>
          ))}
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

const WorkflowUsers = ({
  department,
  saveUsers,
  chosenUsers,
  onRemoveUser,
  onDragUser,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const users = chosenUsers.filter(
    (user) => user.department._id === department._id,
  );

  return (
    <div className="border-2 rounded-lg">
      <div className="flex justify-between p-3">
        <div>Name & Role</div>
        <div className="flex gap-32">
          <div>Approve</div>
          <div>Authorize</div>
          <div>Verify</div>
          <div>Edit</div>
          <div>Return</div>
          <div>Advance Return</div>
        </div>
      </div>
      {users.map((item, index) => (
        <DraggableUserCard
          key={item._id}
          moveItem={onDragUser}
          index={index}
          item={item}
          onRemoveUser={onRemoveUser}
        />
      ))}
      <div
        className="bg-primary-800 text-white p-3 text-center font-semibold cursor-pointer rounded-b-lg"
        onClick={onOpen}
      >
        <Add /> Add Member
      </div>
      <Modal
        title={`Add Member from ${department.name}`}
        isOpen={isOpen}
        onClose={onClose}
        content={
          <SelectWorkflowUser
            department={department}
            saveUsers={saveUsers}
            onClose={onClose}
            chosenUsers={chosenUsers}
          />
        }
        maxWidth="lg"
      />
    </div>
  );
};

export const WorkflowUserList = ({
  department,
  saveUsers,
  chosenUsers,
  onRemoveUser,
  onDragUser,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <CustomFormLabel label={`Select ${department?.name}`} />
        <CustomTooltip innerText="Your form will be requested as your selected member order." />
      </div>
      <WorkflowUsers
        department={department}
        saveUsers={saveUsers}
        chosenUsers={chosenUsers}
        onRemoveUser={onRemoveUser}
        onDragUser={onDragUser}
      />
    </div>
  );
};
