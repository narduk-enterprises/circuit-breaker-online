/**
 * Convenience composable for setting page-level SEO + OpenGraph meta.
 * Wraps useSeoMeta with automatic ogTitle / ogDescription mirroring,
 * canonical link generation, and ogUrl so individual pages stay DRY.
 */
export function usePageSeo(opts: {
  title: string
  description: string
  ogImage?: string
  ogType?: 'website' | 'article'
  extra?: Record<string, string>
}) {
  const baseUrl = 'https://circuitbreaker.online'
  const defaultOgImage = `${baseUrl}/images/branding/og-default.png`
  const route = useRoute()
  const canonicalUrl = `${baseUrl}${route.path}`

  // Canonical link tag — tells Google the preferred URL for this page
  useHead({
    link: [
      { rel: 'canonical', href: canonicalUrl },
    ],
  })

  useSeoMeta({
    title: opts.title,
    description: opts.description,
    // OpenGraph
    ogTitle: opts.title,
    ogDescription: opts.description,
    ogImage: opts.ogImage || defaultOgImage,
    ogUrl: canonicalUrl,
    ogType: opts.ogType || 'website',
    ogSiteName: 'Circuit Breaker Sales',
    // Twitter
    twitterCard: 'summary_large_image',
    twitterTitle: opts.title,
    twitterDescription: opts.description,
    twitterImage: opts.ogImage || defaultOgImage,
    // Extra / overrides
    ...opts.extra,
  })
}
