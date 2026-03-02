<script setup lang="ts">
useSeoMeta({
  description: 'Remote racking and switching devices for safe circuit breaker operation from outside the arc flash boundary. Reduce arc flash risk and improve worker safety.',
})
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: 'Remote Racking & Switching Systems', description: 'Remote racking and switching devices for safe circuit breaker operation.', brand: { '@type': 'Organization', name: 'Circuit Breaker Sales' }, category: 'Electrical Equipment > Remote Racking Systems' }) }] })

const pageData = {
  breadcrumb: 'Remote Racking',
  title: 'Remote Racking &',
  titleHighlight: 'Switching Systems',
  description: 'Remotely rack circuit breakers and operate switching devices from a safe distance outside the arc flash boundary. Essential for NFPA 70E compliance and worker safety in hazardous electrical environments.',
  catalogLink: '/products?category=Remote%20Racking',
  catalogLabel: 'Browse Remote Racking',
  contentTitle: 'Arc Flash Safety Solutions',
  contentParagraphs: [
    'Remote racking and switching systems allow operators to insert, withdraw, and operate circuit breakers from outside the arc flash danger zone. This is one of the most effective engineering controls for reducing arc flash risk to personnel — and is increasingly required by NFPA 70E and OSHA guidelines.',
    'Circuit Breaker Sales offers remote racking solutions for virtually all types of low and medium voltage drawout circuit breakers. Our systems are portable, easy to use, and can be customized for specific switchgear configurations.',
  ],
  types: [
    { name: 'Low Voltage Racking Devices', description: 'Remote racking systems for low voltage drawout circuit breakers in switchgear and MCCs.' },
    { name: 'Medium Voltage Racking Devices', description: 'Remote racking systems for medium voltage vacuum and air circuit breakers.' },
    { name: 'Remote Switching Operators', description: 'Remote operation devices for switches, disconnects, and load interrupters.' },
    { name: 'Portable Racking Kits', description: 'Portable, battery-powered systems that can be moved between switchgear lineups.' },
  ],
  brands: ['CBS Remote Racking', 'GE', 'Siemens', 'ABB', 'Eaton'],
  services: ['Arc flash hazard analysis', 'Remote racking training', 'Custom system design', 'On-site demonstrations', 'NFPA 70E consultation', 'Installation support'],
}
</script>

<template>
  <EquipmentPage v-bind="pageData" />
</template>
