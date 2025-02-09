/* eslint-disable react/prop-types */
import { Button, Checkbox, Input, Typography } from '@mui/material';
import CustomFormLabel from '../../../components/shared/CustomFormLabel';
import { Add } from '@mui/icons-material';
import { useDisclosure } from '../../../hooks/useDisclosure';
import Modal from '../../../components/ui/Modal';
import { DraggableDepartmentCard, getDepartments } from '..';
import { ROLES } from '@/constants';
import { useEffect, useState } from 'react';

const SelectDepartment = ({ saveDepartments, onClose, chosenDepartments }) => {
  const [departments, setDepartments] = useState();
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDepartments({ limit: 0 });

      setDepartments(
        data?.payload.filter((item) => {
          return (
            !chosenDepartments.some((d) => d._id === item._id) &&
            item.name !== ROLES.SUPER_ADMIN
          );
        }),
      );
    };

    fetchData();
  }, [chosenDepartments]);

  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const onSelectDepartment = (e) => {
    if (e.target.checked === true) {
      setSelectedDepartments((prev) => [
        ...prev.filter(
          (selectedDepartment) => selectedDepartment.name !== e.target.name,
        ),
        {
          _id: e.target.name,
          name: e.target.value,
          order: prev.length,
        },
      ]);
    } else if (e.target.checked === false) {
      setSelectedDepartments((prev) =>
        prev
          .filter(
            (selectedDepartment) => selectedDepartment._id !== e.target.name,
          )
          .map((department, index) => ({
            ...department,
            order: index,
          })),
      );
    }
  };

  const onSave = () => {
    saveDepartments(selectedDepartments);
    onClose();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 ">
        <Input
        type='search'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Department"
          sx={{
            width: '100%',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: 'white',

          }}
        />
        {departments &&
          departments?.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))?.map((item) => (
            <div className="flex items-center cursor-pointer" key={item._id}>
              <Checkbox
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: '20px' },
                }}
                name={item._id}
                value={item.name}
                onChange={onSelectDepartment}
                id={item._id}
              />
              <label htmlFor={item._id} className="cursor-pointer">{item.name}</label>
            </div>
          ))}
      </div>
      <div className="flex gap-2 justify-end sticky bottom-0 bg-white w-full">
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

export const WorkflowDepartmentList = ({
  saveDepartments,
  onRemoveDepartment,
  selectedUsers,
  chosenDepartments,
  onDragDepartment,
  error,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [departmentError, setDepartmentError] = useState({
    error: false,
    message: '',
    type: '',
  });

  useEffect(() => {
    if (error.error && error.type === 'departmentOrders' && !departmentError.error) {
      setDepartmentError(error);
    }

    if(chosenDepartments.length > 0){
      setDepartmentError({
        error:false,
        message:'',
        type:''
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error,chosenDepartments]);


  return (
    <div>
      <CustomFormLabel label="Department Lists" />
      <div className="flex gap-3 flex-wrap">
        {chosenDepartments?.map((item, index) => (
          <DraggableDepartmentCard
            key={item._id}
            moveItem={onDragDepartment}
            index={index}
            item={item}
            onRemoveDepartment={onRemoveDepartment}
            selectedUsers={selectedUsers}
          />
        ))}
        <div
          className="bg-secondary-200 w-[32.5%] text-primary-800 border-2 rounded-lg min-h-[120px] flex justify-center items-center gap-1 font-semibold cursor-pointer"
          onClick={onOpen}
        >
          <Add /> Add Department
        </div>
      </div>
      <Modal
        title="Add Department"
        isOpen={isOpen}
        onClose={onClose}
        content={
          <SelectDepartment
            saveDepartments={saveDepartments}
            onClose={onClose}
            chosenDepartments={chosenDepartments}
          />
        }
        maxWidth="sm"
      />
      {departmentError.error && departmentError.type === 'departmentOrders' && (
        <Typography color="error">{departmentError.message}</Typography>
      )}
    </div>
  );
};
