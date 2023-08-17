import { z } from 'zod';

export const statusSchema = z.enum(['pending', 'scheduled', 'in_progress', 'completed']);

export type StatusEnum = z.infer<typeof statusSchema>;
