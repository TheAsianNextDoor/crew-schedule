// import { queryDb } from '$lib/db/query';
// import type { Client, Site, Status } from '@prisma/client';
// import { json } from '@sveltejs/kit';

// import type { RequestHandler } from './$types.js';

// export type SiteInfo = Pick<
//   Site,
//   | 'site_id'
//   | 'job_number'
//   | 'site_name'
//   | 'status_id'
//   | 'location'
//   | 'start_date_time'
//   | 'finished_date_time'
// > &
//   Pick<Status, 'status_name'> &
//   Pick<Client, 'client_name'>;

// export const GET: RequestHandler = async ({ url, params }) => {
//   const siteAndClientInfo = await queryDb.findFirst<SiteInfo>(
//     `
//       SELECT
//         site.site_id,
//         site.job_number,
//         site.site_name,
//         site.location,
//         site.estimated_hours,
//         site.notes,
//         site.scheduled_date_time,
//         site.start_date_time,
//         site.finished_date_time,
//         status.status_name,
//         client.client_name
//       FROM site
//       LEFT JOIN client
//         ON site.client_id = client.client_id
//       LEFT JOIN status
//         on site.status_id = status.status_id
//       WHERE site.site_id = $1;
//     `,
//     [params.siteId],
//   );

//   const currentPhase = await queryDb.findFirst<{ phase_id: string }>(
//     `
//       SELECT phase_id
//       FROM phase
//       WHERE site_id = $1
//         AND status_id = (
//           SELECT status_id
//           FROM status
//           WHERE status_name = 'in_progress'
//         )
//     `,
//     [params.siteId],
//   );

//   return json({ ...siteAndClientInfo, ...currentPhase });
// };
