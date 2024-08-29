/* eslint-disable react/prop-types */
import { Delete } from '@mui/icons-material';
import { Divider } from '@mui/material';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export const DraggableDepartmentCard = ({
  index,
  moveItem,
  item,
  selectedUsers,
  onRemoveDepartment,
}) => {
  const users = selectedUsers.filter(
    (user) => user.department._id === item._id,
  );

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // eslint-disable-next-line no-unused-vars
  const [spec, dropRef] = useDrop({
    accept: 'item',
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      ref={dragDropRef}
      style={{ opacity }}
      className="bg-secondary-200 w-[32.5%] border-2 rounded-lg min-h-[120px] cursor-pointer p-3 flex flex-col gap-3"
    >
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
            <li key={item._id} className="flex gap-1">
              {item.name}
              {item.isDisabled && (
                <span className="text-red-600">(deleted)</span>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <div className="text-center">No Selected Reviewers</div>
      )}
    </div>
  );
};
