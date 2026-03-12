<script setup lang="ts">
useSeo({
  title: 'Medium Voltage Load Break Switches | Circuit Breaker Sales',
  description:
    'New and reconditioned medium voltage load break switches and load interrupter switches. For safe isolation of electrical circuits in substations and switchgear.',
  keywords: [
    'load break switch',
    'load interrupter switch',
    'medium voltage switch',
    'disconnect switch',
    'pad-mount switch',
  ],
  ogImage: {
    title: 'Load Break Switches',
    description: 'Medium Voltage Switching Solutions',
    icon: '⚡',
  },
})
useBreadcrumbSchema([
  { name: 'Home', url: 'https://circuitbreaker.online/' },
  { name: 'Equipment', url: 'https://circuitbreaker.online/equipment' },
  {
    name: 'Load Break Switches',
    url: 'https://circuitbreaker.online/equipment/load-break-switches',
  },
])
useFAQSchema([
  {
    question: 'What is the difference between a load break switch and a disconnect switch?',
    answer:
      'A load break switch can safely open and close circuits while carrying load current. A disconnect switch (isolating switch) is designed only for visible isolation when the circuit is already de-energized. Using a disconnect switch under load can cause dangerous arcing.',
  },
  {
    question: 'What types of load break switches does Circuit Breaker Sales carry?',
    answer:
      'We carry bolted pressure switches, vacuum load interrupter switches, SF6 switches, and pad-mount switches for underground distribution. Brands include GE, S&C Electric, Westinghouse, Siemens, ABB, and Eaton.',
  },
])
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Load Break Switches',
        description: 'Medium voltage load break and load interrupter switches.',
        brand: { '@type': 'Organization', name: 'Circuit Breaker Sales' },
        category: 'Electrical Equipment > Load Break Switches',
      }),
    },
  ],
})

const pageData = {
  breadcrumb: 'Load Break Switches',
  title: 'Medium Voltage',
  titleHighlight: 'Load Break Switches',
  description:
    'New and reconditioned medium voltage load break switches and load interrupter switches for safe isolation of electrical circuits. Essential components for switchgear, substations, and pad-mount applications.',
  catalogLink: '/products/category/disconnect-switches',
  catalogLabel: 'Browse Switches',
  contentTitle: 'Load Break Switch Solutions',
  contentParagraphs: [
    'Load break switches provide a safe means of opening and closing circuits under load conditions. They are essential for isolation, maintenance switching, and sectionalizing in medium voltage distribution systems.',
    'Circuit Breaker Sales carries a full range of load break switches including bolted pressure switches, oil-filled switches, SF6 switches, and vacuum load interrupters from all major manufacturers.',
  ],
  types: [
    {
      name: 'Bolted Pressure Switches',
      description:
        'High-pressure contact type switches for utility and industrial switchgear applications.',
    },
    {
      name: 'Load Interrupter Switches',
      description:
        'Vacuum or puffer-type switches for interrupting load current in medium voltage systems.',
    },
    {
      name: 'Pad-Mount Switches',
      description:
        'Enclosed switches for underground distribution systems and commercial installations.',
    },
    {
      name: 'Disconnect Switches',
      description:
        'Non-load-break isolating switches for visible isolation and maintenance lockout.',
    },
  ],
  brands: ['GE', 'S&C Electric', 'Westinghouse', 'Siemens', 'ABB', 'Eaton'],
  services: [
    'Switch reconditioning',
    'Contact replacement',
    'Mechanism service',
    'On-site testing',
    'Installation support',
    'Emergency sourcing',
  ],
}
</script>

<template>
  <EquipmentPage v-bind="pageData" />
</template>
