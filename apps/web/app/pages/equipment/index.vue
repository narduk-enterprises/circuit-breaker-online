<script setup lang="ts">
useSeoMeta({
  description: 'Browse our inventory of new and reconditioned circuit breakers, switchgear, transformers, protective relays, and industrial power equipment. All major brands. Tested and certified.',

  ogDescription: 'One of the largest independent inventories of industrial power distribution equipment in North America.',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Electrical Power Equipment',
      description: 'Industrial power distribution equipment including circuit breakers, switchgear, transformers, and more.',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Circuit Breakers', url: 'https://circuitbreaker.online/equipment/circuit-breakers' },
        { '@type': 'ListItem', position: 2, name: 'Switchgear', url: 'https://circuitbreaker.online/equipment/switchgear' },
        { '@type': 'ListItem', position: 3, name: 'Power Transformers', url: 'https://circuitbreaker.online/equipment/transformers' },
        { '@type': 'ListItem', position: 4, name: 'Protective Relays', url: 'https://circuitbreaker.online/equipment/protective-relays' },
        { '@type': 'ListItem', position: 5, name: 'Vacuum Interrupters', url: 'https://circuitbreaker.online/equipment/vacuum-interrupters' },
      ],
    }),
  }],
})

const categories = [
  { name: 'Circuit Breakers', slug: 'circuit-breakers', icon: 'i-lucide-bolt', link: '/equipment/circuit-breakers', description: 'Low and medium voltage power circuit breakers from all major manufacturers. Air, vacuum, and SF6 types available.' },
  { name: 'Switchgear', slug: 'switchgear', icon: 'i-lucide-cpu', link: '/equipment/switchgear', description: 'Metal-clad and metal-enclosed switchgear assemblies and components for utility and industrial applications.' },
  { name: 'Power Transformers', slug: 'transformers', icon: 'i-lucide-arrows-right-left', link: '/equipment/transformers', description: 'Dry-type and liquid-filled distribution and power transformers. Unit substation configurations available.' },
  { name: 'Protective Relays', slug: 'protective-relays', icon: 'i-lucide-shield-check', link: '/equipment/protective-relays', description: 'Electromechanical, solid-state, and digital protective relays for overcurrent, differential, and distance protection.' },
  { name: 'Vacuum Interrupters', slug: 'vacuum-interrupters', icon: 'i-lucide-layers', link: '/equipment/vacuum-interrupters', description: 'OEM and aftermarket vacuum interrupter replacements with predictive testing capabilities.' },
  { name: 'Motor Controls', slug: 'motor-controls', icon: 'i-lucide-settings', link: '/equipment/motor-controls', description: 'Motor control centers, starters, contactors, and associated components for industrial motor applications.' },
  { name: 'Load Tap Changers', slug: 'load-tap-changers', icon: 'i-lucide-sliders-horizontal', link: '/equipment/load-tap-changers', description: 'Load tap changer components, parts, and complete assemblies for transformer voltage regulation.' },
  { name: 'Load Break Switches', slug: 'load-break-switches', icon: 'i-lucide-power', link: '/equipment/load-break-switches', description: 'Medium voltage load break and load interrupter switches for safe isolation of electrical circuits.' },
  { name: 'Remote Racking', slug: 'remote-racking', icon: 'i-lucide-signal', link: '/equipment/remote-racking', description: 'Remote racking and switching systems for safe operation of circuit breakers from outside the arc flash boundary.' },
]

const brands = ['GE', 'Westinghouse', 'Siemens', 'Cutler-Hammer', 'Square D', 'ABB', 'ITE', 'Allis-Chalmers', 'Federal Pacific', 'Eaton', 'Schneider', 'Mitsubishi']

