import * as yup from 'yup';

export const initialValues = {
  name: '',
};

export const createSchema = yup.object().shape({
  name: yup.string().required('Subject is required'),
  workflowId: yup.string().required('Workflow is required.'),
});

export const editSchema = yup.object().shape({
  name: yup.string().required('Subject is required'),
  amount: yup.number().integer().min(0).required('Amount is required'),
});
