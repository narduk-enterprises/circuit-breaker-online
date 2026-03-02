<script setup lang="ts">
useSeoMeta({
  description: 'Buy new and reconditioned power transformers and distribution transformers. Dry-type and oil-filled configurations. All major brands. Full testing and certification.',
})
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
