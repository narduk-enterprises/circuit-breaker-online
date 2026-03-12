<script setup lang="ts">
definePageMeta({
  title: 'Home',
})

useSeo({
  title: 'Circuit Breaker Sales | Industrial Power Equipment Since 1981',
  description:
    'Your trusted source for new and reconditioned circuit breakers, switchgear, transformers, and industrial power equipment. Over 40 years of experience. A Group CBS company.',
  ogImage: {
    title: 'Circuit Breaker Sales',
    description: 'Industrial Power Equipment Since 1981',
    icon: '⚡',
  },
})

// FAQ schema — common questions potential customers search for
useFAQSchema([
  {
    question: 'Where can I buy reconditioned circuit breakers?',
    answer:
      'Circuit Breaker Sales offers one of the largest inventories of new and reconditioned circuit breakers in North America. All reconditioned breakers are restored to OEM specifications by factory-trained technicians and come with a comprehensive warranty. Call 800-232-5809 for availability.',
  },
  {
    question: 'What brands of switchgear does Circuit Breaker Sales carry?',
    answer:
      'We carry switchgear from all major manufacturers including Square D, Westinghouse, General Electric, Siemens, ABB, Cutler-Hammer, and ITE. Both new and reconditioned options are available.',
  },
  {
    question: 'Does Circuit Breaker Sales offer emergency equipment replacement?',
    answer:
      'Yes, we provide 24/7 emergency service with rapid nationwide deployment. Our team can source replacement circuit breakers, switchgear, and transformers quickly to minimize your downtime. Call 800-232-5809 for immediate assistance.',
  },
  {
    question: 'What is the difference between reconditioned and remanufactured circuit breakers?',
    answer:
      'Reconditioned circuit breakers are cleaned, tested, and repaired to meet original specifications. Remanufactured breakers undergo a complete teardown and rebuild with new components where needed. Circuit Breaker Sales offers both options with full testing and warranty.',
  },
  {
    question: 'Can Circuit Breaker Sales help with load tap changer parts?',
    answer:
      'Yes, Circuit Breaker Sales specializes in load tap changer (LTC) parts and components. We stock a wide range of LTC renewal parts for major manufacturers and provide technical support for LTC maintenance and repair.',
  },
])

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
        description:
          'Leading supplier of new and reconditioned circuit breakers, switchgear, transformers, and industrial power equipment since 1981.',
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
        sameAs: ['https://www.youtube.com/@CircuitBreakerSales'],
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
  { value: '40+', label: 'Years in Business', icon: 'i-lucide-calendar' },
  { value: '1,000+', label: 'Products in Stock', icon: 'i-lucide-package' },
  { value: '24/7', label: 'Emergency Service', icon: 'i-lucide-siren' },
  { value: '100%', label: 'Quality Tested', icon: 'i-lucide-shield-check' },
]

const categories = [
  {
    name: 'Circuit Breakers',
    slug: 'circuit-breakers',
    icon: 'i-lucide-zap',
    description: 'Low & medium voltage power circuit breakers',
  },
  {
    name: 'Switchgear',
    slug: 'switchgear',
    icon: 'i-lucide-cpu',
    description: 'Metal-clad & metal-enclosed switchgear',
  },
  {
    name: 'Transformers',
    slug: 'transformers',
    icon: 'i-lucide-arrow-left-right',
    description: 'Power & distribution transformers',
  },
  {
    name: 'Protective Relays',
    slug: 'protective-relays',
    icon: 'i-lucide-shield-check',
    description: 'Electromechanical & digital relays',
  },
  {
    name: 'Vacuum Interrupters',
    slug: 'vacuum-interrupters',
    icon: 'i-lucide-database',
    description: 'OEM replacement vacuum bottles',
  },
  {
    name: 'Motor Control',
    slug: 'motor-control',
    icon: 'i-lucide-settings',
    description: 'Low voltage motor control centers',
  },
  {
    name: 'Renewal Parts',
    slug: 'renewal-parts',
    icon: 'i-lucide-wrench',
    description: 'Replacement & renewal parts',
  },
  {
    name: 'Unit Substations',
    slug: 'unit-substations',
    icon: 'i-lucide-building',
    description: 'Complete substation packages',
  },
  {
    name: 'Load Break Switches',
    slug: 'load-break-switches',
    icon: 'i-lucide-power',
    description: 'Medium voltage load break switches',
  },
  {
    name: 'Contactors',
    slug: 'contactors',
    icon: 'i-lucide-link',
    description: 'Medium voltage controls & contactors',
  },
  {
    name: 'Remote Racking',
    slug: 'remote-racking',
    icon: 'i-lucide-rss',
    description: 'Remote racking & switching devices',
  },
  {
    name: 'Load Tap Changers',
    slug: 'load-tap-changers',
    icon: 'i-lucide-sliders',
    description: 'Tap changer parts & components',
  },
]

