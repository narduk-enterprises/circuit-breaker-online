<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const brandsData: Record<string, { name: string; description: string; content: string; models: string[]; services: string[] }> = {
  'general-electric': {
    name: 'General Electric (GE)',
    description: 'One of the largest inventories of GE circuit breakers and switchgear in North America. New, reconditioned, and remanufactured GE equipment — from legacy AK/AKR to modern EntelliGuard.',
    content: '<p>Circuit Breaker Sales specializes in General Electric power circuit breakers, switchgear, and replacement parts. We maintain one of the largest independent inventories of GE electrical equipment in North America, including many legacy product lines that are no longer manufactured by GE.</p><p>Whether you need a replacement GE AKR-50 breaker, a set of AK-25 arc chutes, or a complete GE PowerVac VB1 lineup, our team can locate and deliver the equipment you need — tested and certified for reliable operation.</p>',
    models: ['AK-25/50/75', 'AKR-30/50/75', 'AKF-25/50', 'WavePro', 'EntelliGuard', 'Power/Vac VB1', 'VB/VB1 13.8kV', 'AM-13.8 Switchgear', 'AV Line Switchgear'],
    services: ['GE breaker reconditioning', 'AKR trip unit upgrades', 'EntellliGuard retrofill', 'GE switchgear retrofill', 'Replacement arc chutes', 'Legacy parts sourcing'],
  },
  'westinghouse': {
    name: 'Westinghouse / Eaton',
    description: 'Comprehensive inventory of Westinghouse and Eaton circuit breakers, including legacy DS/DSL types and modern Magnum series equipment.',
    content: '<p>Westinghouse (now Eaton) has one of the largest installed bases of electrical equipment in North America. Circuit Breaker Sales carries a deep inventory of Westinghouse/Eaton power circuit breakers, from the venerable DS/DSL series through modern Magnum and MDS Magnum units.</p><p>Our shop technicians have decades of experience with Westinghouse equipment and can recondition, test, and certify any Westinghouse breaker type to OEM specifications.</p>',
    models: ['DS-206/416/632', 'DSL-206/416/632', 'DB-25/50/75', 'Magnum DS', 'MDS Magnum', 'DHP-VR 4.16-15kV', 'SPB-100', '150VCP-W 500/750/1000'],
    services: ['DS/DSL overhaul', 'Amptector trip unit repair', 'DHP vacuum breaker service', 'Magnum retrofill programs', 'Legacy parts sourcing', 'Switchgear reconditioning'],
  },
  'siemens': {
    name: 'Siemens',
    description: 'New and reconditioned Siemens circuit breakers and switchgear components. From RL/RLX air breakers to modern WL and GMSG vacuum equipment.',
    content: '<p>Siemens power circuit breakers and switchgear are found throughout industrial, commercial, and utility substations worldwide. Circuit Breaker Sales provides new and reconditioned Siemens breakers across the full product line.</p><p>We specialize in hard-to-find legacy Siemens (and I-T-E) equipment, including the popular RL/RLX series, as well as modern WL breakers and GMSG medium voltage switchgear components.</p>',
    models: ['RL-800/1600/2000/3200', 'RLX-800', 'WL Breakers', 'SB Series', 'GMSG Switchgear', 'MA/MC Medium Voltage', 'SDV6 Vacuum', '81000/3WX Breakers'],
    services: ['RL/RLX reconditioning', 'WL breaker service', 'Trip unit upgrades', 'GMSG switchgear retrofit', 'Medium voltage overhaul', 'Legacy ITE sourcing'],
  },
  'cutler-hammer': {
    name: 'Cutler-Hammer / Eaton',
    description: 'Full inventory of Cutler-Hammer circuit breakers, motor controls, and switchgear. Legacy and current production Eaton/Cutler-Hammer equipment.',
    content: '<p>Cutler-Hammer (now Eaton) circuit breakers and switchgear are among the most commonly installed electrical equipment in commercial and industrial facilities. Circuit Breaker Sales maintains a comprehensive inventory of Cutler-Hammer power circuit breakers, motor controls, and replacement parts.</p><p>From legacy Type SPB and HMCP breakers to modern Magnum and Digitrip trip units, we can supply and service the full Cutler-Hammer product line.</p>',
    models: ['SPB-100', 'HMCP Series', 'HFD/HKD/HLD', 'Magnum DS', 'Type W-2/W-3 Starters', 'AN/AE Starters', 'Freedom Series', 'Advantage Starters'],
    services: ['SPB reconditioning', 'Digitrip upgrades', 'Motor starter overhaul', 'MCC bucket replacement', 'Magnum service', 'Legacy parts sourcing'],
  },
  'square-d': {
    name: 'Square D / Schneider',
    description: 'New and reconditioned Square D and Schneider Electric circuit breakers. Masterpact, DS/DSL, I-Line, and QO/QOB product lines.',
    content: '<p>Square D (now Schneider Electric) circuit breakers and panelboards are found in facilities of all sizes. Circuit Breaker Sales provides new and reconditioned Square D power circuit breakers, including the Masterpact series, legacy DS/DSL types, and I-Line distribution equipment.</p><p>We also carry a wide selection of Square D molded case circuit breakers for panel and switchboard applications, along with replacement trip units and accessories.</p>',
    models: ['Masterpact NW/NT', 'DS-206/416/632', 'QO/QOB Series', 'I-Line Panels', 'PowerPact Series', 'Micrologic Trip Units', 'MV Breakers', 'NQOD Panels'],
    services: ['Masterpact service', 'DS breaker overhaul', 'Micrologic upgrades', 'I-Line modifications', 'Switch reconditioning', 'Panel refurbishment'],
  },
  'abb': {
    name: 'ABB',
    description: 'ABB circuit breakers, switchgear, and medium voltage equipment. SACE Emax, VD4, and legacy BBC product lines.',
    content: '<p>ABB is a global leader in electrical equipment manufacturing with a strong presence in both low and medium voltage markets. Circuit Breaker Sales provides new and reconditioned ABB circuit breakers and switchgear components, including the popular SACE Emax low voltage breaker line and VD4 medium voltage vacuum breakers.</p><p>We also carry legacy BBC (Brown Boveri) equipment for older installations, as well as ABB protective relays and motor control products.</p>',
    models: ['SACE Emax E1-E6', 'SACE Emax 2', 'VD4 Vacuum Breakers', 'HD4 Breakers', 'K-Line Switchgear', 'REF/RET Relays', 'TMAX Breakers', 'Legacy BBC Types'],
    services: ['Emax reconditioning', 'VD4 vacuum interrupter replacement', 'ABB relay testing', 'HD4 overhaul', 'Legacy BBC sourcing', 'ABB switchgear retrofit'],
  },
}

