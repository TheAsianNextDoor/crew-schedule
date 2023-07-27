import { z } from 'zod';

export const statusSchema = z.enum(['pending', 'scheduled', 'in_pogress', 'completed']);

export type StatusEnum = z.infer<typeof statusSchema>;
