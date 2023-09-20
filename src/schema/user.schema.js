import { z } from 'zod';

export const userSchema = z.object({
  name: z.string({ required_error: 'Name is rerquired.' }),
  email: z.string({ required_error: 'Email is required.' }),
  password: z.string({ required_error: 'Password is rerquired.' }),
  confirmPassword: z.string({ required_error: 'Password is rerquired.' }),
  jobLabel: z.string({ required_error: 'Name is rerquired.' }),

  canApprove: z.boolean(),
  canEdit: z.boolean(),
  canPrepare: z.boolean(),
  canVerify: z.boolean(),
  canEditAmount: z.boolean(),
});

import * as yup from 'yup';

export const userCreateValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  jobLabel: '',
  department: '',

  canApprove: false,
  canEdit: false,
  canPrepare: false,
  canVerify: false,
  canEditAmount: false,
};

export const userCreateSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('invalid email').required('Email is required'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be 8 characters long'),

  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .min(8, 'Password must be 8 characters long')
    .oneOf([yup.ref('password'), null], 'Passwords do not match'),

  jobLabel: yup.string().required('Job Label is required'),
  department: yup.string().required('Choose one of them'),

  canApprove: yup.boolean(),
  canEdit: yup.boolean(),
  canPrepare: yup.boolean(),
  canVerify: yup.boolean(),
  canEditAmount: yup.boolean(),
});
