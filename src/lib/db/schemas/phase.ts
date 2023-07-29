import { z } from 'zod';

import { statusSchema } from '../enum/status';

export const phaseTableSchema = z.object({
  phase_id: z.string().uuid(),
  site_id: z.string().uuid(),
  sub_contractor_id: z.string().uuid(),
  discipline_id: z.string().uuid(),
  order: z.number(),
  status: statusSchema,
  estimated_hours: z.number().optional(),
  personnel_count: z.number().optional(),
  created_at: z.date(),
});

export type PhaseTableType = z.infer<typeof phaseTableSchema>;
