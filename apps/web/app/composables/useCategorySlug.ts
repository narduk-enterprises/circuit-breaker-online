/**
 * Convert a category name to its URL slug.
 *
 * Based on the scraper's slug generation (lowercase, non-alphanumeric chars
 * replaced with hyphens) with additional trimming of leading/trailing hyphens.
 */
export function useCategorySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
