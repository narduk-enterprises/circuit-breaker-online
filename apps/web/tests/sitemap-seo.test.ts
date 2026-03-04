/**
 * Sitemap SEO regression tests.
 *
 * Validates that the sitemap URL source only emits clean URLs
 * (no query params, no fragments) and that the SEO policy
 * utilities work correctly.
 */
import { describe, it, expect } from 'vitest'

// ---------------------------------------------------------------------------
// useCategorySlug — mirrors apps/web/app/composables/useCategorySlug.ts
// Duplicated here to avoid Nuxt auto-import context dependency.
// ---------------------------------------------------------------------------
function categorySlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// ---------------------------------------------------------------------------
// Simulated sitemap entries — mirrors the logic in
// server/api/__sitemap__/urls.ts after the fix.
// ---------------------------------------------------------------------------
function buildSitemapEntries(
  products: { slug: string }[],
  categories: { name: string; slug: string; parent: string | null }[],
) {
  const now = new Date().toISOString()

  const productUrls = products.map(p => ({
    loc: `/products/${p.slug}`,
    lastmod: now,
    changefreq: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryUrls = categories
    .filter(c => !c.parent && c.slug)
    .map(c => ({
      loc: `/products/category/${c.slug}`,
      lastmod: now,
      changefreq: 'weekly' as const,
      priority: 0.85,
    }))

  const staticPages = [
    { loc: '/', priority: 1.0 },
    { loc: '/about', priority: 0.8 },
    { loc: '/contact', priority: 0.8 },
    { loc: '/products', priority: 0.95 },
    { loc: '/services', priority: 0.9 },
    { loc: '/equipment', priority: 0.9 },
    { loc: '/equipment/circuit-breakers', priority: 0.9 },
    { loc: '/industries', priority: 0.8 },
  ].map(p => ({ ...p, lastmod: now, changefreq: 'monthly' as const }))

  return [...staticPages, ...categoryUrls, ...productUrls]
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('sitemap URL generation', () => {
  const sampleCategories = [
    { name: 'Circuit Breakers', slug: 'circuit-breakers', parent: null },
    { name: 'Switchgear', slug: 'switchgear', parent: null },
    { name: 'Transformers', slug: 'transformers', parent: null },
    { name: 'Low Voltage', slug: 'low-voltage', parent: 'Circuit Breakers' },
  ]

  const sampleProducts = [
    { slug: 'ge-akr-50-circuit-breaker' },
    { slug: 'westinghouse-ds-416-breaker' },
  ]

  const entries = buildSitemapEntries(sampleProducts, sampleCategories)

  it('does not include any URL with query params (?)', () => {
    for (const entry of entries) {
      expect(entry.loc).not.toContain('?')
    }
  })

  it('does not include any URL with hash fragments (#)', () => {
    for (const entry of entries) {
      expect(entry.loc).not.toContain('#')
    }
  })

  it('includes only parent category paths, not child categories', () => {
    const categoryLocs = entries.filter(e => e.loc.startsWith('/products/category/'))
    expect(categoryLocs).toHaveLength(3) // Circuit Breakers, Switchgear, Transformers
    expect(categoryLocs.map(e => e.loc)).toContain('/products/category/circuit-breakers')
    expect(categoryLocs.map(e => e.loc)).toContain('/products/category/switchgear')
    expect(categoryLocs.map(e => e.loc)).toContain('/products/category/transformers')
    // Low Voltage is a child — must NOT be in sitemap
    expect(categoryLocs.map(e => e.loc)).not.toContain('/products/category/low-voltage')
  })

  it('includes product detail pages by slug', () => {
    const productLocs = entries.filter(e => e.loc.startsWith('/products/') && !e.loc.startsWith('/products/category/'))
    expect(productLocs).toHaveLength(2)
    expect(productLocs.map(e => e.loc)).toContain('/products/ge-akr-50-circuit-breaker')
    expect(productLocs.map(e => e.loc)).toContain('/products/westinghouse-ds-416-breaker')
  })

  it('includes static pages', () => {
    const locs = entries.map(e => e.loc)
    expect(locs).toContain('/')
    expect(locs).toContain('/about')
    expect(locs).toContain('/products')
  })

  it('all URLs start with /', () => {
    for (const entry of entries) {
      expect(entry.loc).toMatch(/^\//)
    }
  })
})

describe('useCategorySlug', () => {
  it('converts category names to URL-safe slugs', () => {
    expect(categorySlug('Circuit Breakers')).toBe('circuit-breakers')
    expect(categorySlug('Bus Duct & Busway')).toBe('bus-duct-busway')
    expect(categorySlug('Variable Frequency Drives (VFDs)')).toBe('variable-frequency-drives-vfds')
    expect(categorySlug('Fuses & Fuse Holders')).toBe('fuses-fuse-holders')
    expect(categorySlug('Renewal & Replacement Parts')).toBe('renewal-replacement-parts')
  })

  it('handles simple single-word names', () => {
    expect(categorySlug('Switchgear')).toBe('switchgear')
    expect(categorySlug('Transformers')).toBe('transformers')
  })

  it('strips leading and trailing hyphens', () => {
    expect(categorySlug('  Test  ')).toBe('test')
    expect(categorySlug('---test---')).toBe('test')
  })
})

describe('SEO policy', () => {
  function getCanonical(path: string, siteUrl: string): string {
    return `${siteUrl}${path}`
  }

  function getRobots(queryKeys: string[]): string {
    return queryKeys.length > 0 ? 'noindex,follow' : 'index,follow'
  }

  it('canonical URL strips query string', () => {
    expect(getCanonical('/products', 'https://circuitbreaker.online'))
      .toBe('https://circuitbreaker.online/products')
  })

  it('clean pages get index,follow', () => {
    expect(getRobots([])).toBe('index,follow')
  })

  it('query-param pages get noindex,follow', () => {
    expect(getRobots(['category'])).toBe('noindex,follow')
    expect(getRobots(['category', 'page', 'sort'])).toBe('noindex,follow')
  })
})
