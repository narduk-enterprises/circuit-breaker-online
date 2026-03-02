<script setup lang="ts">
useSeoMeta({
  title: 'Mining Electrical Equipment & Services | Circuit Breaker Sales',
  description: 'Rugged electrical distribution equipment for surface and underground mining operations. MSHA compliant equipment with emergency support for remote mining sites.',
})
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: 'Mining Electrical Equipment', provider: { '@type': 'Organization', name: 'Circuit Breaker Sales' }, areaServed: 'US' }) }] })

const pageData = {
  breadcrumb: 'Mining',
  title: 'Mining & Extraction',
  titleHighlight: 'Power Systems',
  description: 'Heavy-duty electrical distribution equipment designed for the harsh conditions of surface and underground mining operations. MSHA-compliant equipment with rapid delivery to remote locations.',
  accentColor: 'zinc',
  solutions: [
    { title: 'Mine Power Centers', icon: 'i-lucide-checkpu', description: 'Portable and stationary power centers for underground and surface mining operations.' },
    { title: 'Motor Starters', icon: 'i-lucide-settings', description: 'Heavy-duty motor starters and contactors for draglines, shovels, and conveyor systems.' },
    { title: 'Switchgear', icon: 'i-lucide-bolt', description: 'Metal-clad and metal-enclosed switchgear for mine substations and surface facilities.' },
    { title: 'Protection Systems', icon: 'i-lucide-shield-check', description: 'Ground fault and ground check protection systems meeting MSHA requirements.' },
  ],
  services: ['MSHA compliance support', 'Emergency equipment delivery', 'On-site maintenance', 'Switchgear overhaul', 'Motor starter reconditioning', 'Ground fault relay testing', 'Cable & connector sourcing', 'Shutdown maintenance'],
}
</script>

<template>
  <IndustryPage v-bind="pageData" />
</template>
