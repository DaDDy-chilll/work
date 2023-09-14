import { z } from 'zod';

export const departmentSchema = z.object({
  name: z.string({ required_error: 'Name is rerquired.' }),
  isAuthorized: z.boolean(),
});
