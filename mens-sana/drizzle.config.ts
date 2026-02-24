import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
