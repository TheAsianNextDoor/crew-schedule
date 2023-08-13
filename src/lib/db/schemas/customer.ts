import { z } from 'zod';

export const customerTableSchema = z.object({
  company_id: z.string().uuid(),
  name: z.string(),
  phone_number: z.string().optional(),
  email: z.string().email(),
  address: z.string(),
  created_at: z.date(),
});

export type CompanyTableType = z.infer<typeof customerTableSchema>;
