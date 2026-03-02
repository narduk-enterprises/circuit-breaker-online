/**
 * Dynamic sitemap URL source for NuxtSEO.
 *
 * Automatically discovered by nuxt-simple-sitemap when placed at
 * `server/api/__sitemap__/urls.ts`. Queries D1 for all products and
 * categories and returns them with proper loc, lastmod, changefreq,
 * and priority metadata.
 */
import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (event) => {
  const db = useD1(event)
  const { results: products } = await db.prepare('SELECT slug FROM products').all()
  const { results: categories } = await db.prepare("SELECT name, slug, parent FROM categories ORDER BY parent, name").all()

  const now = new Date().toISOString()

  // Dynamic product pages — highest volume
  const productUrls = (products || []).map((p: any) => ({
    loc: `/products/${p.slug}`,
    lastmod: now,
    changefreq: 'weekly' as const,
    priority: 0.8,
  }))

  // Dynamic category filter pages
  const categoryUrls = (categories || [])
    .filter((c: any) => !c.parent)
    .map((c: any) => ({
      loc: `/products?category=${encodeURIComponent(c.name)}`,
      lastmod: now,
      changefreq: 'weekly' as const,
      priority: 0.85,
    }))

  // Static content pages
  const staticPages = [
    // Core pages
    { loc: '/', priority: 1.0 },
    { loc: '/about', priority: 0.8 },
    { loc: '/contact', priority: 0.8 },
    { loc: '/products', priority: 0.95 },
    // Services
    { loc: '/services', priority: 0.9 },
    { loc: '/services/shop-services', priority: 0.8 },
    { loc: '/services/field-services', priority: 0.8 },
    { loc: '/services/engineered-solutions', priority: 0.8 },
    { loc: '/services/emergency-response', priority: 0.8 },
    // Equipment
    { loc: '/equipment', priority: 0.9 },
    { loc: '/equipment/circuit-breakers', priority: 0.9 },
    { loc: '/equipment/switchgear', priority: 0.8 },
    { loc: '/equipment/transformers', priority: 0.8 },
    { loc: '/equipment/protective-relays', priority: 0.8 },
    { loc: '/equipment/vacuum-interrupters', priority: 0.8 },
    { loc: '/equipment/motor-controls', priority: 0.7 },
    { loc: '/equipment/load-tap-changers', priority: 0.7 },
    { loc: '/equipment/load-break-switches', priority: 0.7 },
    { loc: '/equipment/remote-racking', priority: 0.7 },
    // Industries
    { loc: '/industries', priority: 0.8 },
    { loc: '/industries/data-centers', priority: 0.8 },
    { loc: '/industries/utilities', priority: 0.8 },
    { loc: '/industries/manufacturing', priority: 0.7 },
    { loc: '/industries/healthcare', priority: 0.7 },
    { loc: '/industries/oil-gas', priority: 0.7 },
    { loc: '/industries/mining', priority: 0.7 },
    // Resources
    { loc: '/resources', priority: 0.8 },
    { loc: '/resources/circuit-breaker-maintenance-guide', priority: 0.7 },
    { loc: '/resources/arc-flash-safety-guide', priority: 0.7 },
    { loc: '/resources/switchgear-modernization', priority: 0.7 },
    { loc: '/resources/vacuum-interrupter-testing', priority: 0.7 },
    { loc: '/resources/protective-relay-coordination', priority: 0.7 },
    { loc: '/resources/transformer-maintenance-guide', priority: 0.7 },
    // Videos
    { loc: '/videos', priority: 0.7 },
    // Brands
    { loc: '/brands/general-electric', priority: 0.8 },
    { loc: '/brands/westinghouse', priority: 0.8 },
    { loc: '/brands/siemens', priority: 0.8 },
    { loc: '/brands/cutler-hammer', priority: 0.8 },
    { loc: '/brands/square-d', priority: 0.7 },
    { loc: '/brands/abb', priority: 0.7 },
  ].map(p => ({
    ...p,
    lastmod: now,
    changefreq: 'monthly' as const,
  }))

  return [...staticPages, ...categoryUrls, ...productUrls]
})
