import { z } from 'zod';

export const companyTableSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  phone_number: z.string().optional(),
  email: z.string().email(),
  address: z.string(),
  created_at: z.date(),
});

export type CompanyTableType = z.infer<typeof companyTableSchema>;
