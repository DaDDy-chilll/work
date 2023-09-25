import * as yup from 'yup';

export const departmentCreateValues = {
  name: '',
  isAuthorized: false,
};

export const departmentCreateSchema = yup.object().shape({
  name: yup.string().required('Department name is required'),
  isAuthorized: yup.boolean(),
});
