import type { H3Event } from 'h3'
import type { D1Database } from '@cloudflare/workers-types'

export const useD1 = (event: H3Event) => {
  const { cloudflare } = event.context
  if (!cloudflare?.env?.DB) {
    throw createError({
      statusCode: 500,
      message: 'D1 database not available',
    })
  }
  return cloudflare.env.DB as D1Database
}
