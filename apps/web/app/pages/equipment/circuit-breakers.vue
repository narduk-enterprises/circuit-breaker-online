<script setup lang="ts">
useSeo({
  title: 'Low & Medium Voltage Circuit Breakers | Circuit Breaker Sales',
  description: 'Buy new and reconditioned low voltage and medium voltage power circuit breakers. Air, vacuum, SF6 breakers from GE, Westinghouse, Siemens, Cutler-Hammer, Square D, ABB. Tested & certified.',
  keywords: ['circuit breakers', 'power circuit breaker', 'vacuum circuit breaker', 'air circuit breaker', 'medium voltage breaker', 'low voltage breaker'],
  ogImage: { title: 'Circuit Breakers', description: 'Low & Medium Voltage Power Circuit Breakers', icon: '⚡' },
})
useBreadcrumbSchema([
  { name: 'Home', url: 'https://circuitbreaker.online/' },
  { name: 'Equipment', url: 'https://circuitbreaker.online/equipment' },
  { name: 'Circuit Breakers', url: 'https://circuitbreaker.online/equipment/circuit-breakers' },
])
useFAQSchema([
  { question: 'What types of circuit breakers does Circuit Breaker Sales carry?', answer: 'We carry a comprehensive selection including low voltage air circuit breakers, medium voltage vacuum breakers, SF6 circuit breakers, molded case circuit breakers (MCCB), insulated case circuit breakers (ICCB), and motor circuit protectors. Available in drawout and fixed-mount configurations from all major manufacturers.' },
  { question: 'Are reconditioned circuit breakers as reliable as new ones?', answer: 'Yes, when properly reconditioned by factory-trained technicians. Circuit Breaker Sales restores reconditioned breakers to original OEM specifications with complete testing and certification. All reconditioned breakers come with a comprehensive warranty and are tested to ANSI/IEEE standards before shipment.' },
])
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Power Circuit Breakers',
      description: 'New and reconditioned low and medium voltage power circuit breakers from all major manufacturers.',
      brand: { '@type': 'Organization', name: 'Circuit Breaker Sales' },
      category: 'Electrical Equipment > Circuit Breakers',
      offers: { '@type': 'AggregateOffer', availability: 'https://schema.org/InStock', priceCurrency: 'USD' },
    }),
  }],
})

const breakerTypes = [
  { name: 'Low Voltage Air Circuit Breakers', description: 'Drawout power circuit breakers rated 600V and below for switchgear applications.' },
  { name: 'Medium Voltage Vacuum Breakers', description: 'Vacuum interrupter-based breakers for 5kV–38kV switchgear applications.' },
  { name: 'SF6 Circuit Breakers', description: 'Gas-insulated circuit breakers for medium and high voltage applications.' },
  { name: 'Molded Case Circuit Breakers', description: 'MCCB breakers for branch circuit and feeder protection in panelboards and switchboards.' },
  { name: 'Insulated Case Circuit Breakers', description: 'High-performance ICCBs combining MCCB compactness with power breaker capabilities.' },
  { name: 'Motor Circuit Protectors', description: 'Specialized breakers for motor branch circuit protection with magnetic-only trip.' },
]

const brands = ['GE / General Electric', 'Westinghouse / Eaton', 'Siemens', 'Cutler-Hammer', 'Square D', 'ABB', 'ITE', 'Allis-Chalmers', 'Federal Pacific']

const services = [
  'Circuit breaker testing & certification',
  'Remanufacturing to OEM specs',
  'Trip unit replacement & upgrades',
  'Arc flash mitigation modifications',
  'Retrofit & modernization',
  'Emergency sourcing & rush delivery',
]
</script>

