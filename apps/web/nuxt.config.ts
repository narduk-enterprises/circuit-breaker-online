// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Extend the Narduk Nuxt Layer (relative path within monorepo)
  extends: ['@narduk-enterprises/narduk-nuxt-template-layer'],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // Server-only (admin API routes)
    googleServiceAccountKey: process.env.GSC_SERVICE_ACCOUNT_JSON || '',
    posthogApiKey: process.env.POSTHOG_PERSONAL_API_KEY || '',
    gaPropertyId: process.env.GA_PROPERTY_ID || '',
    posthogProjectId: process.env.POSTHOG_PROJECT_ID || '',
    public: {
      appUrl: process.env.SITE_URL || 'https://circuitbreaker.online',
      appName: process.env.APP_NAME || 'Circuit Breaker Sales',
      // Analytics
      posthogPublicKey: process.env.POSTHOG_PUBLIC_KEY || '',
      posthogHost: process.env.POSTHOG_HOST || 'https://us.i.posthog.com',
      gaMeasurementId: process.env.GA_MEASUREMENT_ID || '',
      posthogProjectId: process.env.POSTHOG_PROJECT_ID || '',
      // IndexNow
      indexNowKey: process.env.INDEXNOW_KEY || '',
    }
  },

  site: {
    url: process.env.SITE_URL || 'https://circuitbreaker.online',
    name: 'Circuit Breaker Sales',
    description: 'A Group CBS Company. Leading the industry in circuit breaker sales, service, and supply since 1981.',
    defaultLocale: 'en',
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Circuit Breaker Sales',
      url: process.env.SITE_URL || 'https://circuitbreaker.online',
      logo: '/favicon.svg',
    },
  },

  image: {
    cloudflare: {
      baseURL: process.env.SITE_URL || 'https://circuitbreaker.online',
    },
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ],
    // Exclude any URLs with query params or fragments from the sitemap
    exclude: [
      '/**[?]*',
    ],
  },

  robots: {
    sitemap: ['/sitemap.xml'],
    groups: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'theme-color', content: '#b91c1c' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
    pageTransition: false,
  },

  modules: [
    'nitro-cloudflare-dev',
  ],

  // Cloudflare dev proxy (from template standard)
  nitro: {
    cloudflareDev: {
      configPath: 'wrangler.json',
    },
  },
})
