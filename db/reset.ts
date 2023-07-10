import { sql } from 'drizzle-orm';

import { db } from '../src/lib/db';

const reset = async () => {
  await db.execute(
    sql.raw(`
      ALTER TABLE "crew_member" DROP CONSTRAINT "crew_member_crew_id_crew_id_fk";
      ALTER TABLE "phase" DROP CONSTRAINT "phase_site_id_site_id_fk";
      ALTER TABLE "phase" DROP CONSTRAINT "phase_assigned_crew_id_crew_id_fk";
      ALTER TABLE "phase" DROP CONSTRAINT "phase_sub_contractor_id_sub_contractor_id_fk";
      ALTER TABLE "site" DROP CONSTRAINT "site_client_id_client_id_fk";
      ALTER TABLE "site" DROP CONSTRAINT "site_current_phase_id_phase_id_fk";
    `)
  );

  await db.execute(
    sql.raw(`
      TRUNCATE TABLE phase;
      TRUNCATE TABLE site;
      TRUNCATE TABLE crew;
      TRUNCATE TABLE crew_member;
      TRUNCATE TABLE sub_contractor;
      TRUNCATE TABLE client;
      TRUNCATE TABLE foreman;
    `)
  );

  await db.execute(
    sql.raw(`
      ALTER TABLE "crew_member" ADD CONSTRAINT "crew_member_crew_id_crew_id_fk" FOREIGN KEY ("crew_id") REFERENCES "crew"("id") ON DELETE no action ON UPDATE no action;
      ALTER TABLE "crew" ADD CONSTRAINT "crew_foreman_id_foreman_id_fk" FOREIGN KEY ("foreman_id") REFERENCES "foreman"("id") ON DELETE no action ON UPDATE no action;
      ALTER TABLE "phase" ADD CONSTRAINT "phase_site_id_site_id_fk" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE no action ON UPDATE no action;
      ALTER TABLE "phase" ADD CONSTRAINT "phase_assigned_crew_id_crew_id_fk" FOREIGN KEY ("assigned_crew_id") REFERENCES "crew"("id") ON DELETE no action ON UPDATE no action;
      ALTER TABLE "phase" ADD CONSTRAINT "phase_sub_contractor_id_sub_contractor_id_fk" FOREIGN KEY ("sub_contractor_id") REFERENCES "sub_contractor"("id") ON DELETE no action ON UPDATE no action;
      ALTER TABLE "site" ADD CONSTRAINT "site_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE no action ON UPDATE no action;
      ALTER TABLE "site" ADD CONSTRAINT "site_current_phase_id_phase_id_fk" FOREIGN KEY ("current_phase_id") REFERENCES "phase"("id") ON DELETE no action ON UPDATE no action;
    `)
  );
};

reset();
