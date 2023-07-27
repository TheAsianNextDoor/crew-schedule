import { z } from 'zod';

export const crewTableSchema = z.object({
  id: z.string().uuid(),
  company_id: z.string().uuid(),
  discipline_id: z.string().uuid(),
  name: z.string(),
  size: z.number(),
  weekly_hours: z.number().optional(),
  weekly_capacity: z.number().optional(),
  personnel_hourly_cost: z.number().optional(),
  equipment_hourly_cost: z.number().optional(),
  created_at: z.date(),
});

export type CrewTableType = z.infer<typeof crewTableSchema>;
