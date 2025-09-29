// shared/schemas/taskSchemas.ts
import { z } from 'zod';
import { User } from '../../user/dtos/user';


// Schéma de base Task (sans relations)
export const taskSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(1000, 'Content too long'),
  date: z.string(),
  userId: z.number().positive('User ID must be positive'),
});

// Schéma pour création Task (sans id et sans author)
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(1000, 'Content too long'),
  date: z.string(),
  userId: z.number().positive('User ID must be positive'),
});


export type Task = z.infer<typeof taskSchema> & {
  author: User | null;
};
export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = Partial<Omit<CreateTask, 'userId'>>;
