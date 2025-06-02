// 2. 添加 TypeORM 相关导入
//import { getDbConnection } from '~/lib/database/database'
import { Waitlist } from '~/lib/database/entity/waitlist.model' // 导入 Waitlist 实体
import { QueryFailedError } from 'typeorm'; // 导入 TypeORM 错误类型 (可选，如果需要更精细的错误处理)
import { db } from '~/server/database/database'
import { npWaitlist } from '~/server/database/schema'

import { getRequestIP } from 'h3' // Import utility to get IP address
import { $fetch } from 'ofetch' // Import $fetch for making API calls
import { eq } from 'drizzle-orm';

// Define the expected response structure from ipinfo.io
interface IpInfoResponse {
  ip: string;
  country: string; // We primarily need the country code
  // Add other fields if needed, e.g., city, region
}

export default defineEventHandler(async (event) => {
  // Get runtime config for the API token
  const config = useRuntimeConfig(event)
  const ipinfoToken = config.ipinfoToken

  let country: string | null = null; // Initialize country as null
  let ip: string | null = null;

  try {
    // 1. Get User's IP Address
    const ipAddress = getRequestIP(event, { xForwardedFor: true }) || 'unknown';

    // 2. Get Geolocation from IP using ipinfo.io (only if IP is known and token exists)
    if (ipAddress !== 'unknown' && ipinfoToken) {
      try {
        const ipInfoUrl = `https://ipinfo.io/${ipAddress}?token=${ipinfoToken}`;
        const geoData = await $fetch<IpInfoResponse>(ipInfoUrl);
        country = geoData.country || null; // Get the country code (e.g., "US", "CN")
        ip = geoData.ip || null;
      } catch (geoError: any) {
        console.error(`Failed to fetch geolocation for IP ${ipAddress}:`, geoError.message);
        // Don't block the main process if geolocation fails, just log it.
        // country remains null
      }
    } else if (!ipinfoToken) {
        console.warn('IPINFO_TOKEN is not configured. Skipping geolocation.');
    } else {
        console.warn('Could not determine IP address. Skipping geolocation.');
    }


    // 3. Process Email and Save to DB
    const body = await readBody(event)
    const email = body.email?.trim()

    if (!email || typeof email !== 'string' || !validateEmail(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email address provided.',
      })
    }

    const existingEntry = await db.select().from(npWaitlist).where(eq(npWaitlist.email, email))
      //4. 校验邮箱是否存在
    if (existingEntry) {
      return { success: true, message: 'Email is already joined.' }
    }

    // 5. 使创建新的 waitlist entry
    const newWaitlistEntry = db.insert(npWaitlist).values({
      email,
      country, // Store the fetched country code (can be null)
      ip,
    });
    const newEntry = await (newWaitlistEntry);


    // 6. 返回成功信息 (id 现在是 number 类型，如果需要 string，保持 toString())
    return { success: true, data: { id: newEntry.id.toString() } }

  } catch (error: any) {
    console.error('Error joining waitlist:', error)

    // 7. 移除 Prisma 特定的 P2002 错误检查
    // if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
    //    return { success: true, message: 'Email is already joined.' } // Treat as success
    // }
    // 注意: 如果 findOneBy 和 save 之间存在竞态条件导致重复插入，
    // 你可能需要在这里捕获并处理 TypeORM 的 QueryFailedError (例如检查 unique constraint violation 的 driver code)
    // 但因为我们先检查了 existingEntry，这种情况概率很小。

    // Return a generic error for other issues
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to join waitlist.',
    })
  }
})

// Basic email validation function
function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}
