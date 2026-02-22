import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './db/schema'

config({ path: '.env' }); // or .env.local

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client: client, schema });


/*
const globalForDb = globalThis as unknown as {
  conn?: postgres.Sql;
  db?: ReturnType<typeof drizzle>;
};

export const conn =
  globalForDb.conn ??
  postgres(process.env.DATABASE_URL!, {
    prepare: false,
    max: 5, // VERY IMPORTANT
  });

export const db =
  globalForDb.db ??
  drizzle(conn, { schema });

if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = conn;
  globalForDb.db = db;
}
*/