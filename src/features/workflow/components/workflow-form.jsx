/* eslint-disable react/prop-types */
import { Formik } from 'formik';
import { WorkflowDepartmentList } from '@/features/department';
import { WorkflowUserList } from '@/features/user';
import {
  initialValues,
  useCreateWorkflow,
  useWorkflow,
  workflowSchema,
} from '..';
import CustomFormLabel from '../../../components/shared/CustomFormLabel';
import FormTextField from '../../../components/shared/FormTextField';
import { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const WorkflowForm = () => {
  const {
    saveUsers,
    saveDepartments,
    removeDepartment,
    selectedDepartments,
    selectedUsers,
    removeUser,
  } = useWorkflow();

  const [optionValue, setOptionValue] = useState(initialValues.type);

  const { mutate: createWorkflow, isLoading } = useCreateWorkflow();

  const handleCreate = (values) => {
    const departmentOrders = selectedDepartments.map((department) => ({
      department: department._id,
      index: department.order,
    }));

    const reviewers = selectedUsers.map((user) => ({
      reviewer: user._id,
      department: user.department._id,
      index: user.index,
    }));

    createWorkflow(
      { ...values, departmentOrders, reviewers },
      {
        onSuccess: () => {
          toast.success('Workflow is created.');
          navigate('/workflows');
        },
      },
    );
  };

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={workflowSchema}
      onSubmit={handleCreate}
    >
      {(props) => {
        const handleOptionChange = (value) => {
          setOptionValue(value);
          props.setFieldValue('type', value);
        };
        return (
          <form className="flex flex-col gap-5" onSubmit={props.handleSubmit}>
            <div className="flex gap-2">
              <div className="w-1/2">
                <CustomFormLabel label="Work Flow Title" required={true} />
                <FormTextField
                  type="text"
                  formProps={props}
                  name="name"
                  placeholder="Enter Work Flow Title"
                />
              </div>
              <div className="w-1/2">
                <CustomFormLabel
                  label="Work Flow Description"
                  required={true}
                />
                <FormTextField
                  type="text"
                  formProps={props}
                  name="description"
                  placeholder="Enter Work Flow Description"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <CustomFormLabel label="Private Work Flow ?" required={true} />
              <div className="flex gap-1">
                <div
                  className={`w-[70px] h-[30px] rounded-lg flex justify-center items-center cursor-pointer ${
                    optionValue === 'normal'
                      ? 'bg-primary-800 text-white'
                      : 'bg-secondary-200 text-black'
                  }`}
                  onClick={() => handleOptionChange('normal')}
                >
                  No
                </div>
                <div
                  className={`w-[70px] h-[30px] rounded-lg flex justify-center items-center cursor-pointer ${
                    optionValue !== 'normal'
                      ? 'bg-primary-800 text-white'
                      : 'bg-secondary-200 text-black'
                  }`}
                  onClick={() => handleOptionChange('private')}
                >
                  Yes
                </div>
              </div>
            </div>
            <WorkflowDepartmentList
              saveDepartments={saveDepartments}
              selectedDepartments={selectedDepartments}
              onRemoveDepartment={removeDepartment}
              selectedUsers={selectedUsers}
              chosenDepartments={selectedDepartments}
            />
            {selectedDepartments &&
              selectedDepartments.map((item) => (
                <WorkflowUserList
                  key={item._id}
                  department={item}
                  saveUsers={saveUsers}
                  chosenUsers={selectedUsers}
                  onRemoveUser={removeUser}
                />
              ))}
            <div className="flex gap-2 justify-end">
              <Button
                className="w-1/6"
                variant="outlined"
                onClick={() => navigate('/workflows')}
              >
                Cancel
              </Button>
              <Button
                className="w-1/6"
                variant="contained"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size="20px" /> : 'Save'}
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
