<script setup lang="ts">
useSeo({
  title: 'Motor Control Centers, Starters & Contactors | Circuit Breaker Sales',
  description: 'New and reconditioned motor control centers, motor starters, and contactors. Low and medium voltage motor controls from GE, Westinghouse, Siemens, Cutler-Hammer, Square D.',
  keywords: ['motor control center', 'MCC', 'motor starter', 'contactor', 'variable frequency drive'],
  ogImage: { title: 'Motor Controls', description: 'MCCs, Starters & Contactors', icon: '⚙️' },
})
useBreadcrumbSchema([
  { name: 'Home', url: 'https://circuitbreaker.online/' },
  { name: 'Equipment', url: 'https://circuitbreaker.online/equipment' },
  { name: 'Motor Controls', url: 'https://circuitbreaker.online/equipment/motor-controls' },
])
useFAQSchema([
  { question: 'Can you provide plug-and-play MCC bucket replacements?', answer: 'Yes, Circuit Breaker Sales can configure replacement MCC buckets to match your existing lineup including the same starter size, voltage, control transformer, and wiring arrangement. This makes installation straightforward without modifying your existing motor control center.' },
  { question: 'What is the difference between NEMA and IEC motor starters?', answer: 'NEMA-rated starters are sized by NEMA designations (Size 0 through Size 9) and are designed for rugged, general-purpose industrial use in North America. IEC starters are rated by continuous current and tend to be more compact and less expensive, but may require more precise application engineering. Circuit Breaker Sales carries both types.' },
])
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: 'Motor Controls', description: 'Motor control centers, starters, and contactors for industrial applications.', brand: { '@type': 'Organization', name: 'Circuit Breaker Sales' }, category: 'Electrical Equipment > Motor Controls' }) }] })

const pageData = {
  breadcrumb: 'Motor Controls',
  title: 'Motor Control Centers,',
  titleHighlight: 'Starters & Contactors',
  description: 'New and reconditioned motor control centers (MCCs), motor starters, and contactors for industrial motor applications. Full and half-size MCC buckets, replacement starters, and medium voltage contactors.',
  catalogLink: '/products/category/motor-controls',
  catalogLabel: 'Browse Motor Controls',
  contentTitle: 'Motor Control Solutions',
  contentParagraphs: [
    'Circuit Breaker Sales provides motor control equipment for a wide range of industrial applications. Our inventory includes complete MCC sections, individual MCC buckets (both full and half-size), NEMA and IEC-rated motor starters, and medium voltage contactors.',
    'All motor control equipment is tested and inspected in our shop before delivery. We can also provide plug-and-play MCC bucket replacements that are configured to match your existing lineup.',
  ],
  types: [
    { name: 'Motor Control Centers', description: 'Complete MCC sections and individual starter buckets for centralized motor control.' },
    { name: 'NEMA Motor Starters', description: 'Size 0 through Size 6 NEMA-rated motor starters for across-the-line starting.' },
    { name: 'Medium Voltage Contactors', description: 'Vacuum and air-break contactors for 2.4kV–15kV motor applications.' },
    { name: 'Variable Frequency Drives', description: 'VFD retrofit packages for soft starting and variable speed motor control.' },
  ],
  brands: ['GE', 'Westinghouse', 'Siemens', 'Cutler-Hammer', 'Square D', 'Allen-Bradley', 'ABB'],
  services: ['MCC bucket replacement', 'Starter reconditioning', 'Contactor overhaul', 'VFD installation', 'Arc flash upgrades', 'Preventive maintenance'],
}
</script>

<template>
  <EquipmentPage v-bind="pageData" />
</template>
