import { useCallback, useState } from 'react';

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

  const onDragDepartment = useCallback(
    (dragIndex, hoverIndex) => {
      if (dragIndex !== hoverIndex) {
        const dragItem = selectedDepartments[dragIndex];
        const hoverItem = selectedDepartments[hoverIndex];

        setSelectedDepartments((departments) => {
          const items = [...departments];
          items[dragIndex] = hoverItem;
          items[hoverIndex] = dragItem;
          return items.map((item, index) => ({
            ...item,
            order: index,
          }));
        });
      }
    },
    [selectedDepartments],
  );

  return {
    selectedDepartments,
    selectedUsers,
    saveDepartments,
    saveUsers,
    removeDepartment,
    removeUser,
    onDragDepartment,
  };
};
