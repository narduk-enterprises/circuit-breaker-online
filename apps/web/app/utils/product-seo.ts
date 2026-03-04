/**
 * Product SEO helpers.
 *
 * Pure functions for building SEO-friendly product content.
 * Used by the product detail page and regression tests.
 */

/** Ensure an image URL is absolute (prefix with site origin if relative). */
export function toAbsoluteImageUrl(siteUrl: string, url?: string): string | undefined {
  if (!url) return undefined
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${siteUrl}${url.startsWith('/') ? '' : '/'}${url}`
}

/**
 * Build a deterministic fallback description (~100-200 words) from
 * structured product fields. Ensures every product page has enough
 * unique content even when no editorial description is available.
 */
export function buildFallbackDescription(p: {
  name: string
  sku?: string
  model?: string
  manufacturer?: string
  category?: string
  subcategory?: string
  voltage?: string
  amperage?: string
  type?: string
  condition?: string
  warranty?: string
}): string {
  const parts: string[] = []

  const mfr = p.manufacturer || 'Industrial'
  const cat = p.category || 'power equipment'

  parts.push(`The ${p.name} is a ${mfr} ${cat.toLowerCase()} available from Circuit Breaker Sales.`)

  if (p.sku) parts.push(`This unit is identified by SKU / Part Number ${p.sku}.`)
  if (p.model) parts.push(`Model: ${p.model}.`)

  if (p.voltage && p.amperage) {
    parts.push(`It is rated for ${p.voltage} and ${p.amperage}, making it suitable for a wide range of industrial and commercial applications.`)
  } else if (p.voltage) {
    parts.push(`Rated for ${p.voltage}, this equipment is designed for demanding electrical environments.`)
  } else if (p.amperage) {
    parts.push(`Rated at ${p.amperage}, it meets the requirements of various industrial installations.`)
  }

  if (p.type) parts.push(`Product type: ${p.type}.`)

  if (p.condition) parts.push(`Condition: ${p.condition}.`)
  if (p.warranty) parts.push(`Backed by a ${p.warranty} warranty.`)

  if (p.subcategory) parts.push(`Filed under ${p.subcategory} within our ${cat.toLowerCase()} catalog.`)

  parts.push('Circuit Breaker Sales has been a trusted source for industrial power distribution equipment since 1981.')
  parts.push('All equipment is thoroughly inspected and tested by our experienced engineering team.')
  parts.push('Contact us at 800-232-5809 for pricing, availability, and custom quotes.')
  parts.push(`We offer fast shipping, competitive pricing, and expert technical support for all ${cat.toLowerCase()}.`)

  return parts.join(' ')
}

/**
 * Build an SEO-optimized `<title>` for a product page.
 * Includes product name, SKU, and manufacturer when available.
 */
export function buildProductTitle(p: {
  name: string
  sku?: string
  manufacturer?: string
}): string {
  const titleParts = [p.name]
  if (p.sku && !p.name.includes(p.sku)) {
    titleParts.push(p.sku)
  }
  if (p.manufacturer && !p.name.includes(p.manufacturer)) {
    titleParts.push(p.manufacturer)
  }
  return `${titleParts.join(' - ')} | Circuit Breaker Sales`
}
