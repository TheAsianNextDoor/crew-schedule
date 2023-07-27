import { z } from 'zod';

export const disciplineTableSchema = z.object({
  id: z.string().uuid(),
  company_id: z.string().uuid(),
  name: z.string(),
});

export type DisciplineTableType = z.infer<typeof disciplineTableSchema>;
