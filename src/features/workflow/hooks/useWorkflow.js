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
    setSelectedUsers(
      selectedUsers.filter((user) => user.department._id !== department._id),
    );
  };

  const removeUser = (user) => {
    setSelectedUsers((users) => {
      return users
        .filter((item) => item._id !== user._id)
        .map((item, index) => ({ ...item, order: index }));
    });
  };

  const saveUsers = (data) => {
    setSelectedUsers((items) => {
      const users = [...items, ...data].map((item, index) => ({
        ...item,
        order: index,
      }));

      return users;
    });
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

          const newDepartments = items.map((item, index) => ({
            ...item,
            order: index,
          }));

          const dragUsers = selectedUsers.filter(
            (item) =>
              item.department._id === selectedDepartments[dragIndex]._id,
          );
          const hoverUsers = selectedUsers.filter(
            (item) =>
              item.department._id === selectedDepartments[hoverIndex]._id,
          );

          const dragItemOrder = newDepartments.find(
            (item) => item._id === dragItem._id,
          ).order;
          const hoverItemOrder = newDepartments.find(
            (item) => item._id === hoverItem._id,
          ).order;

          const newUsers =
            dragItemOrder < hoverItemOrder
              ? [...dragUsers, ...hoverUsers]
              : [...hoverUsers, ...dragUsers];

          setSelectedUsers((items) =>
            newUsers.filter((item) => items.some((d) => d._id === item._id)),
          );

          return newDepartments;
        });
      }
    },
    [selectedDepartments, selectedUsers],
  );

  const onDragUser = useCallback(
    (dragIndex, hoverIndex) => {
      if (dragIndex !== hoverIndex) {
        const dragItem = selectedUsers[dragIndex];
        const hoverItem = selectedUsers[hoverIndex];

        setSelectedUsers((users) => {
          const items = [...users];
          items[dragIndex] = hoverItem;
          items[hoverIndex] = dragItem;
          return items.map((item, index) => ({
            ...item,
            order: index,
          }));
        });
      }
    },
    [selectedUsers],
  );

  return {
    selectedDepartments,
    selectedUsers,
    saveDepartments,
    saveUsers,
    removeDepartment,
    removeUser,
    onDragDepartment,
    onDragUser,
  };
};
