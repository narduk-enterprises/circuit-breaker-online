<script setup lang="ts">
useSeoMeta({
  title: 'Utility & Transmission Power Equipment | Circuit Breaker Sales',
  description: 'Substation equipment, circuit breakers, switchgear, and protective relays for electric utilities. Expert field services and emergency storm damage support.',
})
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: 'Utility Power Equipment & Services', provider: { '@type': 'Organization', name: 'Circuit Breaker Sales' }, areaServed: 'US', description: 'Substation equipment, parts, and services for electric utility transmission and distribution systems.' }) }] })

const solutions = [
  { title: 'Substation Breakers', icon: 'i-lucide-bolt', description: 'Medium voltage circuit breakers for substation switching and protection applications.' },
  { title: 'Recloser Components', icon: 'i-lucide-refresh-cw', description: 'Replacement parts and controls for distribution reclosers and sectionalizers.' },
  { title: 'Power Transformers', icon: 'i-lucide-arrow-rightrrows-right-left', description: 'Substation transformers, regulators, and load tap changer service.' },
  { title: 'Relay & Protection', icon: 'i-lucide-shield-check', description: 'Protective relays, CTs, PTs, and protection system upgrades.' },
]

const services = [
  'Substation maintenance programs',
  'Emergency storm restoration',
  'Circuit breaker testing & overhaul',
  'Relay testing & commissioning',
  'Load tap changer service',
  'Transformer oil testing',
  'Retrofill & modernization',
  'Engineering assessments',
]
</script>

<template>
  <div>
    <section class="gradient-industrial hero-grid relative overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-b from-brand-950/20 via-transparent to-transparent" />
      <div class="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div class="mb-4 flex items-center gap-2">
          <NuxtLink to="/industries" class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-500 hover:text-brand-400">Industries</NuxtLink>
          <UIcon name="i-lucide-chevron-right" class="size-3 text-white/70" />
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Utilities</span>
        </div>
        <h1 class="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
          Utility & Transmission <span class="text-brand-500">Power Equipment</span>
        </h1>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-white/70">
          Supporting investor-owned utilities, municipal power authorities, and rural electric cooperatives
          with reliable substation equipment, spare parts, and expert field services.
        </p>
        <UButton to="/contact" size="lg" color="primary">Discuss Utility Equipment Needs</UButton>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-20">
      <div class="grid gap-12 lg:grid-cols-3">
        <div class="lg:col-span-2 space-y-8">
          <div class="light-card rounded-xl p-8">
            <h2 class="mb-4 font-display text-xl font-semibold text-default">Utility Equipment Expertise</h2>
            <div class="space-y-4 text-sm leading-relaxed text-muted">
              <p>Electric utilities face unique challenges: aging infrastructure, increasing demand, stricter reliability requirements, and limited capital budgets. Circuit Breaker Sales helps utilities maintain grid reliability by providing cost-effective replacement equipment and life-extension services for substation and distribution systems.</p>
              <p>With decades of experience serving the utility sector, our team understands NERC reliability standards, RUS specifications, and the critical importance of keeping the lights on. We can source hard-to-find parts for legacy equipment that is no longer manufactured.</p>
            </div>
          </div>

          <div>
            <h2 class="mb-6 font-display text-xl font-semibold text-default">Utility Equipment Solutions</h2>
            <div class="grid gap-4 sm:grid-cols-2">
              <div v-for="sol in solutions" :key="sol.title" class="light-card rounded-xl p-5">
                <UIcon :name="sol.icon" class="mb-2 size-5 text-primary" />
                <h3 class="mb-1 font-display text-sm font-semibold text-default">{{ sol.title }}</h3>
                <p class="text-xs leading-relaxed text-dimmed">{{ sol.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="light-card border-default rounded-xl p-6">
            <h3 class="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-primary">Utility Services</h3>
            <ul class="space-y-2.5 text-sm text-muted">
              <li v-for="s in services" :key="s" class="flex items-start gap-2">
                <UIcon name="i-lucide-circle-check-circle" class="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{{ s }}</span>
              </li>
            </ul>
          </div>
          <div class="light-card rounded-xl p-6">
            <h3 class="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-brand-500">Emergency Support</h3>
            <p class="mb-4 text-sm text-dimmed">Storm damage? Equipment failure? Our emergency team is available around the clock.</p>
            <ULink to="tel:8002325809" class="flex items-center gap-2 text-sm font-medium text-default hover:text-brand-500"><UIcon name="i-lucide-phone" class="size-4 text-brand-500" />800-232-5809</ULink>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 pb-20">
      <div class="rounded-2xl bg-muted p-8 text-center sm:p-12">
        <h2 class="mb-3 font-display text-2xl font-bold text-default">Partner with CBS for Grid Reliability</h2>
        <p class="mb-6 text-dimmed">From spare parts to complete substation refurbishment — we're your utility equipment partner.</p>
        <UButton to="/contact" size="lg" color="primary">Contact Us</UButton>
      </div>
    </section>
  </div>
</template>
