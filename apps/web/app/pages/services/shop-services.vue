<script setup lang="ts">
useSeoMeta({
  description: 'Expert circuit breaker repair, remanufacturing, and reconditioning services. ISO 9001 certified shop with full testing capabilities. One-year warranty on all work.',
  ogDescription: 'Factory-level repair and reconditioning for circuit breakers, switchgear, transformers, and all electrical distribution equipment.',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Electrical Equipment Shop Services',
      provider: { '@type': 'Organization', name: 'Circuit Breaker Sales', url: 'https://circuitbreaker.online' },
      description: 'Professional repair, remanufacturing, and reconditioning of circuit breakers, switchgear, transformers, and electrical distribution equipment to OEM standards.',
      areaServed: 'United States',
      serviceType: ['Equipment Repair', 'Remanufacturing', 'Reconditioning', 'Electrical Testing'],
    }),
  }],
})

const serviceLevels = [
  {
    title: 'Test & Inspect',
    icon: 'i-lucide-search',
    bgClass: 'bg-muted',
    iconClass: 'text-primary',
    description: 'Comprehensive examination to determine what steps are necessary to return equipment to safe operating condition.',
    includes: ['Visual & mechanical evaluation', 'Complete diagnosis report', 'Repair recommendations', 'Parts identification', 'Follow-up service plan'],
  },
  {
    title: 'Recondition',
    icon: 'i-lucide-wrench',
    bgClass: 'bg-muted',
    iconClass: 'text-primary',
    description: 'Partially disassembled, inspected, cleaned, lubricated, and restored to ensure equipment is free of functional defects.',
    includes: ['Partial disassembly & inspection', 'Cleaning & lubrication', 'Mechanical/electrical issue repair', 'Functional defect restoration', 'Performance verification testing'],
  },
  {
    title: 'Remanufacture',
    icon: 'i-lucide-sparkles',
    bgClass: 'bg-brand-600/10',
    iconClass: 'text-brand-400',
    description: 'Fully disassembled, restored or replaced worn components, re-plated and repainted to like-new condition.',
    includes: ['Full disassembly & restoration', 'Component replacement', 'Re-plating & repainting', 'Returned to like-new condition', '1-year parts & labor warranty'],
  },
]

const equipmentTypes = [
  { name: 'Circuit Breakers', slug: 'circuit-breakers', icon: 'i-lucide-bolt', note: 'Low & medium voltage', link: '/equipment/circuit-breakers' },
  { name: 'Switchgear', slug: 'switchgear', icon: 'i-lucide-cpu', note: 'Metal-clad & metal-enclosed', link: '/equipment/switchgear' },
  { name: 'Protective Relays', slug: 'relays', icon: 'i-lucide-shield-check', note: 'All major brands', link: '/equipment/protective-relays' },
  { name: 'Motor Controls', slug: 'motor-controls', icon: 'i-lucide-settings', note: 'Starters & contactors', link: '/equipment/motor-controls' },
  { name: 'Power Transformers', slug: 'transformers', icon: 'i-lucide-arrows-right-left', note: 'Dry type & oil-filled', link: '/equipment/transformers' },
  { name: 'Load Break Switches', slug: 'switches', icon: 'i-lucide-power', note: 'Medium voltage', link: '/equipment/load-break-switches' },
  { name: 'Load Tap Changers', slug: 'ltc', icon: 'i-lucide-sliders-horizontal', note: 'Parts & service', link: '/equipment/load-tap-changers' },
  { name: 'Vacuum Interrupters', slug: 'vi', icon: 'i-lucide-layers', note: 'OEM replacement bottles', link: '/equipment/vacuum-interrupters' },
  { name: 'Renewal Parts', slug: 'parts', icon: 'i-lucide-wrench', note: 'All manufacturers', link: '/products?category=Renewal%20Parts' },
]

