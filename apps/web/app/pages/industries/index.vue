<script setup lang="ts">
useSeoMeta({
  title: 'Industries We Serve — Data Centers, Utilities, Manufacturing & More | Circuit Breaker Sales',
  description: 'Circuit Breaker Sales provides electrical equipment and services to data centers, utilities, petrochemical, mining, healthcare, manufacturing, and more.',
})

const industries = [
  { name: 'Data Centers', slug: 'data-centers', icon: 'i-lucide-server-stack', bgClass: 'bg-muted', iconClass: 'text-primary', description: 'Mission-critical power infrastructure for hyperscale, colocation, and enterprise data centers. Redundant systems with guaranteed uptime.', tags: ['Tier III/IV', 'Redundancy', 'UPS Systems'] },
  { name: 'Utilities', slug: 'utilities', icon: 'i-lucide-bolt', bgClass: 'bg-muted', iconClass: 'text-primary', description: 'Transmission and distribution equipment for investor-owned utilities, co-ops, and municipal power authorities.', tags: ['Substations', 'T&D', 'Grid Reliability'] },
  { name: 'Manufacturing', slug: 'manufacturing', icon: 'i-lucide-wrench', bgClass: 'bg-muted', iconClass: 'text-primary', description: 'Industrial power systems for continuous manufacturing, discrete assembly, and process automation environments.', tags: ['Motor Controls', 'Process Power', 'Automation'] },
  { name: 'Healthcare', slug: 'healthcare', icon: 'i-lucide-heart', bgClass: 'bg-muted', iconClass: 'text-primary', description: 'Critical power equipment for hospitals, medical centers, and pharmaceutical facilities where lives depend on reliable electricity.', tags: ['Life Safety', 'Essential Power', 'NEC 517'] },
  { name: 'Oil & Gas', slug: 'oil-gas', icon: 'i-lucide-fire', bgClass: 'bg-muted', iconClass: 'text-primary', description: 'Hazardous area electrical equipment for refineries, pipelines, offshore platforms, and petrochemical processing plants.', tags: ['Hazardous Areas', 'Refineries', 'Offshore'] },
  { name: 'Mining', slug: 'mining', icon: 'i-lucide-box', bgClass: 'bg-zinc-600/10', iconClass: 'text-dimmed', description: 'Rugged electrical distribution equipment for surface and underground mining operations in extreme conditions.', tags: ['MSHA Compliance', 'Heavy Duty', 'Remote Sites'] },
]

const capabilities = [
  { title: '24/7 Emergency Response', icon: 'i-lucide-checklock', description: 'Round-the-clock availability for emergency equipment needs and field service.', link: '/services/emergency-response' },
  { title: 'Nationwide Coverage', icon: 'i-lucide-map-pin', description: 'Field service teams deployed across the continental United States.', link: '/services/field-services' },
  { title: 'Multi-Brand Expertise', icon: 'i-lucide-wrench', description: 'Certified to work on equipment from all major manufacturers.', link: '/equipment' },
  { title: 'Custom Engineering', icon: 'i-lucide-settings', description: 'In-house engineering for retrofit, modernization, and life extension.', link: '/services/engineered-solutions' },
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
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">Powering Every Sector</span>
        </div>
        <h1 class="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
          Industries <span class="text-brand-500">We Serve</span>
        </h1>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-white/60">
          From mission-critical data centers to remote utility substations, Circuit Breaker Sales
          provides the equipment and expertise these industries depend on for reliable power.
        </p>
        <UButton to="/contact" size="lg" color="primary">Discuss Your Project</UButton>
      </div>
    </section>

    <!-- Industries Grid -->
    <section class="bg-default">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="ind in industries"
            :key="ind.slug"
            :to="`/industries/${ind.slug}`"
            class="group light-card accent-border rounded-xl p-8 transition-all duration-300"
          >
            <div class="mb-4 flex size-12 items-center justify-center rounded-xl" :class="ind.bgClass">
              <UIcon :name="ind.icon" class="size-6" :class="ind.iconClass" />
            </div>
            <h3 class="mb-2 font-display text-lg font-semibold text-default group-hover:text-brand-600 transition-colors">
              {{ ind.name }}
            </h3>
            <p class="mb-4 text-sm leading-relaxed text-dimmed">{{ ind.description }}</p>
            <div class="flex flex-wrap gap-1">
              <span v-for="tag in ind.tags" :key="tag" class="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-dimmed">
                {{ tag }}
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Cross-Industry Capabilities -->
    <section class="bg-muted border-y border-default">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <h2 class="mb-8 font-display text-2xl font-bold text-default">Cross-Industry Capabilities</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink v-for="cap in capabilities" :key="cap.title" :to="cap.link" class="group light-card rounded-xl p-5 transition-all duration-300 hover:border-brand-600/30 hover:shadow-lg hover:shadow-brand-600/5">
            <UIcon :name="cap.icon" class="mb-3 size-5 text-brand-500" />
            <h3 class="mb-1 font-display text-sm font-semibold text-default group-hover:text-brand-600 transition-colors">{{ cap.title }}</h3>
            <p class="text-xs leading-relaxed text-dimmed">{{ cap.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-default">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <div class="rounded-2xl bg-muted p-8 text-center sm:p-12">
          <h2 class="mb-3 font-display text-2xl font-bold text-default">Your Industry, Our Expertise</h2>
          <p class="mb-6 text-dimmed">Tell us about your application — we'll provide the right equipment and service solution.</p>
          <UButton to="/contact" size="lg" color="primary">Contact Our Team</UButton>
        </div>
      </div>
    </section>
  </div>
</template>
