/* eslint-disable react/prop-types */
import { Divider } from '@mui/material';
import { Delete } from '@mui/icons-material';

export const DepartmentCard = ({ item, onRemoveDepartment, selectedUsers }) => {
  const users = selectedUsers.filter(
    (user) => user.department._id === item._id,
  );

  return (
    <div className="bg-secondary-200 w-1/3 border-2 rounded-lg h-[120px] cursor-pointer p-3 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="bg-primary-800 text-white rounded-full w-[25px] h-[25px] flex justify-center items-center">
            {item.order + 1}
          </div>
          <div>{item.name}</div>
        </div>
        <div onClick={() => onRemoveDepartment(item)}>
          <Delete className="text-xl text-red-600" />
        </div>
      </div>
      <Divider />
      {users?.length ? (
        <ol className="list-decimal list-inside">
          {users.map((item) => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ol>
      ) : (
        <div className="text-center">No Selected Reviewers</div>
      )}
    </div>
  );
};
