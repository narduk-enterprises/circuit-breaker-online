<script setup lang="ts">
definePageMeta({
  title: 'Home',
})

useSeo({
  title: 'Circuit Breaker Sales | Industrial Power Equipment Since 1981',
  description: 'Your trusted source for new and reconditioned circuit breakers, switchgear, transformers, and industrial power equipment. Over 40 years of experience. A Group CBS company.',
  ogImage: {
    title: 'Circuit Breaker Sales',
    description: 'Industrial Power Equipment Since 1981',
    icon: '⚡',
  },
})

// Organization + LocalBusiness JSON-LD for knowledge panel & local SEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': ['Organization', 'LocalBusiness'],
        '@id': 'https://circuitbreaker.online/#organization',
        name: 'Circuit Breaker Sales',
        alternateName: 'CBS - A Group CBS Company',
        url: 'https://circuitbreaker.online',
        logo: 'https://circuitbreaker.online/images/branding/og-default.png',
        description: 'Leading supplier of new and reconditioned circuit breakers, switchgear, transformers, and industrial power equipment since 1981.',
        foundingDate: '1981',
        telephone: '+1-800-232-5809',
        email: 'sales@groupcbs.com',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US',
        },
        areaServed: {
          '@type': 'Country',
          name: 'United States',
        },
        parentOrganization: {
          '@type': 'Organization',
          name: 'Group CBS',
          url: 'https://groupcbs.com',
        },
        sameAs: [
          'https://www.youtube.com/@CircuitBreakerSales',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Industrial Power Equipment',
          itemListElement: [
            { '@type': 'OfferCatalog', name: 'Circuit Breakers' },
            { '@type': 'OfferCatalog', name: 'Switchgear' },
            { '@type': 'OfferCatalog', name: 'Transformers' },
            { '@type': 'OfferCatalog', name: 'Protective Relays' },
            { '@type': 'OfferCatalog', name: 'Vacuum Interrupters' },
          ],
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://circuitbreaker.online/#website',
        url: 'https://circuitbreaker.online',
        name: 'Circuit Breaker Sales',
        publisher: { '@id': 'https://circuitbreaker.online/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://circuitbreaker.online/products?search={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      }),
    },
  ],
})

const stats = [
  { value: '40+', label: 'Years in Business' },
  { value: '1,000+', label: 'Products in Stock' },
  { value: '24/7', label: 'Emergency Service' },
  { value: '100%', label: 'Quality Tested' },
]

const categories = [
  { name: 'Circuit Breakers', slug: 'circuit-breakers', icon: 'i-lucide-zap', description: 'Low & medium voltage power circuit breakers' },
  { name: 'Switchgear', slug: 'switchgear', icon: 'i-lucide-checkpu', description: 'Metal-clad & metal-enclosed switchgear' },
  { name: 'Transformers', slug: 'transformers', icon: 'i-lucide-arrow-rightrrow-left-right', description: 'Power & distribution transformers' },
  { name: 'Protective Relays', slug: 'protective-relays', icon: 'i-lucide-shield-check', description: 'Electromechanical & digital relays' },
  { name: 'Vacuum Interrupters', slug: 'vacuum-interrupters', icon: 'i-lucide-database', description: 'OEM replacement vacuum bottles' },
  { name: 'Motor Control', slug: 'motor-control', icon: 'i-lucide-settings', description: 'Low voltage motor control centers' },
  { name: 'Renewal Parts', slug: 'renewal-parts', icon: 'i-lucide-wrench', description: 'Replacement & renewal parts' },
  { name: 'Unit Substations', slug: 'unit-substations', icon: 'i-lucide-building', description: 'Complete substation packages' },
  { name: 'Load Break Switches', slug: 'load-break-switches', icon: 'i-lucide-phoneower', description: 'Medium voltage load break switches' },
  { name: 'Contactors', slug: 'contactors', icon: 'i-lucide-link', description: 'Medium voltage controls & contactors' },
  { name: 'Remote Racking', slug: 'remote-racking', icon: 'i-lucide-rss', description: 'Remote racking & switching devices' },
  { name: 'Load Tap Changers', slug: 'load-tap-changers', icon: 'i-lucide-sliders', description: 'Tap changer parts & components' },
]

const features = [
  {
    title: 'Expert Reconditioning',
    icon: 'i-lucide-wrench',
    description: 'Our factory-trained technicians restore equipment to OEM specifications with full testing and certification.',
  },
  {
    title: 'Nationwide Inventory',
    icon: 'i-lucide-map-pin',
    description: 'Multiple warehouse locations across the country ensure fast delivery wherever you need equipment.',
  },
  {
    title: 'Technical Support',
    icon: 'i-lucide-message-square',
    description: 'Our engineering team provides expert guidance on equipment selection, installation, and troubleshooting.',
  },
  {
    title: 'Quality Assured',
    icon: 'i-lucide-shield-check',
    description: 'Every piece of equipment is thoroughly tested and comes with a comprehensive warranty for your peace of mind.',
  },
  {
    title: 'Fast Turnaround',
    icon: 'i-lucide-checklock',
    description: 'Emergency and rush orders available. We understand downtime costs money in industrial operations.',
  },
  {
    title: 'Group CBS Backed',
    icon: 'i-lucide-building-2',
    description: 'Part of the Group CBS family of companies, giving you access to the largest independent power equipment network.',
  },
]
</script>

