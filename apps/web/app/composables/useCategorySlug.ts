/**
 * Convert a category name to its URL slug.
 *
 * Matches the slug generation logic used by the scraper and stored in the
 * categories table: lowercase, non-alphanumeric chars replaced with hyphens.
 */
export function useCategorySlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
