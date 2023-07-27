import { z } from 'zod';

export const crewAssignmentTableSchema = z.object({
  id: z.string().uuid(),
  employee_id: z.string().uuid(),
  crew_id: z.string().uuid(),
  is_foreman: z.boolean(),
  created_at: z.date(),
});

export type CrewAssignmentTableType = z.infer<typeof crewAssignmentTableSchema>;