<template>
  <div>
    <!-- Hero Section (stays dark for visual impact) -->
    <section class="gradient-industrial hero-grid relative overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute inset-0 bg-linear-to-b from-brand-950/20 via-transparent to-transparent" />
      <div class="absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-600/5 blur-3xl" />
      <div class="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-brand-600/3 blur-2xl" />

      <div class="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:pb-28 sm:pt-32">
        <!-- Authority Badge -->
        <div class="mb-6 flex items-center gap-2 animate-fade-in-up opacity-0">
          <div class="h-px w-8 bg-brand-600" />
          <span class="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">Since 1981 · A Group CBS Company</span>
        </div>

        <h1 class="mb-6 max-w-4xl font-display text-5xl font-bold leading-[1.1] tracking-tight text-white opacity-0 animate-fade-in-up animate-delay-100 sm:text-6xl lg:text-7xl">
          Find Load Tap Changer Parts &
          <span class="text-brand-400">Power Equipment</span> <span class="text-brand-400">Fast</span>
        </h1>

        <p class="mb-8 max-w-2xl text-xl leading-relaxed text-white/70 opacity-0 animate-fade-in-up animate-delay-200">
          New and reconditioned circuit breakers, switchgear, transformers, and renewal parts.
          Over 40 years of experience serving utilities, industrial facilities, and contractors nationwide.
        </p>

        <div class="flex flex-wrap items-center gap-4 opacity-0 animate-fade-in-up animate-delay-300">
          <UButton to="/products" size="xl" color="primary" class="font-bold uppercase tracking-wide">
            Browse Equipment
            <template #trailing>
              <UIcon name="i-lucide-arrow-right" class="size-5" />
            </template>
          </UButton>
          <NuxtLink to="/contact" class="inline-flex items-center justify-center rounded-lg px-6 py-3 font-bold uppercase tracking-wide text-white ring-1 ring-white/30 transition-colors hover:bg-white/10">
            Request a Quote
          </NuxtLink>
        </div>

        <!-- Stats Bar -->
        <div class="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4 opacity-0 animate-fade-in-up animate-delay-400">
          <div v-for="stat in stats" :key="stat.label">
            <p class="font-display text-3xl font-bold text-white sm:text-4xl">{{ stat.value }}</p>
            <p class="mt-1 text-sm text-white/60">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Grid (light background) -->
    <section class="bg-default py-20">
      <div class="mx-auto max-w-7xl px-4">
        <div class="mb-12 text-center">
          <h2 class="mb-3 font-display text-4xl font-bold text-default">Equipment Categories</h2>
          <p class="text-lg text-muted">Browse our full inventory of industrial power equipment</p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/products?category=${encodeURIComponent(cat.name)}`"
            class="group category-card rounded-xl p-6"
          >
            <div class="mb-3 flex size-12 items-center justify-center rounded-lg bg-brand-50">
              <UIcon :name="cat.icon" class="size-6 text-brand-600" />
            </div>
            <h3 class="font-display text-base font-bold text-default group-hover:text-brand-600 transition-colors">{{ cat.name }}</h3>
            <p class="mt-1 text-sm text-dimmed">{{ cat.description }}</p>
            <span class="mt-3 inline-block text-xs font-medium text-brand-600 group-hover:text-brand-500">
              Learn more →
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why Choose Us (light gray background) -->
    <section class="bg-muted border-y border-default">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <div class="mb-12 text-center">
          <h2 class="mb-3 font-display text-4xl font-bold text-default">Why Choose Circuit Breaker Sales</h2>
          <p class="text-lg text-muted">Industry-leading expertise backed by Group CBS</p>
        </div>

        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-xl bg-elevated p-8 border border-default shadow-sm transition-all hover:shadow-md hover:border-brand-200">
            <div class="mb-4 flex size-12 items-center justify-center rounded-lg bg-brand-50">
              <UIcon :name="feature.icon" class="size-6 text-brand-600" />
            </div>
            <h3 class="mb-2 font-display text-xl font-bold text-default">{{ feature.title }}</h3>
            <p class="text-base leading-relaxed text-muted">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-default py-20">
      <div class="mx-auto max-w-7xl px-4">
        <div class="rounded-2xl bg-muted p-8 text-center sm:p-16">
          <h2 class="mb-4 font-display text-3xl font-bold text-default sm:text-4xl">Need a Custom Quote?</h2>
          <p class="mb-8 text-lg text-dimmed">Our team of experts is ready to help you find the right equipment.</p>
          <div class="flex flex-wrap items-center justify-center gap-5">
            <UButton to="/contact" size="xl" color="primary" class="font-bold uppercase tracking-wide">
              Contact Our Team
            </UButton>
            <ULink to="tel:8002325809" class="flex items-center gap-2 text-base font-bold text-dimmed transition-colors hover:text-default">
              <UIcon name="i-lucide-phone" class="size-5 text-brand-400" />
              800-232-5809
            </ULink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
