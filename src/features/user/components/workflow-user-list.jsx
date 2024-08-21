/* eslint-disable react/prop-types */
import CustomFormLabel from '../../../components/shared/CustomFormLabel';
import CustomTooltip from '../../../components/shared/CustomTooltip';
import { Add, Check, Delete } from '@mui/icons-material';
import { useDisclosure } from '../../../hooks/useDisclosure';
import Modal from '../../../components/ui/Modal';
import { getUsers } from '..';
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
          <div className="flex gap-32">
            <div>Approve</div>
            <div>Verify</div>
            <div>Prepare</div>
            <div>Revise</div>
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
              <div className="flex gap-[163px]">
                {item?.permissions?.canApprove && (
                  <Check className="text-2xl text-primary-800" />
                )}
                {item?.permissions?.canVerify && (
                  <Check className="text-2xl text-primary-800" />
                )}
                {item?.permissions?.canPrepare && (
                  <Check className="text-2xl text-primary-800" />
                )}
                {item?.permissions?.canEdit && (
                  <Check className="text-2xl text-primary-800" />
                )}
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
          <div>Verify</div>
          <div>Edit</div>
          <div>Prepare</div>
        </div>
      </div>
      {users.map((item) => (
        <div className="flex justify-between p-3 border-t" key={item._id}>
          <div className="flex items-center gap-2">
            <div onClick={() => onRemoveUser(item)}>
              <Delete className="text-xl text-red-500 cursor-pointer" />
            </div>
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500 text-sm">{item.jobLabel}</p>
            </div>
          </div>
          <div className="flex gap-[150px]">
            {item?.permissions?.canApprove && (
              <Check className="text-2xl text-primary-800" />
            )}
            {item?.permissions?.canVerify && (
              <Check className="text-2xl text-primary-800" />
            )}
            {item?.permissions?.canPrepare && (
              <Check className="text-2xl text-primary-800" />
            )}
            {item?.permissions?.canEdit && (
              <Check className="text-2xl text-primary-800" />
            )}
          </div>
        </div>
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
        maxWidth="md"
      />
    </div>
  );
};

export const WorkflowUserList = ({
  department,
  saveUsers,
  chosenUsers,
  onRemoveUser,
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
      />
    </div>
  );
};
