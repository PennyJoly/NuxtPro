import { drizzle } from 'drizzle-orm/mysql2';
//import 'dotenv/config';
//import mysql from 'mysql2/promise';

//import { npWaitlist } from '~/server/database/schema';

 //const connection = mysql.createConnection(process.env.DATABASE_URL!);
 //export const db = drizzle(connection, { schema: { npWaitlist } });
export const db = drizzle({ connection: { uri: process.env.DATABASE_URL }});