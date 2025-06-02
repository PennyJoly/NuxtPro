import type { Config } from 'drizzle-kit';

export default {
    dialect: 'mysql', 
    schema: './server/database/schema.ts', 
    out: './server/migrations', 
    dbCredentials: {
      url: process.env.DATABASE_URL!
    },
  } satisfies Config;