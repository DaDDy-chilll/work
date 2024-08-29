/* eslint-disable react/prop-types */
import { Check, Delete } from '@mui/icons-material';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export const DraggableUserCard = ({ index, moveItem, item, onRemoveUser }) => {
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
      className="flex justify-between p-3 border-t cursor-pointer"
      key={item._id}
    >
      <div className="flex items-center gap-2">
        <div onClick={() => onRemoveUser(item)}>
          <Delete className="text-xl text-red-500 cursor-pointer" />
        </div>
        <div>
          <p className="font-medium flex gap-1">
            {item.name}
            {item.isDisabled && <span className="text-red-600">(deleted)</span>}
          </p>
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
  );
};