const certifications = [
  { name: 'ISO 9001:2008', icon: 'i-lucide-badge-check', description: 'Quality management system certification' },
  { name: 'ISO 14001:2004', icon: 'i-lucide-globe-americas', description: 'Environmental management certification' },
  { name: 'PEARL Member', icon: 'i-lucide-shield-check', description: 'Professional Electrical Apparatus Recycling League' },
  { name: 'NETA Certified', icon: 'i-lucide-globeraduation-cap', description: 'Inter-National Electrical Testing Association' },
  { name: '200kV Impulse Testing', icon: 'i-lucide-bolt', description: 'In-house BIL withstand capability' },
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
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Shop Services</span>
        </div>
        <h1 class="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
          Electrical Equipment <span class="text-brand-500">Repair & Reconditioning</span>
        </h1>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-white/60">
          Our factory-trained technicians professionally repair, remanufacture, and recondition your
          electrical equipment to OEM and industry standards — backed by comprehensive testing and a full warranty.
        </p>
        <UButton to="/contact" size="lg" color="primary">Get a Service Quote</UButton>
      </div>
    </section>

    <!-- Service Levels -->
    <section class="mx-auto max-w-7xl px-4 py-20">
      <div class="mb-12">
        <h2 class="mb-3 font-display text-3xl font-bold text-default">Service Levels</h2>
        <p class="max-w-3xl text-dimmed">We offer multiple service tiers to match your equipment needs and budget. Every level includes full documentation of test results and equipment performance.</p>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <div v-for="level in serviceLevels" :key="level.title" class="light-card accent-border rounded-xl p-8">
          <div class="mb-4 flex size-10 items-center justify-center rounded-lg" :class="level.bgClass">
            <UIcon :name="level.icon" class="size-5" :class="level.iconClass" />
          </div>
          <h3 class="mb-2 font-display text-lg font-semibold text-default">{{ level.title }}</h3>
          <p class="mb-4 text-sm leading-relaxed text-dimmed">{{ level.description }}</p>
          <ul class="space-y-2">
            <li v-for="item in level.includes" :key="item" class="flex items-start gap-2 text-xs text-dimmed">
              <UIcon name="i-lucide-circle-check" class="mt-0.5 size-3.5 shrink-0 text-brand-600" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Equipment We Service -->
    <section class="border-y border-default bg-muted">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <div class="mb-12 text-center">
          <h2 class="mb-3 font-display text-3xl font-bold text-default">Equipment We Service</h2>
          <p class="text-dimmed">Our shop handles all types of electrical power distribution equipment</p>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="equip in equipmentTypes"
            :key="equip.slug"
            :to="equip.link"
            class="light-card rounded-xl p-5 flex items-center gap-4 transition-all hover:border-brand-600/30 hover:shadow-md"
          >
            <div class="flex size-10 items-center justify-center rounded-lg bg-brand-600/10">
              <UIcon :name="equip.icon" class="size-5 text-brand-500" />
            </div>
            <div>
              <h3 class="font-display text-sm font-semibold text-default">{{ equip.name }}</h3>
              <p class="text-xs text-dimmed">{{ equip.note }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Testing & Quality -->
    <section class="mx-auto max-w-7xl px-4 py-20">
      <div class="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 class="mb-4 font-display text-3xl font-bold text-default">Testing & Quality Assurance</h2>
          <div class="space-y-4 text-sm leading-relaxed text-dimmed">
            <p>
              Every piece of equipment processed in our shop undergoes rigorous testing before and after service.
              Our quality assurance program is ISO 9001:2008 certified, and our entire staff — from sales and
              engineering to assembly, test, and shipping — are committed to quality.
            </p>
            <p>
              We maintain full electrical testing capabilities including an in-house 200kV impulse generator
              for BIL withstand testing. All new or remanufactured equipment is covered by a one-year parts
              and labor warranty.
            </p>
            <p>
              Circuit Breaker Sales is also ISO 14001:2004 certified for environmental management, and we
              are a charter member of PEARL — the Professional Electrical Apparatus Recycling League.
            </p>
          </div>
        </div>
        <div class="space-y-4">
          <div v-for="cert in certifications" :key="cert.name" class="light-card rounded-xl p-5 flex items-center gap-4">
            <div class="flex size-10 items-center justify-center rounded-lg bg-brand-600/10">
              <UIcon :name="cert.icon" class="size-5 text-brand-500" />
            </div>
            <div>
              <h3 class="font-display text-sm font-semibold text-default">{{ cert.name }}</h3>
              <p class="text-xs text-dimmed">{{ cert.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mx-auto max-w-7xl px-4 pb-20">
      <div class="rounded-2xl bg-muted p-8 text-center sm:p-12">
        <h2 class="mb-3 font-display text-2xl font-bold text-default">Ready to Service Your Equipment?</h2>
        <p class="mb-6 text-dimmed">Get a free evaluation and repair estimate from our experienced technicians.</p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <UButton to="/contact" size="lg" color="primary">Request Service Quote</UButton>
          <ULink to="tel:8002325809" class="flex items-center gap-2 text-sm font-medium text-dimmed transition-colors hover:text-default">
            <UIcon name="i-lucide-phone" class="size-4 text-brand-500" />
            800-232-5809
          </ULink>
        </div>
      </div>
    </section>
  </div>
</template>
