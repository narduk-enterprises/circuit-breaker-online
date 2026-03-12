<script setup lang="ts">
useSeo({
  title: 'Protective Relays — Electromechanical & Digital | Circuit Breaker Sales',
  description:
    'New and reconditioned protective relays for overcurrent, differential, distance, and frequency protection. GE, Westinghouse, ABB, SEL, Basler, and more.',
  keywords: [
    'protective relays',
    'overcurrent relay',
    'differential relay',
    'digital relay',
    'relay testing',
  ],
  ogImage: {
    title: 'Protective Relays',
    description: 'Electromechanical & Digital Relays',
    icon: '🛡️',
  },
})
useBreadcrumbSchema([
  { name: 'Home', url: 'https://circuitbreaker.online/' },
  { name: 'Equipment', url: 'https://circuitbreaker.online/equipment' },
  { name: 'Protective Relays', url: 'https://circuitbreaker.online/equipment/protective-relays' },
])
useFAQSchema([
  {
    question: 'Can I replace an electromechanical relay with a digital relay?',
    answer:
      'In many cases, yes. Modern digital multifunction relays can replace multiple electromechanical relays while providing additional features like event recording, remote communication, and programmable logic. Circuit Breaker Sales can help assess compatibility and provide the correct replacement relay for your application.',
  },
  {
    question: 'How often should protective relays be tested?',
    answer:
      'NFPA 70B recommends testing protective relays every 3 to 5 years, depending on the criticality of the equipment being protected. Electromechanical relays may need more frequent calibration than digital relays. Circuit Breaker Sales offers on-site relay testing and calibration services.',
  },
])
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Protective Relays',
        description: 'Electromechanical, solid-state, and digital protective relays.',
        brand: { '@type': 'Organization', name: 'Circuit Breaker Sales' },
        category: 'Electrical Equipment > Protective Relays',
      }),
    },
  ],
})

const pageData = {
  breadcrumb: 'Protective Relays',
  title: 'Electromechanical & Digital',
  titleHighlight: 'Protective Relays',
  description:
    'Replacement protective relays for overcurrent, differential, distance, frequency, and voltage protection. We carry electromechanical, solid-state, and modern digital relay types from all major manufacturers.',
  catalogLink: '/products/category/protective-relays',
  catalogLabel: 'Browse Relays',
  contentTitle: 'Protective Relay Solutions',
  contentParagraphs: [
    'Circuit Breaker Sales maintains a large inventory of protective relays for every protective function in industrial and utility power systems. From legacy electromechanical relays that are no longer manufactured to modern digital multi-function relays, we can source what you need.',
    'Our technicians can test, calibrate, and recondition relays in our certified shop. We also provide on-site relay testing and commissioning services through our field services team.',
  ],
  types: [
    {
      name: 'Overcurrent Relays',
      description:
        'Time overcurrent and instantaneous overcurrent relays for feeder and transformer protection.',
    },
    {
      name: 'Differential Relays',
      description: 'Current differential relays for transformer, bus, and generator protection.',
    },
    {
      name: 'Distance Relays',
      description: 'Impedance-based relays for transmission line and interconnection protection.',
    },
    {
      name: 'Digital / Multifunction Relays',
      description:
        'Modern microprocessor-based relays with multiple protective functions in a single unit.',
    },
  ],
  brands: ['GE', 'Westinghouse', 'ABB', 'SEL', 'Basler', 'Siemens', 'Beckwith', 'Eaton'],
  services: [
    'Relay testing & calibration',
    'Protection coordination studies',
    'Relay replacement programs',
    'Settings development',
    'Field commissioning',
    'Legacy relay sourcing',
  ],
}
</script>

<template>
  <EquipmentPage v-bind="pageData" />
</template>
