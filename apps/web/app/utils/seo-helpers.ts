/**
 * Shared SEO helpers.
 *
 * Pure functions used by the global SEO policy plugin and regression tests.
 * Keeping these in a single module prevents logic drift between the plugin
 * and its test suite.
 */

/** Strip trailing slashes from a site URL to avoid double-slash paths. */
export function normalizeSiteUrl(siteUrl: string): string {
  return siteUrl.replace(/\/+$/, '')
}

/**
 * Build a canonical URL from site origin + path, stripping any query string
 * or hash fragment. Also normalises a potential trailing slash on `siteUrl`.
 */
export function getCanonicalUrl(siteUrl: string, path: string): string {
  return `${normalizeSiteUrl(siteUrl)}${path}`
}

/**
 * Return the robots directive for a page given its query-param keys.
 * Pages with any query params get `noindex,follow`; clean pages get
 * `index,follow`.
 */
export function getRobotsDirective(queryKeys: string[]): string {
  return queryKeys.length > 0 ? 'noindex,follow' : 'index,follow'
}
