import { z } from 'zod';

import { statusSchema } from '../enum/status';

export const phaseAssignmentTableSchema = z.object({
  id: z.string().uuid(),
  phase_id: z.string().uuid(),
  crew_id: z.string().uuid(),
  status: statusSchema,
  estimated_hours: z.number().optional(),
  mobilization_from_location: z.number().array().optional(),
  estimated_mobilization_duration: z.number().optional(),
  actual_mobilization_duration: z.number().optional(),
  scheduled_date_time: z.date().optional(),
  start_date_time: z.date().optional(),
  finished_date_time: z.date().optional(),
  created_at: z.date(),
});

export type PhaseAssignmentTableType = z.infer<typeof phaseAssignmentTableSchema>;
