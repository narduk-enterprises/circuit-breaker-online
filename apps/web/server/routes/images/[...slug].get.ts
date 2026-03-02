import { setHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const { IMAGES } = event.context.cloudflare?.env || {}

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
  } catch (error) {
    console.error('Error serving image:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error retrieving image',
    })
  }
})
