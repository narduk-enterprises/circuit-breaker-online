/**
 * Global SEO policy plugin.
 *
 * Enforces canonical URLs (without query strings) and sets
 * `noindex,follow` for any page rendered with query parameters.
 *
 * Canonical/robots logic lives in `app/utils/seo-helpers.ts` so
 * the regression tests import the same functions the plugin uses.
 *
 * Runs on both SSR and client navigation.
 */
export default defineNuxtPlugin(() => {
  const router = useRouter()
  const siteUrl = (useRuntimeConfig().public.appUrl as string) || ''

  /** Apply canonical + robots head tags for the current route. */
  function applySeoPolicy() {
    const route = useRoute()

    const canonicalUrl = getCanonicalUrl(siteUrl, route.path)
    const robots = getRobotsDirective(Object.keys(route.query))

    useHead({
      link: [{ key: 'canonical', rel: 'canonical', href: canonicalUrl }],
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
