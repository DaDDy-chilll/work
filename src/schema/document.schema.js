import * as yup from 'yup';

export const initialValues = {
  name: '',
  description: '',
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
  remark: '',
};

export const remarkSchema = yup.object().shape({
  action: yup.string().required('Please select form action'),
  workflowId: yup.string().optional(),
});

export const initialMentionValues = {
  department: '',
  reviewers: [],
};

const reviewerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  id: yup.string().required('Id is required'),
});

export const mentionSchema = yup.object().shape({
  department: yup.string().required('Please select department'),
  reviewers: yup
    .array()
    .of(reviewerSchema)
    .min(1, 'Please select at least one reviewer'),
});
