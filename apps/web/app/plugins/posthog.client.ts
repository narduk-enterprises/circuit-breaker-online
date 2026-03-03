import posthog from 'posthog-js'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    // 1. Initialize PostHog (if configured)
    const phKey = config.public.posthogPublicKey
    const phHost = config.public.posthogHost

    if (!phKey || import.meta.server) return

    // Skip on localhost
    if (
        import.meta.client &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ) {
        return
    }

    posthog.init(phKey, {
        api_host: phHost || 'https://us.i.posthog.com',
        capture_pageview: false, // We'll trigger this manually on route changes
        loaded: (posthog) => {
            if (import.meta.env.DEV) {
                posthog.debug()
            }
        }
    })

    // 3. Track page views on route change
    nuxtApp.hook('page:finish', () => {
        const route = useRoute()
        posthog.capture('$pageview', {
            $current_url: window.location.href,
            $pathname: route.path,
        })
    })

    return {
        provide: {
            posthog
        }
    }
})
