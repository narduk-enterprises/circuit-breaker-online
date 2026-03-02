<script setup lang="ts">
useSeoMeta({
  description: 'OEM and aftermarket vacuum interrupter replacements with predictive testing using MAC-TS4. All major brands including Eaton, Siemens, ABB. Full testing and certification.',
})
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: 'Vacuum Interrupters', description: 'OEM and aftermarket vacuum interrupter replacements.', brand: { '@type': 'Organization', name: 'Circuit Breaker Sales' }, category: 'Electrical Equipment > Vacuum Interrupters' }) }] })

const pageData = {
  breadcrumb: 'Vacuum Interrupters',
  title: 'OEM Replacement',
  titleHighlight: 'Vacuum Interrupters',
  description: 'Replacement vacuum interrupters (vacuum bottles) for medium voltage circuit breakers and contactors. OEM and aftermarket options with predictive testing to identify bottles before failure.',
  catalogLink: '/products?category=Vacuum%20Interrupters',
  catalogLabel: 'Browse Vacuum Interrupters',
  contentTitle: 'Vacuum Interrupter Solutions',
  contentParagraphs: [
    'Vacuum interrupters are the heart of medium voltage vacuum circuit breakers and contactors. Over time, vacuum integrity can degrade — and traditional high-potential (HiPot) testing can miss bad interrupters, giving false negative results.',
    'Circuit Breaker Sales uses the MAC-TS4 Vacuum Interrupter Test Unit for predictive magnetron atmospheric condition (MAC) testing, which provides a more reliable assessment of vacuum interrupter condition than conventional HiPot tests. This helps prevent costly in-service failures.',
  ],
  types: [
    { name: 'OEM Vacuum Interrupters', description: 'Factory-original replacement interrupters from the circuit breaker manufacturer.' },
    { name: 'Aftermarket Interrupters', description: 'Cost-effective replacement interrupters meeting or exceeding OEM specifications.' },
    { name: 'Predictive Testing', description: 'MAC-TS4 testing service to evaluate vacuum interrupter condition before failure.' },
    { name: 'Contactor Interrupters', description: 'Replacement vacuum bottles for medium voltage contactors and motor starters.' },
  ],
  brands: ['Eaton / Cutler-Hammer', 'Siemens', 'ABB', 'GE', 'Westinghouse', 'Square D'],
  services: ['MAC-TS4 predictive testing', 'Vacuum interrupter replacement', 'Circuit breaker overhaul', 'Scheduled replacement programs', 'On-site testing available', 'Emergency sourcing'],
}
</script>

<template>
  <EquipmentPage v-bind="pageData" />
</template>
