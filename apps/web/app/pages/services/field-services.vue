<script setup lang="ts">
useSeoMeta({
  description: 'NETA-certified on-site field services for circuit breaker testing, switchgear maintenance, installation, and emergency repair. Available nationwide with rapid deployment.',
  ogDescription: 'NETA-certified technicians for on-site electrical equipment testing, maintenance, and repair at your facility.',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'On-Site Field Services',
      provider: { '@type': 'Organization', name: 'Circuit Breaker Sales', url: 'https://circuitbreaker.online' },
      description: 'NETA-certified on-site electrical equipment testing, maintenance, installation, and repair services available nationwide.',
      areaServed: 'United States',
      serviceType: ['Electrical Testing', 'Preventive Maintenance', 'Equipment Installation', 'Emergency Repair'],
    }),
  }],
})

const fieldServices = [
  { title: 'Circuit Breaker Testing', icon: 'i-lucide-bolt', description: 'Full diagnostic testing of low and medium voltage circuit breakers including timing, contact resistance, and insulation resistance.' },
  { title: 'Switchgear Maintenance', icon: 'i-lucide-checkpu', description: 'Preventive maintenance and testing of metal-clad and metal-enclosed switchgear to OEM specifications and NETA standards.' },
  { title: 'Equipment Installation', icon: 'i-lucide-wrench', description: 'Professional installation and commissioning of new and reconditioned circuit breakers, switchgear, and substation equipment.' },
  { title: 'Protective Relay Testing', icon: 'i-lucide-shield-check', description: 'Comprehensive relay testing, calibration, and coordination studies for electromechanical and digital protective relays.' },
  { title: 'Arc Flash Studies', icon: 'i-lucide-fire', description: 'IEEE 1584-compliant arc flash hazard analysis, labeling, and mitigation recommendations for your electrical system.' },
  { title: 'Infrared Thermography', icon: 'i-lucide-checkamera', description: 'Non-intrusive infrared scanning to identify hot spots, loose connections, and potential failures before they cause downtime.' },
]

const industries = [
  { name: 'Data Centers', icon: 'i-lucide-server-stack', link: '/industries/data-centers' },
  { name: 'Utilities', icon: 'i-lucide-bolt', link: '/industries/utilities' },
  { name: 'Manufacturing', icon: 'i-lucide-building-2', link: '/industries' },
  { name: 'Healthcare', icon: 'i-lucide-heart', link: '/industries' },
]

const safetyItems = [
  { title: 'OSHA Compliant', icon: 'i-lucide-shield-check' },
  { title: 'NFPA 70E', icon: 'i-lucide-fire' },
  { title: 'Full PPE', icon: 'i-lucide-user' },
  { title: 'Job Hazard Analysis', icon: 'i-lucide-checklipboard-check' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="gradient-industrial hero-grid relative overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-b from-brand-950/20 via-transparent to-transparent" />
      <div class="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div class="mb-4 flex items-center gap-2">
          <NuxtLink to="/services" class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-500 hover:text-brand-400">Services</NuxtLink>
          <UIcon name="i-lucide-chevron-right" class="size-3 text-white/70" />
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Field Services</span>
        </div>
        <h1 class="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
          On-Site <span class="text-brand-500">Field Services</span>
        </h1>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-white/60">
          NETA-certified engineers and technicians provide comprehensive on-site testing,
          maintenance, installation, and repair services at your facility — anywhere in the United States.
        </p>
        <UButton to="/contact" size="lg" color="primary">Schedule Field Service</UButton>
      </div>
    </section>

    <!-- Field Service Offerings -->
    <section class="mx-auto max-w-7xl px-4 py-20">
      <div class="mb-12">
        <h2 class="mb-3 font-display text-3xl font-bold text-default">What We Do On-Site</h2>
        <p class="max-w-3xl text-dimmed">Our field service teams come to you, minimizing downtime and getting your equipment back in service fast.</p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="service in fieldServices" :key="service.title" class="light-card rounded-xl p-6">
          <div class="mb-4 flex size-10 items-center justify-center rounded-lg bg-brand-600/10">
            <UIcon :name="service.icon" class="size-5 text-brand-500" />
          </div>
          <h3 class="mb-2 font-display text-base font-semibold text-default">{{ service.title }}</h3>
          <p class="text-sm leading-relaxed text-dimmed">{{ service.description }}</p>
        </div>
      </div>
    </section>

    <!-- Industries Served -->
    <section class="border-y border-default bg-muted">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <div class="mb-12 text-center">
          <h2 class="mb-3 font-display text-3xl font-bold text-default">Industries We Serve</h2>
          <p class="text-dimmed">Our field service crews have deep experience across a wide range of critical industries</p>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="industry in industries"
            :key="industry.name"
            :to="industry.link"
            class="light-card rounded-xl p-5 text-center transition-all hover:border-brand-600/30 hover:shadow-md"
          >
            <div class="mx-auto mb-3 flex size-10 items-center justify-center rounded-lg bg-brand-600/10">
              <UIcon :name="industry.icon" class="size-5 text-brand-500" />
            </div>
            <h3 class="font-display text-sm font-semibold text-default">{{ industry.name }}</h3>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Safety & Compliance -->
    <section class="mx-auto max-w-7xl px-4 py-20">
      <div class="grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <h2 class="mb-4 font-display text-3xl font-bold text-default">Safety First, Every Time</h2>
          <div class="space-y-4 text-sm leading-relaxed text-dimmed">
            <p>
              Safety is the cornerstone of every field service engagement. Our technicians follow strict
              OSHA, NFPA 70E, and NETA protocols to ensure work is performed safely and in compliance
              with all applicable codes and standards.
            </p>
            <p>
              Every field service project includes a comprehensive safety briefing, job hazard analysis,
              and PPE requirements review. We carry full insurance coverage and can provide certificates
              of insurance upon request.
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="safety in safetyItems" :key="safety.title" class="light-card rounded-xl p-5 text-center">
            <div class="mx-auto mb-2 flex size-9 items-center justify-center rounded-lg bg-brand-600/10">
              <UIcon :name="safety.icon" class="size-4 text-brand-500" />
            </div>
            <h3 class="font-display text-xs font-semibold text-default">{{ safety.title }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mx-auto max-w-7xl px-4 pb-20">
      <div class="rounded-2xl bg-muted p-8 text-center sm:p-12">
        <h2 class="mb-3 font-display text-2xl font-bold text-default">Schedule On-Site Service</h2>
        <p class="mb-6 text-dimmed">Our field service teams are ready to deploy to your facility nationwide.</p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <UButton to="/contact" size="lg" color="primary">Request Field Service</UButton>
          <ULink to="tel:8002325809" class="flex items-center gap-2 text-sm font-medium text-dimmed transition-colors hover:text-default">
            <UIcon name="i-lucide-phone" class="size-4 text-brand-500" />
            800-232-5809
          </ULink>
        </div>
      </div>
    </section>
  </div>
</template>
