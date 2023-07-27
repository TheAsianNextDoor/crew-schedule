import { z } from 'zod';

export const employeeTableSchema = z.object({
  id: z.string().uuid(),
  company_id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string().optional(),
  email: z.string().email(),
  created_at: z.date(),
});

export type EmployeeTableType = z.infer<typeof employeeTableSchema>;
