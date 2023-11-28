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
  canForward: false,
};

export const userCreateSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('invalid email').required('Email is required'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    )
    .max(16, 'Password must be at most 16 characters'),

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
  canForward: yup.boolean(),
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
  canForward: yup.boolean(),
});

export const changePasswordValues = {
  password: '',
  confirmPassword: '',
};

export const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    )
    .max(16, 'Password must be at most 16 characters'),

  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .min(8, 'Password must be 8 characters long')
    .oneOf([yup.ref('password'), null], 'Passwords do not match'),
});
