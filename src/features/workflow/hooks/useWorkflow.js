import { useState } from 'react';

export const useWorkflow = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const saveDepartments = (data) => {
    setSelectedDepartments((items) =>
      [...items, ...data].map((item, index) => ({ ...item, order: index })),
    );
  };

  const removeDepartment = (department) => {
    setSelectedDepartments((departments) => {
      return departments
        .filter((item) => item._id !== department._id)
        .map((item, index) => ({ ...item, order: index }));
    });
  };

  const removeUser = (user) => {
    setSelectedUsers((users) => {
      return users
        .filter((item) => item._id !== user._id)
        .map((item, index) => ({ ...item, order: index }));
    });
  };

  const saveUsers = (data) => {
    setSelectedUsers((items) => [...data, ...items]);
  };

  return {
    selectedDepartments,
    selectedUsers,
    saveDepartments,
    saveUsers,
    removeDepartment,
    removeUser,
  };
};
