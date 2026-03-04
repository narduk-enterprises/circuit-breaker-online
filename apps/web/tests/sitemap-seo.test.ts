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
  it('canonical URL strips query string from URL with params', () => {
    expect(getCanonicalUrl('https://circuitbreaker.online', '/products'))
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
