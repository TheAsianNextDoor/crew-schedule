// import { sql } from '@vercel/postgres';
import 'dotenv-flow/config';
import pg from 'pg';

const { Client } = pg;

export const client = new Client({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

client.connect();