const features = [
  {
    title: 'Expert Reconditioning',
    icon: 'i-lucide-wrench',
    description:
      'Our factory-trained technicians restore equipment to OEM specifications with full testing and certification.',
  },
  {
    title: 'Nationwide Inventory',
    icon: 'i-lucide-map-pin',
    description:
      'Multiple warehouse locations across the country ensure fast delivery wherever you need equipment.',
  },
  {
    title: 'Technical Support',
    icon: 'i-lucide-message-square',
    description:
      'Our engineering team provides expert guidance on equipment selection, installation, and troubleshooting.',
  },
  {
    title: 'Quality Assured',
    icon: 'i-lucide-shield-check',
    description:
      'Every piece of equipment is thoroughly tested and comes with a comprehensive warranty for your peace of mind.',
  },
  {
    title: 'Fast Turnaround',
    icon: 'i-lucide-clock',
    description:
      'Emergency and rush orders available. We understand downtime costs money in industrial operations.',
  },
  {
    title: 'Group CBS Backed',
    icon: 'i-lucide-building-2',
    description:
      'Part of the Group CBS family of companies, giving you access to the largest independent power equipment network.',
  },
]
</script>

<template>
  <div>
    <!-- ═══════ Hero Section ═══════ -->
    <section class="gradient-industrial hero-grid relative overflow-hidden">
      <!-- Decorative Orbs -->
      <div
        class="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-accent-500/5 blur-[100px] float-slow"
      />
      <div class="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-brand-600/5 blur-[80px]" />
      <div class="absolute left-0 top-1/2 h-40 w-40 rounded-full bg-accent-400/8 blur-[60px]" />

      <!-- Gradient Overlay -->
      <div
        class="absolute inset-0 bg-linear-to-b from-accent-950/30 via-transparent to-transparent"
      />

      <div class="relative mx-auto max-w-7xl px-4 pb-14 pt-16 sm:pb-32 sm:pt-36">
        <!-- Authority Badge -->
        <div class="mb-8 flex items-center gap-3 animate-fade-in-up opacity-0">
          <div class="accent-line" />
          <span
            class="font-display text-sm font-semibold uppercase tracking-[0.25em] text-accent-400"
            >Since 1981 · A Group CBS Company</span
          >
        </div>

        <h1
          class="mb-6 sm:mb-8 max-w-4xl font-display text-3xl sm:text-5xl font-bold leading-[1.12] sm:leading-[1.08] tracking-tight text-white opacity-0 animate-fade-in-up animate-delay-100 lg:text-7xl"
        >
          Find Load Tap Changer Parts &
          <span class="bg-linear-to-r from-brand-400 to-brand-500 bg-clip-text text-transparent"
            >Power Equipment</span
          >
          <span class="bg-linear-to-r from-brand-400 to-brand-500 bg-clip-text text-transparent">
            Fast</span
          >
        </h1>

        <p
          class="mb-8 sm:mb-10 max-w-2xl text-base sm:text-lg leading-relaxed text-white/60 opacity-0 animate-fade-in-up animate-delay-200 lg:text-xl"
        >
          New and reconditioned circuit breakers, switchgear, transformers, and renewal parts. Over
          40 years of experience serving utilities, industrial facilities, and contractors
          nationwide.
        </p>

        <div
          class="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 opacity-0 animate-fade-in-up animate-delay-300"
        >
          <UButton
            to="/products"
            size="xl"
            color="primary"
            class="font-bold uppercase tracking-wide w-full sm:w-auto justify-center"
          >
            Browse Equipment
            <template #trailing>
              <UIcon name="i-lucide-arrow-right" class="size-5" />
            </template>
          </UButton>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-bold uppercase tracking-wide text-white backdrop-blur transition-all hover:bg-white/10 hover:border-white/30 w-full sm:w-auto"
          >
            Request a Quote
          </NuxtLink>
        </div>

        <!-- Stats Bar -->
        <div
          class="mt-12 sm:mt-20 grid grid-cols-2 gap-6 sm:gap-8 border-t border-white/10 pt-8 sm:pt-10 sm:grid-cols-4 opacity-0 animate-fade-in-up animate-delay-400"
        >
          <div v-for="stat in stats" :key="stat.label" class="group">
            <div class="mb-1.5 sm:mb-2 flex items-center gap-2">
              <UIcon :name="stat.icon" class="size-4 sm:size-5 text-accent-400" />
              <p class="font-display text-2xl sm:text-3xl font-bold text-white lg:text-4xl">
                {{ stat.value }}
              </p>
            </div>
            <p class="text-xs sm:text-sm font-medium text-white/40 uppercase tracking-wider">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════ Category Grid ═══════ -->
    <section class="bg-default py-14 sm:py-24">
      <div class="mx-auto max-w-7xl px-4">
        <div class="mb-8 sm:mb-14 text-center">
          <span
            class="mb-3 inline-block rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700"
            >Full Inventory</span
          >
          <h2 class="mt-4 font-display text-2xl sm:text-4xl font-bold text-default">
            Equipment Categories
          </h2>
          <p class="mt-3 text-base sm:text-lg text-muted">
            Browse our full inventory of industrial power equipment
          </p>
        </div>

        <div class="grid gap-3 grid-cols-1 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/products/category/${cat.slug}`"
            class="group category-card rounded-xl p-5 sm:p-6 flex sm:block items-center gap-4"
          >
            <div
              class="mb-0 sm:mb-3 flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 transition-colors group-hover:bg-brand-100"
            >
              <UIcon :name="cat.icon" class="size-5 sm:size-6 text-brand-600" />
            </div>
            <div class="flex-1 min-w-0">
              <h3
                class="font-display text-base font-bold text-default group-hover:text-brand-600 transition-colors"
              >
                {{ cat.name }}
              </h3>
              <p
                class="mt-0.5 sm:mt-1 text-sm text-dimmed leading-relaxed line-clamp-1 sm:line-clamp-none"
              >
                {{ cat.description }}
              </p>
              <span
                class="mt-1.5 sm:mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:gap-2 transition-all"
              >
                Browse catalog
                <UIcon name="i-lucide-arrow-right" class="size-3.5" />
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══════ Why Choose Us ═══════ -->
    <section class="bg-muted border-y border-default">
      <div class="mx-auto max-w-7xl px-4 py-14 sm:py-24">
        <div class="mb-8 sm:mb-14 text-center">
          <span
            class="mb-3 inline-block rounded-full bg-accent-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-700"
            >Why Us</span
          >
          <h2 class="mt-4 font-display text-2xl sm:text-4xl font-bold text-default">
            Why Choose Circuit Breaker Sales
          </h2>
          <p class="mt-3 text-base sm:text-lg text-muted">
            Industry-leading expertise backed by Group CBS
          </p>
        </div>

        <div class="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="feature-card rounded-2xl bg-elevated p-5 sm:p-8 border border-default shadow-sm"
          >
            <div
              class="icon-wrap mb-3 sm:mb-5 flex size-10 sm:size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600"
            >
              <UIcon :name="feature.icon" class="size-5 sm:size-6" />
            </div>
            <h3 class="mb-1.5 sm:mb-2 font-display text-lg sm:text-xl font-bold text-default">
              {{ feature.title }}
            </h3>
            <p class="text-sm sm:text-base leading-relaxed text-muted">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════ CTA Section ═══════ -->
    <section class="bg-default py-14 sm:py-24">
      <div class="mx-auto max-w-7xl px-4">
        <div class="cta-card rounded-2xl sm:rounded-3xl px-6 py-12 text-center sm:px-16 sm:py-20">
          <span
            class="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70"
            >Get Started</span
          >
          <h2 class="mt-4 mb-4 font-display text-2xl sm:text-3xl font-bold text-white lg:text-5xl">
            Need a Custom Quote?
          </h2>
          <p class="mb-8 sm:mb-10 text-base sm:text-lg text-white/50 max-w-xl mx-auto">
            Our team of experts is ready to help you find the right equipment for your project.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-5">
            <UButton
              to="/contact"
              size="xl"
              color="primary"
              class="font-bold uppercase tracking-wide"
            >
              Contact Our Team
            </UButton>
            <ULink
              to="tel:8002325809"
              class="group flex items-center gap-2 text-base font-bold text-white/60 transition-colors hover:text-white"
            >
              <UIcon
                name="i-lucide-phone"
                class="size-5 text-brand-400 group-hover:text-brand-300 transition-colors"
              />
              800-232-5809
            </ULink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
