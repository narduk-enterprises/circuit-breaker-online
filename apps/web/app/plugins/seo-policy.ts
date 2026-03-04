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
  const siteUrl = (useRuntimeConfig().public.appUrl as string) || ''
  const route = useRoute()

  // Reactively apply canonical + robots head tags for the current route.
  useHead(() => ({
    link: [
      {
        key: 'canonical',
        rel: 'canonical',
        href: getCanonicalUrl(siteUrl, route.path),
      },
    ],
  }))

  useSeoMeta(() => ({
    robots: getRobotsDirective(Object.keys(route.query)),
  }))
})
