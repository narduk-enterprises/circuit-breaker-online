<script setup lang="ts">
useSeo({
  title: 'Engineered Solutions — Retrofit & Life Extension | Circuit Breaker Sales',
  description: 'Extend the life of aging electrical equipment with retrofit, retrofill, and modernization solutions. Custom engineering for circuit breaker upgrades, switchgear renovations, and more.',
  ogImage: {
    title: 'Engineered Solutions',
    description: 'Retrofit · Life Extension · Modernization',
    icon: '⚙️',
  },
})

useBreadcrumbSchema([
  { name: 'Home', url: 'https://circuitbreaker.online/' },
  { name: 'Services', url: 'https://circuitbreaker.online/services' },
  { name: 'Engineered Solutions', url: 'https://circuitbreaker.online/services/engineered-solutions' },
])

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Engineered Solutions & Life Extension',
      provider: { '@type': 'Organization', name: 'Circuit Breaker Sales', url: 'https://circuitbreaker.online' },
      description: 'Custom engineering solutions for life extension, retrofit, retrofill, and modernization of aging electrical infrastructure.',
      areaServed: 'United States',
    }),
  }],
})

const solutions = [
  {
    title: 'Circuit Breaker Retrofit',
    icon: 'i-lucide-bolt',
    description: 'Replace obsolete circuit breakers with modern equivalents that fit existing switchgear compartments — no expensive switchgear replacement required.',
    benefits: ['Drop-in replacement designs', 'Modern trip unit technology', 'Improved arc flash protection', 'Significant cost savings vs. new switchgear'],
  },
  {
    title: 'Retrofill Solutions',
    icon: 'i-lucide-cpu',
    description: 'Install new switchgear components into existing enclosures, extending the life of your infrastructure while upgrading protection and control capabilities.',
    benefits: ['Reuse existing enclosures & bus', 'Minimized installation downtime', 'Updated protection schemes', 'Compliance with current standards'],
  },
  {
    title: 'Trip Unit Upgrades',
    icon: 'i-lucide-sparkles',
    description: 'Replace aging solid-state and electromechanical trip units with modern digital trip technology for improved protection and diagnostics.',
    benefits: ['Enhanced protection functions', 'Built-in diagnostics', 'Communication capabilities', 'Better arc flash mitigation'],
  },
  {
    title: 'Custom Bus Fabrication',
    icon: 'i-lucide-wrench',
    description: 'Custom-fabricated bus bars and bus connections designed and manufactured to your exact specifications for new installations or retrofits.',
    benefits: ['Engineered to specification', 'UL-listed materials', 'Fast turnaround available', 'Installation support included'],
  },
]

const processSteps = [
  { title: 'Assessment', description: 'We evaluate your existing equipment, identify opportunities, and document current system conditions.' },
  { title: 'Engineering', description: 'Our engineers design a tailored solution with detailed drawings, specifications, and cost analysis.' },
  { title: 'Fabrication', description: 'Equipment is fabricated and tested in our certified shop facilities before delivery to your site.' },
  { title: 'Installation', description: 'Our field service team installs and commissions the solution, with full testing and documentation.' },
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
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Engineered Solutions</span>
        </div>
        <h1 class="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
          Life Extension & <span class="text-brand-500">Engineered Solutions</span>
        </h1>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-white/60">
          Modernize aging electrical infrastructure with custom engineering solutions that extend equipment
          life, improve reliability, and reduce total cost of ownership.
        </p>
        <UButton to="/contact" size="lg" color="primary">Discuss Your Project</UButton>
      </div>
    </section>

    <!-- Solutions Grid -->
    <section class="mx-auto max-w-7xl px-4 py-20">
      <div class="mb-12">
        <h2 class="mb-3 font-display text-3xl font-bold text-default">Our Engineering Solutions</h2>
        <p class="max-w-3xl text-dimmed">Don't replace your entire system when targeted upgrades can deliver decades of additional service life at a fraction of the cost.</p>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <div v-for="solution in solutions" :key="solution.title" class="light-card accent-border rounded-xl p-8">
          <div class="mb-4 flex size-10 items-center justify-center rounded-lg bg-brand-600/10">
            <UIcon :name="solution.icon" class="size-5 text-brand-500" />
          </div>
          <h3 class="mb-2 font-display text-lg font-semibold text-default">{{ solution.title }}</h3>
          <p class="mb-4 text-sm leading-relaxed text-dimmed">{{ solution.description }}</p>
          <ul class="space-y-1.5">
            <li v-for="item in solution.benefits" :key="item" class="flex items-center gap-2 text-xs text-dimmed">
              <UIcon name="i-lucide-circle-check" class="size-3.5 shrink-0 text-brand-600" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="border-y border-default bg-muted">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <div class="mb-12 text-center">
          <h2 class="mb-3 font-display text-3xl font-bold text-default">Our Engineering Process</h2>
          <p class="text-dimmed">A proven methodology for successful equipment modernization</p>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(step, i) in processSteps" :key="step.title" class="light-card rounded-xl p-6">
            <span class="mb-3 block font-display text-3xl font-bold text-brand-600/30">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="mb-2 font-display text-sm font-semibold text-default">{{ step.title }}</h3>
            <p class="text-xs leading-relaxed text-dimmed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mx-auto max-w-7xl px-4 py-20">
      <div class="rounded-2xl bg-muted p-8 text-center sm:p-12">
        <h2 class="mb-3 font-display text-2xl font-bold text-default">Extend the Life of Your Equipment</h2>
        <p class="mb-6 text-dimmed">Our engineers will evaluate your infrastructure and recommend the most cost-effective modernization strategy.</p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <UButton to="/contact" size="lg" color="primary">Start Your Project</UButton>
          <ULink to="tel:8002325809" class="flex items-center gap-2 text-sm font-medium text-dimmed transition-colors hover:text-default">
            <UIcon name="i-lucide-phone" class="size-4 text-brand-500" />
            800-232-5809
          </ULink>
        </div>
      </div>
    </section>
  </div>
</template>
