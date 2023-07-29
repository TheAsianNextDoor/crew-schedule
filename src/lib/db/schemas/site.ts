import { z } from 'zod';

import { statusSchema } from '../enum/status';

export const siteTableSchema = z.object({
  site_id: z.string().uuid(),
  client_id: z.string().uuid(),
  current_phase_id: z.string().uuid(),
  job_number: z.number(),
  name: z.string(),
  status: statusSchema,
  location: z.tuple([z.number(), z.number()]),
  cluster_id: z.string().optional(),
  estimated_hours: z.number().optional(),
  attachments: z.string().array().optional(),
  notes: z.string(),
  scheduled_date_time: z.date().optional(),
  start_date_time: z.date().optional(),
  finished_date_time: z.date().optional(),
  created_at: z.date(),
});

export type SiteTableType = z.infer<typeof siteTableSchema>;
