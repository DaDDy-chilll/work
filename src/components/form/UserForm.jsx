/* eslint-disable react/prop-types */
import { Box, MenuItem } from '@mui/material';
import {
  useCreateUser,
  useEditPassword,
  useEditUser,
  useFetchAllDepartments,
} from '../../api';
import FormActionButtons from '../ui/FormActionButtons';
import { Formik } from 'formik';
import FormTextField from '../shared/FormTextField';
import FormCheckbox from '../shared/FormCheckbox';
import {
  changePasswordSchema,
  changePasswordValues,
  userCreateSchema,
  userCreateValues,
  userEditSchema,
} from '../../schema/user.schema';
import FormSelect from '../shared/FormSelect';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

const PasswordTextField = ({ formProps }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Box width="50%">
        <label>Password</label>
        <FormTextField
          type="password"
          formProps={formProps}
          name="password"
          placeholder="Enter Password"
        />
      </Box>
      <Box width="50%">
        <label>Confirm Password</label>
        <FormTextField
          type="password"
          formProps={formProps}
          name="confirmPassword"
          placeholder="Confirm Password"
        />
      </Box>
    </Box>
  );
};

const UserForm = ({ onClose, oldData, isChangePassword }) => {
  const { data } = useFetchAllDepartments({
    limit: 0,
  });

  const { mutate: createMutation, isLoading: createLoading } = useCreateUser();
  const { mutate: editMutation, isLoading: editLoading } = useEditUser();
  const { mutate: editPasswordMutation, isLoading: editPasswordLoading } =
    useEditPassword();

  const queryClient = useQueryClient();

  let departments;
  if (data?.payload) {
    departments = data?.payload?.map((department) => ({
      ...department,
      value: department.name,
    }));
  }

  const handleCreate = ({
    name,
    email,
    password,
    jobLabel,
    department,
    canApprove,
    canEdit,
    canPrepare,
    canVerify,
    canEditAmount,
  }) => {
    createMutation(
      {
        name,
        email,
        password,
        jobLabel,
        department,
        permissions: {
          canApprove,
          canEdit,
          canEditAmount,
          canVerify,
          canPrepare: canEditAmount ? true : canPrepare,
        },
      },
      {
        onSuccess: () => {
          toast.success('ok');
          queryClient.invalidateQueries(['users']);
          onClose();
        },
      },
    );
  };

  const handleEdit = ({
    name,
    jobLabel,
    department,
    canApprove,
    canEdit,
    canPrepare,
    canVerify,
    canEditAmount,
  }) => {
    editMutation(
      {
        data: {
          name,
          jobLabel,
          department,
          permissions: {
            canApprove,
            canEdit,
            canEditAmount,
            canVerify,
            canPrepare: canEditAmount ? true : canPrepare,
          },
        },
        id: oldData?.id,
      },
      {
        onSuccess: () => {
          toast.success('ok');
          queryClient.invalidateQueries(['users']);
          onClose();
        },
      },
    );
  };

  const handleEditPassword = (values) => {
    editPasswordMutation(
      {
        ...values,
        userId: oldData?.id,
      },
      {
        onSuccess: () => {
          toast.success('ok');
          queryClient.invalidateQueries(['users']);
          onClose();
        },
      },
    );
  };

  return (
    <Formik
      initialValues={
        isChangePassword
          ? changePasswordValues
          : oldData
          ? oldData
          : userCreateValues
      }
      validationSchema={
        isChangePassword
          ? changePasswordSchema
          : oldData
          ? userEditSchema
          : userCreateSchema
      }
      onSubmit={
        isChangePassword
          ? handleEditPassword
          : oldData
          ? handleEdit
          : handleCreate
      }
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {!isChangePassword && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box width="50%">
                  <label>Name</label>
                  <FormTextField
                    type="text"
                    formProps={props}
                    name="name"
                    placeholder="Enter Name"
                  />
                </Box>
                <Box width="50%">
                  <label>Email</label>
                  <FormTextField
                    disabled={oldData}
                    type="email"
                    formProps={props}
                    name="email"
                    placeholder="Enter Email"
                  />
                </Box>
              </Box>
            )}
            {isChangePassword ? (
              <PasswordTextField formProps={props} />
            ) : (
              !oldData && <PasswordTextField formProps={props} />
            )}
            {!isChangePassword && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box width="48%">
                  <label>Select Department</label>
                  <FormSelect
                    placeholder="Select Work Flow"
                    name="department"
                    formProps={props}
                  >
                    {departments &&
                      departments?.map((item) => (
                        <MenuItem value={item._id} key={item._id}>
                          {item.value}
                        </MenuItem>
                      ))}
                  </FormSelect>
                </Box>
                <Box width="50%">
                  <label>Job Label</label>
                  <FormTextField
                    type="text"
                    formProps={props}
                    name="jobLabel"
                    placeholder="Job Label"
                  />
                </Box>
              </Box>
            )}
            {!isChangePassword && (
              <>
                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: 'repeat(4, 22%)',
                  }}
                >
                  <FormCheckbox
                    formProps={props}
                    label="Create"
                    disabled={true}
                    defaultValue={true}
                  />
                  <FormCheckbox
                    formProps={props}
                    label="Comment"
                    disabled={true}
                    defaultValue={true}
                  />
                  <FormCheckbox
                    formProps={props}
                    label="Reject"
                    disabled={true}
                    defaultValue={true}
                  />
                  <FormCheckbox
                    formProps={props}
                    label="Acknowledge"
                    disabled={true}
                    defaultValue={true}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: 'repeat(4, 22%)',
                  }}
                >
                  <FormCheckbox
                    formProps={props}
                    label="Reverse"
                    disabled={true}
                    defaultValue={true}
                  />
                  <FormCheckbox
                    formProps={props}
                    label="Approve"
                    name="canApprove"
                  />
                  <FormCheckbox
                    formProps={props}
                    label="Verify"
                    name="canVerify"
                  />
                  <FormCheckbox
                    formProps={{
                      ...props,
                      values: {
                        canPrepare: props.values['canEditAmount']
                          ? true
                          : props.values['canPrepare'],
                      },
                    }}
                    label="Edit"
                    name="canPrepare"
                  />
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: 'repeat(4, 22%)',
                  }}
                >
                  <FormCheckbox
                    formProps={props}
                    label="Edit Amount"
                    name="canEditAmount"
                  />
                  <FormCheckbox
                    formProps={props}
                    label="Revise"
                    name="canEdit"
                  />
                </Box>
              </>
            )}
            <FormActionButtons
              onClick={onClose}
              innerText={oldData ? 'Update' : 'Save'}
              loading={
                isChangePassword
                  ? editPasswordLoading
                  : oldData
                  ? editLoading
                  : createLoading
              }
              justifyContent="right"
              width="200px"
            />
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default UserForm;
