// import * as db from '$lib/server/database';
import { db } from '$lib/db';
import { PageInsights } from '$lib/db/schema.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  // return { hello: 'world' };
  return {
    post: await db.select().from(PageInsights),
  };
}
