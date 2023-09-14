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
