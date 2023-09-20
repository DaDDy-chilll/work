/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { useCreateUser, useFetchAllDepartments } from '../../api';
import FormActionButtons from '../ui/FormActionButtons';
import { Formik } from 'formik';
import FormTextField from '../shared/FormTextField';
import FormCheckbox from '../shared/FormCheckbox';
import { userCreateSchema, userCreateValues } from '../../schema/user.schema';

const UserForm = ({ onClose }) => {
  const { data: departments } = useFetchAllDepartments({
    limit: 0,
  });
  const { isLoading: createLoading } = useCreateUser();
  // const queryClient = useQueryClient();

  console.log({ departments });

  const handleCreate = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={userCreateValues}
      validationSchema={userCreateSchema}
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

export default UserForm;
