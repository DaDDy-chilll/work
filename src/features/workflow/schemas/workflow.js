import * as yup from 'yup';
import { workflowTypes } from '..';

export const workflowSchema = yup.object().shape({
  name: yup.string().required('Work Flow title is required'),
  description: yup.string().required('Work Flow description is required'),
  type: yup
    .string()
    .default('normal')
    .oneOf([...Object.values(workflowTypes)], 'Invalid Work Flow Type.'),
});
