import { z } from 'zod';

export const profileTableSchema = z.object({
  id: z.string().uuid(),
  profile_pic: z.string().optional(),
  employee_id: z.string().uuid(),
  created_at: z.date(),
});

export type ProfileTableType = z.infer<typeof profileTableSchema>;
