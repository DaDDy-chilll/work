import { Box } from '@mui/material';
import { colors } from '../assets/theme/theme';
import LinkButton from '../components/ui/LinkButton';
import { useDisclosure } from '../hooks/useDisclosure';
import SelectUsers from '../components/form/SelectUsers';
import DepartmentFlow from '../components/form/DepartmentFlow';
import { useEffect, useState } from 'react';
import SelectDepartments from '../components/form/SelectDepartments';
import DepartmentLists from '../components/form/DepartmentLists';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateWorkflowPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // SELECT DEPARTMENT FLOW
  const handleDepartmentChange = (e) => {
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
  const departments = selectedDepartments.map((department) => {
    return {
      name: department.name,
      users: selectedUsers.filter((user) => {
        if (user.departmentId === department._id) {
          return user;
        }
      }),
    };
  });

  // FETCH USERS BY DEPARTMENT ID
  const [users, setUsers] = useState([]);
  const [fetchUserLoading, setFetchUserLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');
    async function fetchData() {
      try {
        setFetchUserLoading(true);
        for (let i = 0; i < selectedDepartments.length; i++) {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/users?department=${
              selectedDepartments[i]._id
            }`,
            {
              headers: {
                Authorization: 'Bearer ' + accessToken,
              },
            },
          );
          data && setUsers((prev) => [...prev, ...data.payload]);
        }
        setFetchUserLoading(false);
      } catch (err) {
        return toast.error(err.response.data.message);
      }
    }
    fetchData();
  }, [selectedDepartments]);

  // SELECT USER
  const handleSelectChange = ({
    userId,
    userName,
    departmentId,
    departmentName,
    checked,
  }) => {
    if (checked === true) {
      setSelectedUsers((prev) => [
        ...prev,
        {
          userId,
          name: userName,
          departmentId,
          departmentName,
          index: prev.length,
        },
      ]);
    } else if (checked === false) {
      setSelectedUsers((prev) =>
        prev
          .filter((user) => user.userId !== userId)
          .map((user, index) => ({
            ...user,
            index,
          })),
      );
    }
  };

  const handleOnSubmit = () => {};

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          mb: '20px',
          mx: '20px',
        }}
      >
        <LinkButton
          to={'/workflows'}
          innerText="Back"
          variant="contained"
          color="primary"
        />
      </Box>
      <Box bgcolor={colors.white[100]} m="20px" p={5} borderRadius="10px">
        <form onSubmit={handleOnSubmit} style={{ height: 'auto' }}>
          {isOpen ? (
            <SelectUsers onClose={onClose} createLoading={false}>
              <DepartmentLists
                departments={departments}
                handleSelectChange={handleSelectChange}
                isLoading={fetchUserLoading}
                payloads={users}
                selectedUsers={selectedUsers}
              />
            </SelectUsers>
          ) : (
            <SelectDepartments onOpen={onOpen}>
              <DepartmentFlow
                selectedDepartments={selectedDepartments}
                handleDepartmentChange={handleDepartmentChange}
              />
            </SelectDepartments>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default CreateWorkflowPage;
