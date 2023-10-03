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
});

export const editAmountSchema = yup.object().shape({
  name: yup.string().required('Subject is required'),
  amount: yup.number().integer().min(0).required('Amount is required'),
});

export const remarkValues = {
  action: '',
};

export const remarkSchema = yup.object().shape({
  action: yup.string().required('Please select form action'),
});
