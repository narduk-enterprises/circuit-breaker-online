<script setup lang="ts">
useSeoMeta({
  description: 'New and reconditioned metal-clad and metal-enclosed switchgear for utility and industrial applications. GE, Westinghouse, Siemens, Square D, ABB. Tested to ANSI/IEEE standards.',
})
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: 'Switchgear', description: 'Metal-clad and metal-enclosed switchgear assemblies and components.', brand: { '@type': 'Organization', name: 'Circuit Breaker Sales' }, category: 'Electrical Equipment > Switchgear' }) }] })

const pageData = {
  breadcrumb: 'Switchgear',
  title: 'Metal-Clad & Metal-Enclosed',
  titleHighlight: 'Switchgear',
  description: 'New and reconditioned switchgear assemblies for utility substations, industrial facilities, and commercial buildings. Available in a wide range of voltage classes and configurations to match your existing installation.',
  catalogLink: '/products?category=Switchgear',
  catalogLabel: 'Browse Switchgear',
  contentTitle: 'Switchgear Solutions',
  contentParagraphs: [
    'Circuit Breaker Sales provides complete metal-clad and metal-enclosed switchgear assemblies, as well as individual switchgear components including breaker cubicles, bus sections, and auxiliary compartments. Our switchgear is available in a range of voltage classes from 600V through 38kV.',
    'We carry switchgear from all major manufacturers and can provide complete lineups or individual sections to match your existing installation. All switchgear is tested and inspected before shipment to ensure reliable performance.',
  ],
  types: [
    { name: 'Metal-Clad Switchgear', description: '5kV–38kV drawout switchgear with arc-resistant compartments for utility and industrial use.' },
    { name: 'Metal-Enclosed Switchgear', description: 'Low and medium voltage switchgear with stationary or drawout circuit breakers.' },
    { name: 'Switchgear Sections', description: 'Individual breaker cubicles, bus sections, metering compartments, and auxiliary sections.' },
    { name: 'Arc-Resistant Switchgear', description: 'Switchgear designed and tested to IEEE C37.20.7 for arc-resistant protection.' },
  ],
  brands: ['GE', 'Westinghouse', 'Siemens', 'Square D', 'ABB', 'Eaton', 'ITE', 'Allis-Chalmers'],
  services: ['Switchgear reconditioning', 'Arc flash upgrades', 'Bus refurbishment', 'Breaker replacement', 'Retrofill programs', 'Protection upgrades'],
}
</script>

<template>
  <EquipmentPage v-bind="pageData" />
</template>
