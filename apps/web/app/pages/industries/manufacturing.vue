<script setup lang="ts">
useSeo({
  title: 'Manufacturing Power Equipment & Services | Circuit Breaker Sales',
  description: 'Industrial electrical equipment for manufacturing facilities. Motor controls, switchgear, circuit breakers, and preventive maintenance to maximize production uptime.',
  keywords: ['manufacturing electrical', 'industrial power', 'motor control center', 'production uptime', 'preventive maintenance'],
  ogImage: { title: 'Manufacturing', description: 'Industrial Power Equipment', icon: '🏭' },
})
useBreadcrumbSchema([
  { name: 'Home', url: 'https://circuitbreaker.online/' },
  { name: 'Industries', url: 'https://circuitbreaker.online/industries' },
  { name: 'Manufacturing', url: 'https://circuitbreaker.online/industries/manufacturing' },
])
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: 'Manufacturing Power Equipment', provider: { '@type': 'Organization', name: 'Circuit Breaker Sales' }, areaServed: 'US' }) }] })

const pageData = {
  breadcrumb: 'Manufacturing',
  title: 'Manufacturing &',
  titleHighlight: 'Industrial Power',
  description: 'Keep production lines running with reliable electrical distribution equipment, motor controls, and preventive maintenance services tailored for manufacturing environments.',
  accentColor: 'emerald',
  solutions: [
    { title: 'Motor Control Centers', icon: 'i-lucide-settings', description: 'MCC sections, starter buckets, and VFD replacements for production motor loads.' },
    { title: 'Process Switchgear', icon: 'i-lucide-cpu', description: 'Low and medium voltage switchgear for process power distribution.' },
    { title: 'Power Monitoring', icon: 'i-lucide-bar-chart', description: 'Power quality monitoring and metering for energy optimization.' },
    { title: 'Predictive Maintenance', icon: 'i-lucide-wrench', description: 'Thermal scanning, breaker testing, and PM programs to prevent unplanned downtime.' },
  ],
  services: ['Preventive maintenance programs', 'Motor control center upgrades', 'Arc flash studies & labeling', 'Emergency equipment sourcing', 'Circuit breaker testing', 'Infrared thermography', 'Power quality analysis', 'Shutdown/turnaround support'],
}
</script>

<template>
  <IndustryPage v-bind="pageData" />
</template>