<template>
  <div>
    <section class="gradient-industrial hero-grid relative overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-b from-brand-950/20 via-transparent to-transparent" />
      <div class="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div class="mb-4 flex items-center gap-2">
          <NuxtLink to="/equipment" class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-500 hover:text-brand-400">Equipment</NuxtLink>
          <UIcon name="i-lucide-chevron-right" class="size-3 text-white/70" />
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Circuit Breakers</span>
        </div>
        <h1 class="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
          Low & Medium Voltage <span class="text-brand-500">Circuit Breakers</span>
        </h1>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-white/60">
          The largest independent inventory of new and reconditioned power circuit breakers in North America.
          Air, vacuum, and SF6 circuit breakers from all major manufacturers — tested, certified, and ready to ship.
        </p>
        <div class="flex flex-wrap gap-4">
          <UButton to="/products/category/circuit-breakers" size="lg" color="primary">Browse Circuit Breakers</UButton>
          <UButton to="/contact" size="lg" variant="outline" color="neutral">Request a Quote</UButton>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-20">
      <div class="grid gap-12 lg:grid-cols-3">
        <div class="lg:col-span-2 space-y-8">
          <div class="light-card rounded-xl p-8">
            <h2 class="mb-4 font-display text-xl font-semibold text-default">Types of Circuit Breakers</h2>
            <div class="space-y-4 text-sm leading-relaxed text-dimmed">
              <p>Circuit Breaker Sales carries a comprehensive selection of power circuit breakers for both low voltage (600V and below) and medium voltage (5kV–38kV) applications. We stock air circuit breakers, vacuum circuit breakers, and SF6 circuit breakers in drawout and fixed-mount configurations.</p>
              <p>Our inventory includes molded case circuit breakers (MCCB), insulated case circuit breakers (ICCB), and power circuit breakers from all major manufacturers. Whether you need a single replacement breaker or a complete lineup, we have you covered.</p>
            </div>
          </div>

          <div>
            <h2 class="mb-6 font-display text-xl font-semibold text-default">Breaker Types We Carry</h2>
            <div class="grid gap-4 sm:grid-cols-2">
              <div v-for="type in breakerTypes" :key="type.name" class="light-card rounded-xl p-5">
                <h3 class="mb-1 font-display text-sm font-semibold text-default">{{ type.name }}</h3>
                <p class="text-xs leading-relaxed text-dimmed">{{ type.description }}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 class="mb-6 font-display text-xl font-semibold text-default">Popular Circuit Breaker Brands</h2>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div v-for="brand in brands" :key="brand" class="light-card rounded-lg p-3 text-center">
                <span class="text-sm font-medium text-muted">{{ brand }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="light-card border-brand-600/20 rounded-xl p-6">
            <h3 class="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-brand-500">Our Services</h3>
            <ul class="space-y-2.5 text-sm text-muted">
              <li v-for="service in services" :key="service" class="flex items-start gap-2">
                <UIcon name="i-lucide-circle-check" class="mt-0.5 size-4 shrink-0 text-brand-500" />
                <span>{{ service }}</span>
              </li>
            </ul>
            <UButton to="/services/shop-services" color="primary" block class="mt-6" size="sm">View Shop Services</UButton>
          </div>

          <div class="light-card rounded-xl p-6">
            <h3 class="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-brand-500">Need Help?</h3>
            <p class="mb-4 text-sm text-dimmed">Our engineers can help you identify the right circuit breaker for your application.</p>
            <div class="space-y-2 text-sm text-muted">
              <ULink to="tel:8002325809" class="flex items-center gap-2 hover:text-brand-600"><UIcon name="i-lucide-phone" class="size-4 text-brand-600" />800-232-5809</ULink>
              <ULink to="mailto:sales@circuitbreaker.com" class="flex items-center gap-2 hover:text-brand-600"><UIcon name="i-lucide-mail" class="size-4 text-brand-600" />sales@circuitbreaker.com</ULink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 pb-20">
      <div class="rounded-2xl bg-muted p-8 text-center sm:p-12">
        <h2 class="mb-3 font-display text-2xl font-bold text-default">Need a Circuit Breaker Quote?</h2>
        <p class="mb-6 text-dimmed">Tell us the make, model, and voltage class — we'll find it fast.</p>
        <UButton to="/contact" size="lg" color="primary">Get a Quote</UButton>
      </div>
    </section>
  </div>
</template>
