/* eslint-disable react/prop-types */
import { Formik } from 'formik';
import DepartmentFlow from './DepartmentFlow';
import DepartmentLists from './DepartmentLists';
import SelectDepartments from './SelectDepartments';
import SelectUsers from './SelectUsers';
import {
  workflowCreateSchema,
  workflowCreateValues,
} from '../../schema/workflow.schema';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCreateWorkflow } from '../../api';
import { useQueryClient } from 'react-query';
import { Box, CircularProgress } from '@mui/material';
import DepartmentMemberLists from './DepartmentMemberLists';
import { useNavigate } from 'react-router-dom';

const WorkFlowForm = ({ isOpen, onClose, onOpen }) => {
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
        let members = [];

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
          if (data?.payload) {
            members = data?.payload;
          }
        }

        members.length !== 0 &&
          setUsers((prev) => {
            let filteredMembers = members.filter(
              (obj1) => !prev.some((obj2) => obj2.id === obj1.id),
            );

            // let result = filteredMembers.filter(
            //   (obj1) =>
            //     !members.some(
            //       (obj2) => obj2?.department?._id === obj1?.department?._id,
            //     ),
            // );

            return prev.length === 0
              ? [...members]
              : [...prev, ...filteredMembers];
          });
        setFetchUserLoading(false);
      } catch (err) {
        setFetchUserLoading(false);
        return toast.error(err.response.data.message);
      }
    }
    fetchData();
  }, [selectedDepartments]);

  let result;

  if (!fetchUserLoading) {
    if (users) {
      let depts = [];
      users.forEach((p) => {
        depts.push(p.department.name);
      });

      depts = [...new Set([...depts])];

      result = depts.map((dpt) => {
        const filteredUsers = users.filter((p) => p.department.name === dpt);
        return {
          name: dpt,
          users: filteredUsers,
        };
      });
    }
  }

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

  const { mutate: createMutation, isLoading: createLoading } =
    useCreateWorkflow();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleCreate = (values) => {
    const departmentOrders = selectedDepartments.map((department) => ({
      department: department._id,
      index: department.order,
    }));

    const reviewers = selectedUsers.map((user) => ({
      reviewer: user.userId,
      department: user.departmentId,
      index: user.index,
    }));

    createMutation(
      { ...values, departmentOrders, reviewers },
      {
        onSuccess: () => {
          toast.success('ok');
          queryClient.invalidateQueries(['workflows']);
          onClose();
          navigate('/workflows');
        },
      },
    );
  };

  return (
    <Formik
      initialValues={workflowCreateValues}
      validationSchema={workflowCreateSchema}
      onSubmit={handleCreate}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          {isOpen ? (
            <SelectUsers onClose={onClose} loading={createLoading}>
              <DepartmentLists
                departments={departments}
                handleSelectChange={handleSelectChange}
                selectedUsers={selectedUsers}
              >
                {fetchUserLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>
                ) : result ? (
                  result.map((department, i) => (
                    <DepartmentMemberLists
                      handleSelectChange={handleSelectChange}
                      key={i}
                      department={department}
                    />
                  ))
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>
                )}
              </DepartmentLists>
            </SelectUsers>
          ) : (
            <SelectDepartments onOpen={onOpen} formProps={props}>
              <DepartmentFlow
                selectedDepartments={selectedDepartments}
                handleDepartmentChange={handleDepartmentChange}
              />
            </SelectDepartments>
          )}
        </form>
      )}
    </Formik>
  );
};

export default WorkFlowForm;
