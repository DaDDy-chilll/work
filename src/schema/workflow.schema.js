import * as yup from 'yup';
import { WORKFLOW_TYPES } from '../constants';

export const workflowCreateValues = {
  name: '',
  description: '',
  type: 'normal',
};

export const workflowCreateSchema = yup.object().shape({
  name: yup.string().required('Work Flow title is required'),
  description: yup.string().required('Work Flow description is required'),
  type: yup
    .string()
    .default('normal')
    .oneOf([...Object.values(WORKFLOW_TYPES)], 'Invalid Work Flow Type.'),
});
