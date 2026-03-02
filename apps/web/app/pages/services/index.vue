<script setup lang="ts">
useSeoMeta({
  description: 'Complete electrical equipment services including shop repair, field services, remanufacturing, reconditioning, life extension, and 24/7 emergency response from Circuit Breaker Sales.',
  ogDescription: 'Full life-cycle services for circuit breakers, switchgear, transformers, and power distribution equipment. ISO 9001 certified.',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Electrical Equipment Services',
      provider: {
        '@type': 'Organization',
        name: 'Circuit Breaker Sales',
        url: 'https://circuitbreaker.online',
      },
      description: 'Complete life-cycle services for electrical power distribution equipment including repair, remanufacturing, field services, and emergency response.',
      areaServed: 'United States',
      serviceType: ['Equipment Repair', 'Remanufacturing', 'Field Services', 'Emergency Response'],
    }),
  }],
})

const services = [
  {
    title: 'Shop Services',
    slug: '/services/shop-services',
    icon: 'i-lucide-wrench',
    description: 'Factory-level repair, remanufacturing, and reconditioning of circuit breakers, switchgear, transformers, and all types of electrical distribution equipment.',
    highlights: ['Remanufacturing to OEM specs', 'Full electrical testing', 'One-year warranty on all work', 'ISO 9001 quality assurance'],
  },
  {
    title: 'Field Services',
    slug: '/services/field-services',
    icon: 'i-lucide-truck',
    description: 'NETA-certified technicians provide on-site installation, maintenance, testing, and repair services at your facility anywhere in the U.S.',
    highlights: ['NETA-certified technicians', 'Preventive maintenance programs', 'Switchgear installation', 'Arc flash studies'],
  },
  {
    title: 'Engineered Solutions',
    slug: '/services/engineered-solutions',
    icon: 'i-lucide-checkalculator',
    description: 'Custom engineering solutions for life extension, retrofit, retrofill, and modernization of aging electrical infrastructure.',
    highlights: ['Life extension programs', 'Retrofit & retrofill', 'Circuit breaker modernization', 'Custom bus fabrication'],
  },
  {
    title: 'Emergency Response',
    slug: '/services/emergency-response',
    icon: 'i-lucide-fire',
    description: 'Rapid deployment for emergency electrical equipment failure. 24/7 availability with mobile workshop capabilities for critical situations.',
    highlights: ['24/7 availability', 'Rapid deployment nationwide', 'Mobile workshop capability', 'Emergency equipment sourcing'],
  },
]

const reasons = [
  { stat: '40+', title: 'Years Experience', description: 'Decades of hands-on expertise' },
  { stat: 'ISO', title: '9001 Certified', description: 'Quality management assured' },
  { stat: '24/7', title: 'Emergency Support', description: 'Always available when you need us' },
  { stat: 'NETA', title: 'Certified Techs', description: 'Industry-leading qualifications' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="gradient-industrial hero-grid relative overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-b from-brand-950/20 via-transparent to-transparent" />
      <div class="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:pb-24 sm:pt-28">
        <div class="mb-4 flex items-center gap-2">
          <div class="h-px w-8 bg-brand-600" />
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">Complete Life Cycle Solutions</span>
        </div>
        <h1 class="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
          Expert Electrical Equipment <span class="text-brand-500">Services</span>
        </h1>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-white/60">
          From emergency field repairs to complete remanufacturing, Circuit Breaker Sales delivers
          full life-cycle support for your electrical power distribution systems.
        </p>
        <div class="flex flex-wrap gap-4">
          <UButton to="/contact" size="lg" color="primary">Request a Service Quote</UButton>
          <UButton href="tel:8002325809" size="lg" variant="outline" color="neutral">
            <template #leading><UIcon name="i-lucide-phone" class="size-4" /></template>
            800-232-5809
          </UButton>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="bg-default">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <div class="mb-12 text-center">
          <h2 class="mb-3 font-display text-3xl font-bold text-default">Our Service Offerings</h2>
          <p class="mx-auto max-w-2xl text-dimmed">
            Circuit Breaker Sales provides a comprehensive suite of services to keep your electrical
            infrastructure operating safely and reliably.
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <NuxtLink
            v-for="service in services"
            :key="service.slug"
            :to="service.slug"
            class="group light-card accent-border rounded-xl p-8 transition-all duration-300"
          >
            <div class="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand-600/10">
              <UIcon :name="service.icon" class="size-6 text-brand-500" />
            </div>
            <h3 class="mb-2 font-display text-xl font-semibold text-default group-hover:text-brand-600 transition-colors">
              {{ service.title }}
            </h3>
            <p class="mb-4 text-sm leading-relaxed text-dimmed">{{ service.description }}</p>
            <ul class="space-y-1.5">
              <li v-for="item in service.highlights" :key="item" class="flex items-center gap-2 text-xs text-dimmed">
                <UIcon name="i-lucide-circle-check" class="size-3.5 shrink-0 text-brand-600" />
                {{ item }}
              </li>
            </ul>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why CBS for Services -->
    <section class="bg-muted border-y border-default">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <div class="mb-12 text-center">
          <h2 class="mb-3 font-display text-3xl font-bold text-default">Why Choose CBS Services</h2>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="reason in reasons" :key="reason.title" class="light-card rounded-xl p-6 text-center">
            <p class="mb-2 font-display text-3xl font-bold text-brand-600">{{ reason.stat }}</p>
            <h3 class="mb-1 font-display text-sm font-semibold text-default">{{ reason.title }}</h3>
            <p class="text-xs text-dimmed">{{ reason.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-default">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <div class="rounded-2xl bg-muted p-8 text-center sm:p-12">
          <h2 class="mb-3 font-display text-2xl font-bold text-default sm:text-3xl">Need Emergency Service?</h2>
          <p class="mb-6 text-dimmed">Our technicians are available 24/7 for emergency electrical equipment repair and replacement.</p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <UButton to="/services/emergency-response" size="lg" color="primary">Emergency Services</UButton>
            <UButton to="/contact" size="lg" variant="outline" color="neutral">Schedule Service</UButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
