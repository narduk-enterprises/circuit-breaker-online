<script setup lang="ts">
useSeo({
  title: 'Power & Distribution Transformers | Circuit Breaker Sales',
  description: 'Buy new and reconditioned power transformers and distribution transformers. Dry-type and oil-filled configurations. All major brands. Full testing and certification.',
  keywords: ['power transformers', 'distribution transformers', 'dry-type transformer', 'oil-filled transformer', 'unit substation'],
  ogImage: { title: 'Transformers', description: 'Power & Distribution Transformers', icon: '⚡' },
})
useBreadcrumbSchema([
  { name: 'Home', url: 'https://circuitbreaker.online/' },
  { name: 'Equipment', url: 'https://circuitbreaker.online/equipment' },
  { name: 'Transformers', url: 'https://circuitbreaker.online/equipment/transformers' },
])
useFAQSchema([
  { question: 'What is the difference between dry-type and oil-filled transformers?', answer: 'Dry-type transformers use air for cooling and are typically used for indoor installations up to about 10MVA. Oil-filled transformers use mineral oil or synthetic fluid for insulation and cooling, allowing higher voltage and kVA ratings. Oil-filled units require secondary containment but offer better efficiency at larger sizes.' },
  { question: 'Does Circuit Breaker Sales offer transformer oil analysis?', answer: 'Yes, we provide dissolved gas analysis (DGA), oil quality testing, and comprehensive transformer evaluation services. Regular oil analysis is essential for detecting incipient faults and planning maintenance before costly failures occur.' },
])
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: 'Power Transformers', description: 'New and reconditioned power and distribution transformers.', brand: { '@type': 'Organization', name: 'Circuit Breaker Sales' }, category: 'Electrical Equipment > Transformers' }) }] })

const pageData = {
  breadcrumb: 'Transformers',
  title: 'Power & Distribution',
  titleHighlight: 'Transformers',
  description: 'New and reconditioned dry-type and liquid-filled transformers for distribution and power applications. From small dry-type distribution transformers to large substation power transformers.',
  catalogLink: '/products?category=Transformers',
  catalogLabel: 'Browse Transformers',
  contentTitle: 'Transformer Solutions',
  contentParagraphs: [
    'Circuit Breaker Sales provides a full range of power and distribution transformers for industrial, commercial, and utility applications. Our inventory includes dry-type transformers, oil-filled transformers, and specialty units in a wide range of kVA ratings and voltage classes.',
    'We also offer complete unit substation packages combining transformers with switchgear and distribution equipment for a turnkey power system solution. All transformers are tested and inspected before shipment.',
  ],
  types: [
    { name: 'Dry-Type Transformers', description: 'Air-cooled transformers for indoor installations. Available in ventilated and sealed configurations.' },
    { name: 'Oil-Filled Transformers', description: 'Liquid-insulated transformers for higher voltage and kVA ratings. Indoor and outdoor rated.' },
    { name: 'Unit Substations', description: 'Complete transformer and switchgear packages for integrated power distribution systems.' },
    { name: 'Pad-Mount Transformers', description: 'Enclosed transformers for outdoor ground-level installation in commercial and residential areas.' },
  ],
  brands: ['GE', 'Westinghouse', 'Siemens', 'Square D', 'ABB', 'Eaton', 'Federal Pacific', 'Howard'],
  services: ['Transformer testing & evaluation', 'Oil analysis & filtration', 'Remanufacturing & rewinding', 'Load tap changer service', 'Installation & commissioning', 'Preventive maintenance'],
}
</script>

<template>
  <EquipmentPage v-bind="pageData" />
</template>
