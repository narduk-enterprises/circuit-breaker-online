<script setup lang="ts">
useSeo({
  title: 'Oil & Gas Electrical Equipment | Circuit Breaker Sales',
  description: 'Electrical equipment for refineries, pipelines, offshore platforms, and petrochemical facilities. Hazardous area rated equipment with emergency support.',
  keywords: ['oil gas electrical', 'refinery switchgear', 'hazardous area equipment', 'NEC 500', 'turnaround support'],
  ogImage: { title: 'Oil & Gas', description: 'Power Equipment for Energy Operations', icon: '🛢️' },
})
useBreadcrumbSchema([
  { name: 'Home', url: 'https://circuitbreaker.online/' },
  { name: 'Industries', url: 'https://circuitbreaker.online/industries' },
  { name: 'Oil & Gas', url: 'https://circuitbreaker.online/industries/oil-gas' },
])
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: 'Oil & Gas Electrical Equipment', provider: { '@type': 'Organization', name: 'Circuit Breaker Sales' }, areaServed: 'US' }) }] })

const pageData = {
  breadcrumb: 'Oil & Gas',
  title: 'Oil & Gas',
  titleHighlight: 'Power Equipment',
  description: 'Electrical distribution equipment and services for upstream, midstream, and downstream oil and gas operations. From offshore platforms to inland refineries, we deliver the equipment you need.',
  accentColor: 'orange',
  solutions: [
    { title: 'Refinery Switchgear', icon: 'i-lucide-cpu', description: 'Medium voltage switchgear and MCCs for refinery and processing plant applications.' },
    { title: 'Pipeline Equipment', icon: 'i-lucide-arrows-right-left', description: 'Motor starters, VFDs, and power distribution for compressor stations and pump stations.' },
    { title: 'Hazardous Area', icon: 'i-lucide-fire', description: 'Equipment rated for Class I, Division 1 and 2 hazardous locations per NEC 500.' },
    { title: 'Turnaround Support', icon: 'i-lucide-wrench', description: 'Pre-staged equipment and standby technicians for planned shutdowns and turnarounds.' },
  ],
  services: ['Turnaround/shutdown support', 'Emergency equipment sourcing', 'Medium voltage breaker service', 'On-site switchgear maintenance', 'Arc flash mitigation', 'Relay testing & commissioning', 'Equipment life extension', 'Hazardous area compliance'],
}
</script>

<template>
  <IndustryPage v-bind="pageData" />
</template>
