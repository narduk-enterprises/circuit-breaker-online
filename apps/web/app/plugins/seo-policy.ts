/**
 * Global SEO policy plugin.
 *
 * Enforces canonical URLs (without query strings) and sets
 * `noindex,follow` for any page rendered with query parameters.
 *
 * Runs on both SSR and client navigation.
 */
export default defineNuxtPlugin(() => {
  const router = useRouter()
  const siteUrl = (useRuntimeConfig().public.appUrl as string) || ''

  /** Apply canonical + robots head tags for the current route. */
  function applySeoPolicy() {
    const route = useRoute()

    // Canonical URL = site origin + path (no query string, no hash)
    const canonicalUrl = `${siteUrl}${route.path}`

    // Pages with query params get noindex,follow unless path is whitelisted
    const hasQueryParams = Object.keys(route.query).length > 0
    const robots = hasQueryParams ? 'noindex,follow' : 'index,follow'

    useHead({
      link: [{ rel: 'canonical', href: canonicalUrl }],
    })

    useSeoMeta({ robots })
  }

  // Apply on initial render (SSR + first client load)
  applySeoPolicy()

  // Re-apply on every client-side navigation
  router.afterEach(() => {
    applySeoPolicy()
  })
})
