import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .isEmail({ required_error: 'Invalid email.' }),
  password: z.string({ required_error: 'Password is rerquired.' }),
});
