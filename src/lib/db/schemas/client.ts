import { z } from 'zod';

export const clientTableSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  contact_first_name: z.string(),
  contact_last_name: z.string(),
  email: z.string().email(),
  phone_number: z.string().optional(),
  headquarters_address: z.string(),
  created_at: z.date(),
});

export type ClientTableType = z.infer<typeof clientTableSchema>;
