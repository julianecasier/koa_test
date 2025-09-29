// import { z } from 'zod';
// import { Task } from '../../modules/dtos/task';


// export const userSchema = z.object({
//   id: z.string(),
//   name: z.string().min(1, 'Name is required'),
//   image: z.string(),
//   email: z.string(),
// });


// export const createUserSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   image: z.string(),
//   email: z.string(),
// });


// export type User = z.infer<typeof userSchema>;
// export type CreateUser = z.infer<typeof createUserSchema>;
// export type UpdateUser = Partial<CreateUser>;