const allBrands = Object.entries(brandsData).map(([s, b]) => ({ slug: s, name: b.name }))
const currentBrand = computed(() => brandsData[slug])
const otherBrands = computed(() => allBrands.filter(b => b.slug !== slug))

if (!currentBrand.value) {
  throw createError({ statusCode: 404, statusMessage: 'Brand not found' })
}

useSeoMeta({
  title: `${currentBrand.value.name} Circuit Breakers & Parts | Circuit Breaker Sales`,
  description: currentBrand.value.description,
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${currentBrand.value.name} Circuit Breakers`,
      description: currentBrand.value.description,
      brand: { '@type': 'Brand', name: currentBrand.value.name },
      seller: { '@type': 'Organization', name: 'Circuit Breaker Sales' },
    }),
  }],
})
</script>

<template>
  <div>
    <section class="gradient-industrial hero-grid relative overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-b from-brand-950/20 via-transparent to-transparent" />
      <div class="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div class="mb-4 flex items-center gap-2">
          <div class="h-px w-8 bg-brand-600" />
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">Authorized Parts & Service</span>
        </div>
        <h1 class="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
          {{ currentBrand?.name }} <span class="text-brand-500">Circuit Breakers & Parts</span>
        </h1>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-white/70">{{ currentBrand?.description }}</p>
        <div class="flex flex-wrap gap-4">
          <UButton :to="`/products?brand=${encodeURIComponent(currentBrand?.name || '')}`" size="lg" color="primary">Browse {{ currentBrand?.name }} Inventory</UButton>
          <UButton to="/contact" size="lg" variant="outline" color="neutral">Request a Quote</UButton>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-20">
      <div class="grid gap-12 lg:grid-cols-3">
        <div class="lg:col-span-2 space-y-8">
          <div class="light-card rounded-xl p-8">
            <h2 class="mb-4 font-display text-xl font-semibold text-default">{{ currentBrand?.name }} Equipment We Carry</h2>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="space-y-4 text-sm leading-relaxed text-muted" v-html="currentBrand?.content" />
          </div>

          <div>
            <h2 class="mb-6 font-display text-xl font-semibold text-default">Popular {{ currentBrand?.name }} Models</h2>
            <div class="grid gap-3 sm:grid-cols-2">
              <div v-for="model in currentBrand?.models" :key="model" class="light-card rounded-lg px-4 py-3">
                <span class="text-sm font-medium text-muted">{{ model }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="light-card border-default rounded-xl p-6">
            <h3 class="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-brand-500">Services for {{ currentBrand?.name }}</h3>
            <ul class="space-y-2.5 text-sm text-muted">
              <li v-for="s in currentBrand?.services" :key="s" class="flex items-start gap-2">
                <UIcon name="i-lucide-circle-check" class="mt-0.5 size-4 shrink-0 text-brand-500" />
                <span>{{ s }}</span>
              </li>
            </ul>
          </div>
          <div class="light-card rounded-xl p-6">
            <h3 class="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-brand-500">Need a Specific Part?</h3>
            <p class="mb-4 text-sm text-dimmed">Can't find what you need? We can source virtually any {{ currentBrand?.name }} part or breaker.</p>
            <UButton to="/contact" color="primary" block size="sm">Request Equipment</UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Other Brands -->
    <section class="border-t border-default bg-muted">
      <div class="mx-auto max-w-7xl px-4 py-16">
        <h2 class="mb-6 font-display text-xl font-bold text-default">Other Brands We Carry</h2>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            v-for="b in otherBrands"
            :key="b.slug"
            :to="`/brands/${b.slug}`"
            class="light-card rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-brand-500 hover:bg-muted"
          >
            {{ b.name }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
