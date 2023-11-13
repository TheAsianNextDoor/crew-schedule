import { queryDb } from '$lib/db/query';
import { json, type RequestHandler } from '@sveltejs/kit';

interface PatchBody {
  phaseId: string;
  order: number;
}

export const PATCH: RequestHandler = async ({ request }) => {
  const { phaseId, order } = (await request.json()) as PatchBody;

  const sql = `
      UPDATE phase
      SET "order" = $2
      WHERE phase_id = $1;
    `;

  await queryDb.update(sql, [phaseId, order]);

  return json({ success: true });
};
