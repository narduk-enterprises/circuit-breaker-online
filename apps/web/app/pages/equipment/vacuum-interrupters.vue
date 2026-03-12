<script setup lang="ts">
useSeo({
  title: 'Vacuum Interrupter Replacements & Testing | Circuit Breaker Sales',
  description:
    'OEM and aftermarket vacuum interrupter replacements with predictive testing using MAC-TS4. All major brands including Eaton, Siemens, ABB. Full testing and certification.',
  keywords: [
    'vacuum interrupter',
    'vacuum bottle',
    'MAC testing',
    'vacuum circuit breaker',
    'interrupter replacement',
  ],
  ogImage: {
    title: 'Vacuum Interrupters',
    description: 'OEM Replacements & Predictive Testing',
    icon: '🔬',
  },
})
useBreadcrumbSchema([
  { name: 'Home', url: 'https://circuitbreaker.online/' },
  { name: 'Equipment', url: 'https://circuitbreaker.online/equipment' },
  {
    name: 'Vacuum Interrupters',
    url: 'https://circuitbreaker.online/equipment/vacuum-interrupters',
  },
])
useFAQSchema([
  {
    question: 'What is MAC testing for vacuum interrupters?',
    answer:
      'MAC (Magnetron Atmospheric Condition) testing uses a magnetic field to detect loss of vacuum in interrupters more reliably than traditional HiPot (high-potential) testing. HiPot tests can pass bad interrupters because the test voltage may not be sufficient to reveal degraded vacuum. Circuit Breaker Sales uses the MAC-TS4 tester for predictive vacuum interrupter evaluation.',
  },
  {
    question: 'How do I know when to replace a vacuum interrupter?',
    answer:
      'Signs include increased fault clearing times, visible damage to contacts through the glass envelope, and failed vacuum integrity tests. Circuit Breaker Sales recommends periodic MAC testing to identify degraded interrupters before they fail in service, preventing costly outages.',
  },
])
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Vacuum Interrupters',
        description: 'OEM and aftermarket vacuum interrupter replacements.',
        brand: { '@type': 'Organization', name: 'Circuit Breaker Sales' },
        category: 'Electrical Equipment > Vacuum Interrupters',
      }),
    },
  ],
})

const pageData = {
  breadcrumb: 'Vacuum Interrupters',
  title: 'OEM Replacement',
  titleHighlight: 'Vacuum Interrupters',
  description:
    'Replacement vacuum interrupters (vacuum bottles) for medium voltage circuit breakers and contactors. OEM and aftermarket options with predictive testing to identify bottles before failure.',
  catalogLink: '/products/category/medium-voltage-components',
  catalogLabel: 'Browse Vacuum Interrupters',
  contentTitle: 'Vacuum Interrupter Solutions',
  contentParagraphs: [
    'Vacuum interrupters are the heart of medium voltage vacuum circuit breakers and contactors. Over time, vacuum integrity can degrade — and traditional high-potential (HiPot) testing can miss bad interrupters, giving false negative results.',
    'Circuit Breaker Sales uses the MAC-TS4 Vacuum Interrupter Test Unit for predictive magnetron atmospheric condition (MAC) testing, which provides a more reliable assessment of vacuum interrupter condition than conventional HiPot tests. This helps prevent costly in-service failures.',
  ],
  types: [
    {
      name: 'OEM Vacuum Interrupters',
      description:
        'Factory-original replacement interrupters from the circuit breaker manufacturer.',
    },
    {
      name: 'Aftermarket Interrupters',
      description:
        'Cost-effective replacement interrupters meeting or exceeding OEM specifications.',
    },
    {
      name: 'Predictive Testing',
      description:
        'MAC-TS4 testing service to evaluate vacuum interrupter condition before failure.',
    },
    {
      name: 'Contactor Interrupters',
      description: 'Replacement vacuum bottles for medium voltage contactors and motor starters.',
    },
  ],
  brands: ['Eaton / Cutler-Hammer', 'Siemens', 'ABB', 'GE', 'Westinghouse', 'Square D'],
  services: [
    'MAC-TS4 predictive testing',
    'Vacuum interrupter replacement',
    'Circuit breaker overhaul',
    'Scheduled replacement programs',
    'On-site testing available',
    'Emergency sourcing',
  ],
}
</script>

<template>
  <EquipmentPage v-bind="pageData" />
</template>
