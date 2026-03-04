/**
 * Dynamic sitemap URL source for NuxtSEO.
 *
 * Sitemap config sources point to this API. Queries D1 for all products and
 * categories and returns them with proper loc, lastmod, changefreq,
 * and priority metadata.
 */
import type { H3Event } from 'h3'
import { buildSitemapEntries } from '../../utils/buildSitemapEntries'

export default defineEventHandler(async (event: H3Event) => {
  const db = useD1(event)
  const { results: products } = await db.prepare('SELECT slug FROM products').all()
  const { results: categories } = await db.prepare("SELECT name, slug, parent FROM categories ORDER BY parent, name").all()

  return buildSitemapEntries(products || [], categories || [])
})
