/* eslint-disable react/prop-types */
import { Formik } from 'formik';
import { WorkflowDepartmentList } from '@/features/department';
import { WorkflowUserList } from '@/features/user';
import {
  useCreateWorkflow,
  useUpdateWorkflow,
  useWorkflow,
  workflowSchema,
} from '..';
import CustomFormLabel from '../../../components/shared/CustomFormLabel';
import FormTextField from '../../../components/shared/FormTextField';
import { useMemo, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormSelect from '../../../components/shared/FormSelect';
import { Box, MenuItem } from '@mui/material';
import { WORKFLOW_TYPES_LIST } from '@/constants';
import SelectOrderWorkflows from '../../../components/form/SelectOrderWorkflows';

const WORKFLOW_TYPES_LISTS = Object.keys(WORKFLOW_TYPES_LIST).map((item) => ({
  text: WORKFLOW_TYPES_LIST[item],
  value: item,
}));



export const WorkflowForm = ({ initialValues, departments, users }) => {
  const {
    saveUsers,
    saveDepartments,
    removeDepartment,
    selectedDepartments,
    selectedUsers,
    removeUser,
    onDragDepartment,
    onDragUser,
  } = useWorkflow();

  const [optionValue, setOptionValue] = useState(initialValues.type);
  const [error, setError] = useState({
    error: false,
    message: '',
    type: '',
  });

  const { mutate: createWorkflow, isLoading: isCreateLoading } =
    useCreateWorkflow();
  const { mutate: updateWorkflow, isLoading: isEditLoading } =
    useUpdateWorkflow();

  const isEdit = departments && users;

  const onSubmit = (values) => {
    const departmentOrders = selectedDepartments.map((department) => ({
      department: department._id,
      index: department.order,
    }));

    const reviewers = selectedUsers.map((user, index) => ({
      reviewer: user._id,
      department: user.department._id,
      index,
    }));

    if (
      values.workflowType === Object.keys(WORKFLOW_TYPES_LIST)[0] &&
      !values.workflowOrderId
    ) {
      setError({
        error: true,
        message: 'Please select a order workflow',
        type: 'workflowOrderId',
      });
      return;
    }else{
      setError({
        error:false,
        message:'',
        type:''
      })
    }


    if (departmentOrders.length === 0 ) {
      setError({
        error: true,
        message: 'Please select at least one department',
        type: 'departmentOrders',
      });
      return;
    }else{
      setError({
        error:false,
        message:'',
        type:''
      })
    }

    const allDepartmentsHaveReviewer = departmentOrders.every(dept => 
      reviewers.some(reviewer => reviewer.department === dept.department)
    );

    if (reviewers.length === 0 || !allDepartmentsHaveReviewer) {
      toast.error('Each department must have at least one reviewer');
      return;
    } else {
      setError({
        error: false,
        message: '',
        type: ''
      });
    }

    if (isEdit) {
      const { name, description, type, workflowType, workflowOrderId } = values;
      const updateValues = {
        name,
        description,
        type,
        workflowType,
        id: initialValues?._id,
        departmentOrders,
        reviewers,
      };
   
      if (workflowOrderId) {
        updateValues.workflowOrderId = workflowOrderId;
      }
      updateWorkflow(updateValues, {
        onSuccess: () => {
          toast.success('Workflow is updated.');
          navigate('/workflows');
        },
      });
    } else {
      const submitValues = { ...values };
      console.table(submitValues);
      if (submitValues.workflowType === Object.keys(WORKFLOW_TYPES_LIST)[1])
        delete submitValues.workflowId;
      createWorkflow(
        { ...submitValues, departmentOrders, reviewers },
        {
          onSuccess: () => {
            toast.success('Workflow is created.');
            navigate('/workflows');
          },
        },
      );
    }
  };

  const onChange = (values) => {
    console.log('values', values);
  };

  const navigate = useNavigate();

  useMemo(() => {
    if (!selectedDepartments.length && departments) {
      saveDepartments(departments);
    }
    if (!selectedUsers.length && users) {
      saveUsers(users);
    }
  }, [
    departments,
    saveDepartments,
    saveUsers,
    selectedDepartments,
    selectedUsers,
    users,
  ]);

  console.log('error------------',error)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={workflowSchema}
      onSubmit={onSubmit}
      onChange={onChange}
    >
      {(props) => {

        const handleOptionChange = (value) => {
          setOptionValue(value);
          props.setFieldValue('type', value);
        };
        if (props.values.workflowType === WORKFLOW_TYPES_LIST.PURCHASE_ORDER)
          props.unregisterField('workflowId');
        
     
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
                <CustomFormLabel label="Work Flow Type" required={true} />
                <FormSelect
                  variant="outlined"
                  formProps={props}
                  name="workflowType"
                  value={props.values.workflowType ?? ''}
                  defaultValue={!props.values.workflowType ? "Select Work Flow Type" : null}
                >
                 {/* {!props.values.workflowType && (
                    <MenuItem value="default" disabled>
                      <Box textTransform={'capitalize'}>
                        Select Work Flow Type
                      </Box>
                    </MenuItem>
                  )} */}
                  {WORKFLOW_TYPES_LISTS.map((item) => (
                    <MenuItem value={item.value} key={item.value}>
                      <Box textTransform={'capitalize'}>{item.text}</Box>
                    </MenuItem>
                  ))}
                </FormSelect>
              </div>
            </div>
            {Object.keys(WORKFLOW_TYPES_LIST)[0] ===
              props.values.workflowType && (
              <SelectOrderWorkflows
                name="workflowOrderId"
                formProps={props}
                type="normal"
                workflowType={
                  Object.keys(WORKFLOW_TYPES_LIST)[0] ===
                  props.values.workflowType
                    ? Object.keys(WORKFLOW_TYPES_LIST)[1]
                    : ''
                }
                error={
                  error.error && error.type === 'workflowOrderId' ? error : {}
                }
                setError={setError}
              />
            )}
            <div className="w-full">
              <CustomFormLabel label="Work Flow Description" required={true} />
              <FormTextField
                type="text"
                formProps={props}
                name="description"
                placeholder="Enter Work Flow Description"
                multiline={true}
                minRows={4}
              />
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
              onRemoveDepartment={removeDepartment}
              selectedUsers={selectedUsers}
              chosenDepartments={selectedDepartments}
              onDragDepartment={onDragDepartment}
              error={error.error && error.type === 'departmentOrders' ? error : {}}
            />
            {selectedDepartments &&
              selectedDepartments.map((item) => (
                <WorkflowUserList
                  key={item._id}
                  department={item}
                  saveUsers={saveUsers}
                  chosenUsers={selectedUsers}
                  onRemoveUser={removeUser}
                  onDragUser={onDragUser}
                  error={error.error && error.type === 'reviewers' ? error : {}}
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
                disabled={isEdit ? isEditLoading : isCreateLoading}
              >
                {isEditLoading || isCreateLoading ? (
                  <CircularProgress size="20px" />
                ) : (
                  'Save'
                )}
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