const conditions = [
  { title: 'New', icon: 'i-lucide-sparkles', bgClass: 'bg-muted', iconClass: 'text-primary', description: 'Factory-new equipment with full manufacturer warranty.' },
  { title: 'Remanufactured', icon: 'i-lucide-wrench', bgClass: 'bg-brand-600/10', iconClass: 'text-brand-500', description: 'Fully restored to like-new condition with 1-year warranty.' },
  { title: 'Reconditioned', icon: 'i-lucide-circle-check', bgClass: 'bg-muted', iconClass: 'text-primary', description: 'Tested and repaired for safe, reliable operation.' },
  { title: 'As-Is', icon: 'i-lucide-tag', bgClass: 'bg-zinc-600/10', iconClass: 'text-dimmed', description: 'Sold in current condition for your own repair or parts use.' },
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
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">Sales · Service · Parts</span>
        </div>
        <h1 class="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
          Industrial <span class="text-brand-500">Power Equipment</span>
        </h1>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-white/60">
          One of the largest independent inventories of new and reconditioned electrical power distribution
          equipment in North America. Circuit breakers, switchgear, transformers, and more — tested,
          certified, and ready to ship.
        </p>
        <div class="flex flex-wrap gap-4">
          <UButton to="/products" size="lg" color="primary">Browse Full Catalog</UButton>
          <UButton to="/contact" size="lg" variant="outline" color="neutral">Request a Quote</UButton>
        </div>
      </div>
    </section>

    <!-- Equipment Categories -->
    <section class="bg-default">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <div class="mb-12 text-center">
          <h2 class="mb-3 font-display text-3xl font-bold text-default">Equipment Categories</h2>
          <p class="mx-auto max-w-2xl text-dimmed">
            We carry all major brands including GE, Westinghouse, Siemens, Cutler-Hammer, Square D, ABB,
            and many more. Every piece of equipment is thoroughly tested before delivery.
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.slug"
            :to="cat.link"
            class="group light-card accent-border rounded-xl p-8 transition-all duration-300"
          >
            <div class="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand-600/10">
              <UIcon :name="cat.icon" class="size-6 text-brand-500" />
            </div>
            <h3 class="mb-2 font-display text-lg font-semibold text-default group-hover:text-brand-600 transition-colors">
              {{ cat.name }}
            </h3>
            <p class="mb-3 text-sm leading-relaxed text-dimmed">{{ cat.description }}</p>
            <span class="text-xs font-medium text-brand-600 group-hover:text-brand-500">
              Learn more →
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Brands We Carry -->
    <section class="bg-muted border-y border-default">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <div class="mb-12 text-center">
          <h2 class="mb-3 font-display text-3xl font-bold text-default">Major Brands We Carry</h2>
          <p class="text-dimmed">New, reconditioned, and remanufactured equipment from all leading manufacturers</p>
        </div>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <div v-for="brand in brands" :key="brand" class="light-card rounded-xl p-4 text-center">
            <span class="font-display text-sm font-semibold text-muted">{{ brand }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Equipment Conditions -->
    <section class="bg-default">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <div class="mb-12">
          <h2 class="mb-3 font-display text-3xl font-bold text-default">Equipment Conditions</h2>
          <p class="max-w-3xl text-dimmed">We offer equipment in a range of conditions to match your budget and timeline requirements.</p>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="condition in conditions" :key="condition.title" class="light-card rounded-xl p-6">
            <div class="mb-3 flex size-8 items-center justify-center rounded-lg" :class="condition.bgClass">
              <UIcon :name="condition.icon" class="size-4" :class="condition.iconClass" />
            </div>
            <h3 class="mb-1 font-display text-sm font-semibold text-default">{{ condition.title }}</h3>
            <p class="text-xs leading-relaxed text-dimmed">{{ condition.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-default">
      <div class="mx-auto max-w-7xl px-4 pb-20">
        <div class="rounded-2xl bg-muted p-8 text-center sm:p-12">
          <h2 class="mb-3 font-display text-2xl font-bold text-default">Can't Find What You Need?</h2>
          <p class="mb-6 text-dimmed">Our team can source virtually any piece of electrical distribution equipment. Tell us what you're looking for.</p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <UButton to="/contact" size="lg" color="primary">Request Equipment</UButton>
            <ULink to="tel:8002325809" class="flex items-center gap-2 text-sm font-medium text-dimmed transition-colors hover:text-default">
              <UIcon name="i-lucide-phone" class="size-4 text-brand-500" />
              800-232-5809
            </ULink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
