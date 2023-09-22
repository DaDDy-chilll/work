import * as yup from 'yup';

export const workflowCreateValues = {
  name: '',
  description: '',
};

export const workflowCreateSchema = yup.object().shape({
  name: yup.string().required('Work Flow title is required'),
  description: yup.string().required('Work Flow description is required'),
});
