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

export const userEditSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  jobLabel: yup.string().required('Job Label is required'),
  department: yup.string().required('Choose one of them'),

  canApprove: yup.boolean(),
  canEdit: yup.boolean(),
  canPrepare: yup.boolean(),
  canVerify: yup.boolean(),
  canEditAmount: yup.boolean(),
});

export const changePasswordValues = {
  password: '',
  confirmPassword: '',
}

export const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be 8 characters long'),

  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .min(8, 'Password must be 8 characters long')
    .oneOf([yup.ref('password'), null], 'Passwords do not match'),
});