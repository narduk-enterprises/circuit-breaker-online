import { setHeader } from 'h3'

interface CloudflareEnv {
  IMAGES?: R2Bucket
}

export default defineEventHandler(async (event) => {
  const env = (event.context.cloudflare?.env || {}) as CloudflareEnv
  const { IMAGES } = env

  if (!IMAGES) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Storage not configured',
    })
  }

  const slug = event.context.params?.slug
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid image path',
    })
  }

  try {
    const object = await IMAGES.get(slug)

    if (!object) {
      if (import.meta.dev) {
        return sendRedirect(event, `https://circuitbreaker.online/images/${slug}`, 302)
      }
      throw createError({ statusCode: 404, statusMessage: 'Image not found' })
    }

    const headers = new Headers()
    object.writeHttpMetadata(headers)
    headers.set('etag', object.httpEtag)

    if (object.httpMetadata?.contentType) {
      setHeader(event, 'Content-Type', object.httpMetadata.contentType)
    }

    // Cache control
    setHeader(event, 'Cache-Control', 'public, max-age=300, stale-while-revalidate=86400')

    return object.body
  } catch (error: unknown) {
    const err = error as { statusCode?: number; message?: string }
    if (err.statusCode) {
      throw error
    }
    console.error('Error serving image:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Error retrieving image: ${err?.message ?? String(error)}`,
    })
  }
})
