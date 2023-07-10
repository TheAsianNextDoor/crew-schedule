import { sql } from '@vercel/postgres';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';

const db = drizzle(sql);

const main = async () => {
  console.log('...migrating');
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('finished migration');
};

main();
