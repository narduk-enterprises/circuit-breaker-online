<script setup lang="ts">
useSeo({
  title: '24/7 Emergency Electrical Service — Rapid Deployment | Circuit Breaker Sales',
  description:
    'Emergency circuit breaker and switchgear repair available 24/7. Rapid deployment nationwide with mobile workshop capabilities and access to the largest independent equipment inventory.',
  ogImage: {
    title: '24/7 Emergency Response',
    description: 'Rapid Deployment · Mobile Workshops · Nationwide',
    icon: '🚨',
  },
})

useBreadcrumbSchema([
  { name: 'Home', url: 'https://circuitbreaker.online/' },
  { name: 'Services', url: 'https://circuitbreaker.online/services' },
  { name: 'Emergency Response', url: 'https://circuitbreaker.online/services/emergency-response' },
])

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: '24/7 Emergency Electrical Equipment Service',
        provider: {
          '@type': 'Organization',
          name: 'Circuit Breaker Sales',
          url: 'https://circuitbreaker.online',
          telephone: '800-232-5809',
        },
        description:
          'Round-the-clock emergency response for electrical equipment failure including circuit breakers, switchgear, and transformers. Rapid deployment nationwide.',
        areaServed: 'United States',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      }),
    },
  ],
})

const capabilities = [
  {
    title: 'Rapid Deployment',
    icon: 'i-lucide-truck',
    description:
      'Field crews mobilized within hours, not days. Multiple shop locations across the U.S. ensure fast response times.',
  },
  {
    title: 'Mobile Workshops',
    icon: 'i-lucide-wrench',
    description:
      'Fully equipped mobile workshops can perform on-site testing, repair, and reconditioning at your facility.',
  },
  {
    title: 'Equipment Sourcing',
    icon: 'i-lucide-search',
    description:
      'Access to the largest independent inventory of circuit breakers, switchgear, and replacement parts in the country.',
  },
  {
    title: 'Temporary Equipment',
    icon: 'i-lucide-refresh-cw',
    description:
      'Temporary replacement equipment available to keep your operations running while permanent repairs are underway.',
  },
  {
    title: 'Storm & Disaster Recovery',
    icon: 'i-lucide-cloud',
    description:
      'Experienced in hurricane, flood, and natural disaster recovery for electrical infrastructure. Proven track record.',
  },
  {
    title: 'After-Hours Support',
    icon: 'i-lucide-moon',
    description:
      'Our emergency hotline is staffed 24 hours a day, 7 days a week, 365 days a year. We never close.',
  },
]

const steps = [
  { title: 'Call Us', description: 'Contact our 24/7 hotline at 800-232-5809' },
  { title: 'Assessment', description: 'We assess the situation and mobilize a response' },
  { title: 'Deploy', description: 'Technicians and equipment dispatched to your site' },
  { title: 'Restore', description: 'Equipment repaired or replaced to get you running' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="gradient-industrial hero-grid relative overflow-hidden">
      <div
        class="absolute inset-0 bg-linear-to-b from-brand-950/20 via-transparent to-transparent"
      />
      <div class="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div class="mb-4 flex items-center gap-2">
          <NuxtLink
            to="/services"
            class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-500 hover:text-brand-400"
            >Services</NuxtLink
          >
          <UIcon name="i-lucide-chevron-right" class="size-3 text-white/70" />
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/60"
            >Emergency Response</span
          >
        </div>
        <h1
          class="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl"
        >
          <span class="text-brand-500">24/7</span> Emergency Response
        </h1>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-white/60">
          When electrical equipment fails, every minute counts. Our emergency response teams are
          available around the clock with rapid deployment capabilities and access to the largest
          independent equipment inventory in the country.
        </p>
        <div class="flex flex-wrap gap-4">
          <UButton href="tel:8002325809" size="lg" color="primary">
            <template #leading><UIcon name="i-lucide-phone" class="size-4" /></template>
            Call Now: 800-232-5809
          </UButton>
          <UButton to="/contact" size="lg" variant="outline" color="neutral"
            >Request Emergency Service</UButton
          >
        </div>
      </div>
    </section>

    <!-- What We Provide -->
    <section class="mx-auto max-w-7xl px-4 py-20">
      <div class="mb-12">
        <h2 class="mb-3 font-display text-3xl font-bold text-default">Emergency Capabilities</h2>
        <p class="max-w-3xl text-dimmed">
          When disaster strikes, CBS delivers the speed, expertise, and equipment inventory to get
          you back online fast.
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="capability in capabilities"
          :key="capability.title"
          class="light-card rounded-xl p-6"
        >
          <div class="mb-4 flex size-10 items-center justify-center rounded-lg bg-muted">
            <UIcon :name="capability.icon" class="size-5 text-primary" />
          </div>
          <h3 class="mb-2 font-display text-base font-semibold text-default">
            {{ capability.title }}
          </h3>
          <p class="text-sm leading-relaxed text-dimmed">{{ capability.description }}</p>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="border-y border-default bg-muted">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <div class="mb-12 text-center">
          <h2 class="mb-3 font-display text-3xl font-bold text-default">
            How Emergency Response Works
          </h2>
        </div>
        <div class="mx-auto grid max-w-4xl gap-6 lg:grid-cols-4">
          <div
            v-for="(step, i) in steps"
            :key="step.title"
            class="light-card rounded-xl p-6 text-center"
          >
            <div
              class="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-brand-600 font-display text-lg font-bold text-default"
            >
              {{ i + 1 }}
            </div>
            <h3 class="mb-1 font-display text-sm font-semibold text-default">{{ step.title }}</h3>
            <p class="text-xs text-dimmed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Emergency CTA -->
    <section class="mx-auto max-w-7xl px-4 py-20">
      <div class="rounded-2xl border border-primary bg-muted p-8 text-center sm:p-12">
        <div class="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
          <UIcon name="i-lucide-fire" class="size-7 text-primary" />
        </div>
        <h2 class="mb-3 font-display text-2xl font-bold text-default sm:text-3xl">
          Experiencing an Emergency?
        </h2>
        <p class="mb-6 text-dimmed">
          Don't wait — call our emergency hotline now. We'll have a team mobilized and a plan in
          motion fast.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <UButton href="tel:8002325809" size="lg" color="primary">
            <template #leading><UIcon name="i-lucide-phone" class="size-4" /></template>
            800-232-5809
          </UButton>
          <UButton
            href="mailto:sales@circuitbreaker.com"
            size="lg"
            variant="outline"
            color="neutral"
          >
            <template #leading><UIcon name="i-lucide-envelope" class="size-4" /></template>
            Email Emergency Team
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
