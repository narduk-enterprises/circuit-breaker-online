/**
 * Sitemap SEO regression tests.
 *
 * Validates that the sitemap URL source only emits clean URLs
 * (no query params, no fragments) and that the SEO policy
 * utilities work correctly.
 *
 * Imports the real buildSitemapEntries, useCategorySlug, and SEO
 * helpers so regressions in the source are caught by these tests.
 */
import { describe, it, expect } from 'vitest'
import { useCategorySlug } from '../app/composables/useCategorySlug'
import { buildSitemapEntries } from '../server/utils/buildSitemapEntries'
import { getCanonicalUrl, getRobotsDirective } from '../app/utils/seo-helpers'
import { toAbsoluteImageUrl, buildFallbackDescription, buildProductTitle } from '../app/utils/product-seo'

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
    expect(useCategorySlug('Circuit Breakers')).toBe('circuit-breakers')
    expect(useCategorySlug('Bus Duct & Busway')).toBe('bus-duct-busway')
    expect(useCategorySlug('Variable Frequency Drives (VFDs)')).toBe('variable-frequency-drives-vfds')
    expect(useCategorySlug('Fuses & Fuse Holders')).toBe('fuses-fuse-holders')
    expect(useCategorySlug('Renewal & Replacement Parts')).toBe('renewal-replacement-parts')
  })

  it('handles simple single-word names', () => {
    expect(useCategorySlug('Switchgear')).toBe('switchgear')
    expect(useCategorySlug('Transformers')).toBe('transformers')
  })

  it('strips leading and trailing hyphens', () => {
    expect(useCategorySlug('  Test  ')).toBe('test')
    expect(useCategorySlug('---test---')).toBe('test')
  })
})

describe('SEO policy', () => {
  it('canonical URL strips query string', () => {
    expect(getCanonicalUrl('https://circuitbreaker.online', '/products?category=breakers&page=2'))
      .toBe('https://circuitbreaker.online/products')
  })

  it('canonical URL strips hash fragment', () => {
    expect(getCanonicalUrl('https://circuitbreaker.online', '/products#top'))
      .toBe('https://circuitbreaker.online/products')
  })

  it('canonical URL strips both query string and hash fragment', () => {
    expect(getCanonicalUrl('https://circuitbreaker.online', '/products?category=X#section'))
      .toBe('https://circuitbreaker.online/products')
  })

  it('canonical URL preserves clean path', () => {
    expect(getCanonicalUrl('https://circuitbreaker.online', '/products/category/circuit-breakers'))
      .toBe('https://circuitbreaker.online/products/category/circuit-breakers')
  })

  it('canonical URL normalises trailing slash on siteUrl', () => {
    expect(getCanonicalUrl('https://circuitbreaker.online/', '/products'))
      .toBe('https://circuitbreaker.online/products')
  })

  it('clean pages get index,follow', () => {
    expect(getRobotsDirective([])).toBe('index,follow')
  })

  it('query-param pages get noindex,follow', () => {
    expect(getRobotsDirective(['category'])).toBe('noindex,follow')
    expect(getRobotsDirective(['category', 'page', 'sort'])).toBe('noindex,follow')
  })
})

// ---------------------------------------------------------------------------
// Product SEO helpers
// ---------------------------------------------------------------------------

describe('toAbsoluteImageUrl', () => {
  const site = 'https://circuitbreaker.online'

  it('returns undefined for undefined/empty input', () => {
    expect(toAbsoluteImageUrl(site, undefined)).toBeUndefined()
    expect(toAbsoluteImageUrl(site, '')).toBeUndefined()
  })

  it('preserves already-absolute URLs', () => {
    expect(toAbsoluteImageUrl(site, 'https://cdn.example.com/img.jpg'))
      .toBe('https://cdn.example.com/img.jpg')
    expect(toAbsoluteImageUrl(site, 'http://cdn.example.com/img.jpg'))
      .toBe('http://cdn.example.com/img.jpg')
  })

  it('prefixes relative URLs starting with /', () => {
    expect(toAbsoluteImageUrl(site, '/images/products/test.png'))
      .toBe('https://circuitbreaker.online/images/products/test.png')
  })

  it('prefixes relative URLs without leading /', () => {
    expect(toAbsoluteImageUrl(site, 'images/test.png'))
      .toBe('https://circuitbreaker.online/images/test.png')
  })
})

describe('buildFallbackDescription', () => {
  it('generates a description with at least 100 words', () => {
    const desc = buildFallbackDescription({
      name: 'GE AKR-50 Circuit Breaker',
      sku: 'AKR-50',
      manufacturer: 'General Electric',
      category: 'Circuit Breakers',
      voltage: '600V',
      amperage: '1600A',
      type: 'Low Voltage',
      condition: 'Reconditioned',
      warranty: '1 Year',
      subcategory: 'Air Circuit Breakers',
    })
    const wordCount = desc.split(/\s+/).length
    expect(wordCount).toBeGreaterThanOrEqual(100)
  })

  it('includes the product name in the description', () => {
    const desc = buildFallbackDescription({ name: 'Test Product XYZ-123' })
    expect(desc).toContain('Test Product XYZ-123')
  })

  it('includes the SKU when available', () => {
    const desc = buildFallbackDescription({ name: 'Test', sku: 'SKU-999' })
    expect(desc).toContain('SKU-999')
  })

  it('includes voltage and amperage when both present', () => {
    const desc = buildFallbackDescription({
      name: 'Test',
      voltage: '480V',
      amperage: '2000A',
    })
    expect(desc).toContain('480V')
    expect(desc).toContain('2000A')
  })

  it('works with minimal product data', () => {
    const desc = buildFallbackDescription({ name: 'Minimal Product' })
    expect(desc.length).toBeGreaterThan(100)
    expect(desc).toContain('Minimal Product')
    expect(desc).toContain('Circuit Breaker Sales')
  })
})

describe('buildProductTitle', () => {
  it('includes product name', () => {
    const title = buildProductTitle({ name: 'GE AKR-50' })
    expect(title).toContain('GE AKR-50')
    expect(title).toContain('Circuit Breaker Sales')
  })

  it('appends SKU when not in name', () => {
    const title = buildProductTitle({ name: 'Some Breaker', sku: 'ABC-123' })
    expect(title).toContain('ABC-123')
  })

  it('does not duplicate SKU when already in name', () => {
    const title = buildProductTitle({ name: 'ABC-123 Circuit Breaker', sku: 'ABC-123' })
    // SKU should appear exactly once
    const count = title.split('ABC-123').length - 1
    expect(count).toBe(1)
  })

  it('appends manufacturer when not in name', () => {
    const title = buildProductTitle({
      name: 'AKR-50 Breaker',
      manufacturer: 'General Electric',
    })
    expect(title).toContain('General Electric')
  })

  it('does not duplicate manufacturer when already in name', () => {
    const title = buildProductTitle({
      name: 'General Electric AKR-50',
      manufacturer: 'General Electric',
    })
    const count = title.split('General Electric').length - 1
    expect(count).toBe(1)
  })
})
