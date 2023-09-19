import * as yup from 'yup';

export const initialValues = {
  name: '',
};

export const checkoutSchema = yup.object().shape({
  name: yup.string().required('Subject is required'),
  workflowId: yup.string().required('Workflow is required.'),
});
