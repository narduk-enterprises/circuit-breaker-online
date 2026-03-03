<script setup lang="ts">
useSeoMeta({
  title: 'Healthcare Facility Power Equipment | Circuit Breaker Sales',
  description: 'Critical power equipment for hospitals, medical centers, and healthcare facilities. Life safety and essential power systems meeting NEC 517 and NFPA 110 requirements.',
})
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: 'Healthcare Power Equipment', provider: { '@type': 'Organization', name: 'Circuit Breaker Sales' }, areaServed: 'US' }) }] })

const pageData = {
  breadcrumb: 'Healthcare',
  title: 'Healthcare Facility',
  titleHighlight: 'Critical Power',
  description: 'Life-safety electrical equipment for hospitals, ambulatory surgery centers, and medical campuses. When lives depend on reliable power, Circuit Breaker Sales delivers.',
  accentColor: 'rose',
  solutions: [
    { title: 'Life Safety Systems', icon: 'i-lucide-heart', description: 'Circuit breakers and switchgear for NEC Article 517 life safety and critical branch circuits.' },
    { title: 'Essential Power', icon: 'i-lucide-bolt', description: 'Equipment power branch components for diagnostic imaging, surgical suites, and ICU power.' },
    { title: 'Generator Switchgear', icon: 'i-lucide-arrows-right-left', description: 'Generator paralleling switchgear, ATS components, and automatic transfer equipment.' },
    { title: 'Code Compliance', icon: 'i-lucide-shield-check', description: 'NFPA 110, NEC 517, and Joint Commission compliance support for electrical systems.' },
  ],
  services: ['Quarterly breaker maintenance', 'Annual shutdown testing', 'ATS maintenance & testing', 'Generator switchgear service', 'Arc flash hazard studies', 'Emergency equipment sourcing', 'Equipment life assessments', 'Retrofill programs'],
}
</script>

<template>
  <IndustryPage v-bind="pageData" />
</template>
