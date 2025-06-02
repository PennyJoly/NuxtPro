import { serial,datetime,mysqlTable,varchar,text, timestamp, boolean } from 'drizzle-orm/mysql-core';
import { sql } from "drizzle-orm";

// 你自己定义的表
export const npWaitlist = mysqlTable('np_waitlist', {
  id: serial('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 191 }).notNull().unique(),
  country: varchar('country', { length: 255 }),
  ip: varchar('ip', { length: 255 }),
  createdAt: datetime('created_at',{ mode: 'string', fsp: 3}).notNull(),
});

export const user = mysqlTable("np_customer", {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  inviteCode: varchar('invite_code', { length: 8 })
});

export const session = mysqlTable("session", {
  id: varchar('id', { length: 36 }).primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })});

export const account = mysqlTable("account", {
  id: varchar('id', { length: 36 }).primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at').default(sql`CURRENT_TIMESTAMP`),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at').default(sql`CURRENT_TIMESTAMP`),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`)});

export const verification = mysqlTable("verification", {
  id: varchar('id', { length: 36 }).primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`)});