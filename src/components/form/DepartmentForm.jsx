/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { useCreateDepartment } from '../../api';
import FormActionButtons from '../ui/FormActionButtons';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { Formik } from 'formik';
import FormTextField from '../shared/FormTextField';
import {
  departmentCreateSchema,
  departmentCreateValues,
} from '../../schema/department.schema';
import FormCheckbox from '../shared/FormCheckbox';

const DepartmentForm = ({ onClose }) => {
  const { isLoading: createLoading, mutate: createMutation } =
    useCreateDepartment();
  const queryClient = useQueryClient();

  const handleCreate = (values) => {
    createMutation(values, {
      onSuccess: () => {
        toast.success('ok');
        queryClient.invalidateQueries(['departments']);
        onClose();
      },
    });
  };

  return (
    <Formik
      initialValues={departmentCreateValues}
      validationSchema={departmentCreateSchema}
      onSubmit={handleCreate}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <label>Subject</label>
              <FormTextField
                type="text"
                formProps={props}
                name="name"
                placeholder="Subject"
              />
            </Box>
            <Box>
              <FormCheckbox
                disabled={false}
                formProps={props}
                label="Authorized"
                name="isAuthorized"
              />
            </Box>

            <FormActionButtons
              onClick={onClose}
              innerText="Save"
              loading={createLoading}
              justifyContent="right"
              width="200px"
            />
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default DepartmentForm;
