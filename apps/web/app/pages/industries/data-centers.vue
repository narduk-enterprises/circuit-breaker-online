<script setup lang="ts">
useSeo({
  title: 'Data Center Power Equipment & Services | Circuit Breaker Sales',
  description:
    'Mission-critical electrical equipment for data centers. Circuit breakers, switchgear, and UPS components with 24/7 emergency support for Tier III & IV facilities.',
  keywords: [
    'data center power',
    'critical power',
    'UPS switchgear',
    'PDU components',
    'Tier IV data center',
  ],
  ogImage: {
    title: 'Data Centers',
    description: 'Mission-Critical Power Infrastructure',
    icon: '🏢',
  },
})
useBreadcrumbSchema([
  { name: 'Home', url: 'https://circuitbreaker.online/' },
  { name: 'Industries', url: 'https://circuitbreaker.online/industries' },
  { name: 'Data Centers', url: 'https://circuitbreaker.online/industries/data-centers' },
])
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Data Center Power Equipment & Services',
        provider: { '@type': 'Organization', name: 'Circuit Breaker Sales' },
        areaServed: 'US',
        description:
          'Mission-critical electrical equipment and services for data center power infrastructure.',
      }),
    },
  ],
})

const solutions = [
  {
    title: 'Critical Power Breakers',
    icon: 'i-lucide-bolt',
    description:
      'Redundant circuit breakers for UPS output, generator, utility, and static transfer switch applications.',
  },
  {
    title: 'PDU Switchgear',
    icon: 'i-lucide-cpu',
    description: 'Power distribution unit switchgear and components for A+B feed architectures.',
  },
  {
    title: 'ATS Components',
    icon: 'i-lucide-arrows-right-left',
    description:
      'Automatic transfer switch components and replacement parts for seamless power transitions.',
  },
  {
    title: 'Protective Relays',
    icon: 'i-lucide-shield-check',
    description:
      'Digital protective relays for generator, transformer, and bus differential protection.',
  },
]

const standards = [
  'Uptime Institute Tier III/IV',
  'NFPA 70 / NEC',
  'NFPA 110',
  'IEEE 493 (Gold Book)',
  'ASHRAE TC 9.9',
  'SOC 2 Compliance Support',
]

const services = [
  '24/7 emergency procurement',
  'Preventive maintenance programs',
  'Arc flash hazard mitigation',
  'Circuit breaker testing & certification',
  'Switchgear retrofill programs',
  'On-site field services',
  'Engineering assessments',
  'Remote racking solutions',
]
</script>

<template>
  <div>
    <section class="gradient-industrial hero-grid relative overflow-hidden">
      <div
        class="absolute inset-0 bg-linear-to-b from-brand-950/20 via-transparent to-transparent"
      />
      <div class="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div class="mb-4 flex items-center gap-2">
          <NuxtLink
            to="/industries"
            class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-500 hover:text-brand-400"
            >Industries</NuxtLink
          >
          <UIcon name="i-lucide-chevron-right" class="size-3 text-white/70" />
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/60"
            >Data Centers</span
          >
        </div>
        <h1
          class="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl"
        >
          Data Center <span class="text-brand-500">Power Infrastructure</span>
        </h1>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-white/70">
          Mission-critical power distribution equipment for hyperscale, colocation, and enterprise
          data centers. When every second of uptime matters, Circuit Breaker Sales delivers the
          reliability you need.
        </p>
        <div class="flex flex-wrap gap-4">
          <UButton to="/contact" size="lg" color="primary"
            >Discuss Your Data Center Project</UButton
          >
          <UButton to="/services/emergency-response" size="lg" variant="outline" color="neutral"
            >24/7 Emergency Support</UButton
          >
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-20">
      <div class="grid gap-12 lg:grid-cols-3">
        <div class="lg:col-span-2 space-y-8">
          <div class="light-card rounded-xl p-8">
            <h2 class="mb-4 font-display text-xl font-semibold text-default">
              Why Data Centers Choose CBS
            </h2>
            <div class="space-y-4 text-sm leading-relaxed text-muted">
              <p>
                Data centers require the highest levels of power reliability. A single electrical
                failure can cause millions of dollars in losses and SLA penalties. Circuit Breaker
                Sales understands these stakes — we provide equipment and services specifically
                tailored for Tier III and Tier IV data center environments.
              </p>
              <p>
                Our inventory includes the exact replacement parts and breakers that data center
                operators need to maintain redundancy. With 24/7 emergency response and nationwide
                field service, we can have a technician or replacement breaker on-site fast —
                minimizing any impact to your operations.
              </p>
            </div>
          </div>

          <div>
            <h2 class="mb-6 font-display text-xl font-semibold text-default">
              Data Center Equipment Solutions
            </h2>
            <div class="grid gap-4 sm:grid-cols-2">
              <div v-for="sol in solutions" :key="sol.title" class="light-card rounded-xl p-5">
                <UIcon :name="sol.icon" class="mb-2 size-5 text-primary" />
                <h3 class="mb-1 font-display text-sm font-semibold text-default">
                  {{ sol.title }}
                </h3>
                <p class="text-xs leading-relaxed text-dimmed">{{ sol.description }}</p>
              </div>
            </div>
          </div>

          <div class="light-card rounded-xl p-8">
            <h2 class="mb-4 font-display text-xl font-semibold text-default">
              Compliance & Standards
            </h2>
            <div class="grid gap-3 sm:grid-cols-2">
              <div
                v-for="std in standards"
                :key="std"
                class="flex items-center gap-2 text-sm text-muted"
              >
                <UIcon name="i-lucide-shield-check" class="size-4 shrink-0 text-brand-500" />
                {{ std }}
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="light-card border-default rounded-xl p-6">
            <h3
              class="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-primary"
            >
              Data Center Services
            </h3>
            <ul class="space-y-2.5 text-sm text-muted">
              <li v-for="s in services" :key="s" class="flex items-start gap-2">
                <UIcon name="i-lucide-circle-check" class="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{{ s }}</span>
              </li>
            </ul>
          </div>
          <div class="light-card rounded-xl p-6">
            <h3
              class="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-brand-500"
            >
              Rapid Response
            </h3>
            <p class="mb-4 text-sm text-dimmed">
              Emergency equipment needs? Our 24/7 team can source and ship critical parts within
              hours.
            </p>
            <ULink
              to="tel:8002325809"
              class="flex items-center gap-2 text-sm font-medium text-default hover:text-brand-500"
              ><UIcon name="i-lucide-phone" class="size-4 text-brand-500" />800-232-5809</ULink
            >
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 pb-20">
      <div class="rounded-2xl bg-muted p-8 text-center sm:p-12">
        <h2 class="mb-3 font-display text-2xl font-bold text-default">
          Plan Your Data Center Power Infrastructure
        </h2>
        <p class="mb-6 text-dimmed">
          Our engineers specialize in mission-critical power systems. Let's discuss your project.
        </p>
        <UButton to="/contact" size="lg" color="primary">Contact Our Team</UButton>
      </div>
    </section>
  </div>
</template>
