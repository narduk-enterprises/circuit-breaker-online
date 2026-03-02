<script setup lang="ts">
useSeoMeta({
  description: 'Load tap changer (LTC) parts, components, and service for all major transformer manufacturers. Preventive maintenance and emergency repair for tap changers nationwide.',
})
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: 'Load Tap Changers', description: 'Load tap changer parts, components, and service.', brand: { '@type': 'Organization', name: 'Circuit Breaker Sales' }, category: 'Electrical Equipment > Load Tap Changers' }) }] })

const pageData = {
  breadcrumb: 'Load Tap Changers',
  title: 'Load Tap Changer',
  titleHighlight: 'Parts & Service',
  description: 'Comprehensive load tap changer (LTC) solutions including replacement parts, component repair, and preventive maintenance programs. We service all major LTC types and manufacturers to keep your transformers regulating voltage reliably.',
  catalogLink: '/products?category=Load%20Tap%20Changers',
  catalogLabel: 'Browse LTC Parts',
  contentTitle: 'Load Tap Changer Expertise',
  contentParagraphs: [
    'Load tap changers are among the most maintenance-intensive components in power transformers. Regular maintenance and timely replacement of worn components is essential to prevent costly transformer failures and unplanned outages.',
    'Circuit Breaker Sales provides a comprehensive LTC program including parts supply, component reconditioning, and on-site maintenance services. Our technicians have extensive experience with all major LTC types and can provide both scheduled maintenance and emergency repair services.',
  ],
  types: [
    { name: 'LTC Moving Contacts', description: 'Replacement moving and stationary contacts for all major load tap changer models.' },
    { name: 'LTC Drive Mechanisms', description: 'Motor drive mechanisms, limit switches, and position indicators for tap changers.' },
    { name: 'Transition Resistors', description: 'Replacement transition resistors and reactor assemblies for resistor-type LTCs.' },
    { name: 'Complete LTC Assemblies', description: 'Rebuilt and reconditioned complete load tap changer assemblies ready for installation.' },
  ],
  brands: ['Westinghouse / Eaton', 'GE', 'Siemens', 'ABB', 'Reinhausen', 'McGraw Edison'],
  services: ['LTC preventive maintenance', 'Contact replacement', 'Oil filtration & testing', 'Drive mechanism repair', 'On-site LTC service', 'Emergency LTC repair'],
}
</script>

<template>
  <EquipmentPage v-bind="pageData" />
</template>
