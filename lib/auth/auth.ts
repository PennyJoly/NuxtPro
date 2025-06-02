import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from '../../server/database/database'
// 1. 导入完整的 schema
import * as schema from '../../server/database/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db,{
    provider: "mysql", // or "mysql", "sqlite"
    // 2. 将导入的 schema 传递给 adapter
    schema: schema
  }),
  // 配置google和github社交登录
  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    },
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
  }
}
});