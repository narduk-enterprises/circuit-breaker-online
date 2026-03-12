<script setup lang="ts">
useSeo({
  title: 'Electrical Equipment Services | Circuit Breaker Sales',
  description:
    'Complete electrical equipment services: shop repair, field services, remanufacturing, reconditioning, life extension, and 24/7 emergency response. ISO 9001 certified.',
  ogImage: {
    title: 'Expert Equipment Services',
    description: 'Shop Repair · Field Services · Emergency Response',
    icon: '🔧',
  },
})

useWebPageSchema({
  type: 'CollectionPage',
  name: 'Electrical Equipment Services',
  description:
    'Complete life-cycle services for circuit breakers, switchgear, transformers, and power distribution equipment.',
})

useBreadcrumbSchema([
  { name: 'Home', url: 'https://circuitbreaker.online/' },
  { name: 'Services', url: 'https://circuitbreaker.online/services' },
])

useFAQSchema([
  {
    question: 'What types of electrical equipment does Circuit Breaker Sales service?',
    answer:
      'We service circuit breakers, switchgear, transformers, protective relays, motor controls, and all types of electrical power distribution equipment from major manufacturers.',
  },
  {
    question: 'Do you offer 24/7 emergency electrical service?',
    answer:
      'Yes, Circuit Breaker Sales offers 24/7 emergency response with rapid nationwide deployment and mobile workshop capabilities for critical electrical equipment failures.',
  },
  {
    question: 'Is Circuit Breaker Sales ISO certified?',
    answer:
      'Yes, our shop services are ISO 9001 certified, ensuring all equipment is remanufactured and tested to OEM specifications with full quality assurance.',
  },
  {
    question: 'Do you provide on-site field services?',
    answer:
      'Yes, our NETA-certified technicians provide on-site installation, maintenance, testing, and repair services at facilities anywhere in the United States.',
  },
])

const services = [
  {
    title: 'Shop Services',
    slug: '/services/shop-services',
    icon: 'i-lucide-wrench',
    description:
      'Factory-level repair, remanufacturing, and reconditioning of circuit breakers, switchgear, transformers, and all types of electrical distribution equipment.',
    highlights: [
      'Remanufacturing to OEM specs',
      'Full electrical testing',
      'One-year warranty on all work',
      'ISO 9001 quality assurance',
    ],
  },
  {
    title: 'Field Services',
    slug: '/services/field-services',
    icon: 'i-lucide-truck',
    description:
      'NETA-certified technicians provide on-site installation, maintenance, testing, and repair services at your facility anywhere in the U.S.',
    highlights: [
      'NETA-certified technicians',
      'Preventive maintenance programs',
      'Switchgear installation',
      'Arc flash studies',
    ],
  },
  {
    title: 'Engineered Solutions',
    slug: '/services/engineered-solutions',
    icon: 'i-lucide-calculator',
    description:
      'Custom engineering solutions for life extension, retrofit, retrofill, and modernization of aging electrical infrastructure.',
    highlights: [
      'Life extension programs',
      'Retrofit & retrofill',
      'Circuit breaker modernization',
      'Custom bus fabrication',
    ],
  },
  {
    title: 'Emergency Response',
    slug: '/services/emergency-response',
    icon: 'i-lucide-fire',
    description:
      'Rapid deployment for emergency electrical equipment failure. 24/7 availability with mobile workshop capabilities for critical situations.',
    highlights: [
      '24/7 availability',
      'Rapid deployment nationwide',
      'Mobile workshop capability',
      'Emergency equipment sourcing',
    ],
  },
]

const reasons = [
  { stat: '40+', title: 'Years Experience', description: 'Decades of hands-on expertise' },
  { stat: 'ISO', title: '9001 Certified', description: 'Quality management assured' },
  { stat: '24/7', title: 'Emergency Support', description: 'Always available when you need us' },
  { stat: 'NETA', title: 'Certified Techs', description: 'Industry-leading qualifications' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="gradient-industrial hero-grid relative overflow-hidden">
      <div
        class="absolute inset-0 bg-linear-to-b from-brand-950/20 via-transparent to-transparent"
      />
      <div class="relative mx-auto max-w-7xl px-4 pb-12 pt-14 sm:pb-24 sm:pt-28">
        <div class="mb-4 flex items-center gap-2">
          <div class="h-px w-8 bg-brand-600" />
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-500"
            >Complete Life Cycle Solutions</span
          >
        </div>
        <h1
          class="mb-4 sm:mb-6 max-w-4xl font-display text-2xl sm:text-4xl font-bold leading-[1.1] text-white lg:text-5xl"
        >
          Expert Electrical Equipment <span class="text-brand-500">Services</span>
        </h1>
        <p class="mb-6 sm:mb-8 max-w-2xl text-base sm:text-lg leading-relaxed text-white/60">
          From emergency field repairs to complete remanufacturing, Circuit Breaker Sales delivers
          full life-cycle support for your electrical power distribution systems.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <UButton to="/contact" size="lg" color="primary" class="w-full sm:w-auto justify-center"
            >Request a Service Quote</UButton
          >
          <UButton
            href="tel:8002325809"
            size="lg"
            variant="outline"
            color="neutral"
            class="w-full sm:w-auto justify-center"
          >
            <template #leading><UIcon name="i-lucide-phone" class="size-4" /></template>
            800-232-5809
          </UButton>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="bg-default">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:py-20">
        <div class="mb-8 sm:mb-12 text-center">
          <h2 class="mb-3 font-display text-2xl sm:text-3xl font-bold text-default">
            Our Service Offerings
          </h2>
          <p class="mx-auto max-w-2xl text-dimmed">
            Circuit Breaker Sales provides a comprehensive suite of services to keep your electrical
            infrastructure operating safely and reliably.
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <NuxtLink
            v-for="service in services"
            :key="service.slug"
            :to="service.slug"
            class="group light-card accent-border rounded-xl p-5 sm:p-8 transition-all duration-300"
          >
            <div class="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand-600/10">
              <UIcon :name="service.icon" class="size-6 text-brand-500" />
            </div>
            <h3
              class="mb-2 font-display text-xl font-semibold text-default group-hover:text-brand-600 transition-colors"
            >
              {{ service.title }}
            </h3>
            <p class="mb-4 text-sm leading-relaxed text-dimmed">{{ service.description }}</p>
            <ul class="space-y-1.5">
              <li
                v-for="item in service.highlights"
                :key="item"
                class="flex items-center gap-2 text-xs text-dimmed"
              >
                <UIcon name="i-lucide-circle-check" class="size-3.5 shrink-0 text-brand-600" />
                {{ item }}
              </li>
            </ul>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why CBS for Services -->
    <section class="bg-muted border-y border-default">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:py-20">
        <div class="mb-8 sm:mb-12 text-center">
          <h2 class="mb-3 font-display text-2xl sm:text-3xl font-bold text-default">
            Why Choose CBS Services
          </h2>
        </div>
        <div class="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
          <div
            v-for="reason in reasons"
            :key="reason.title"
            class="light-card rounded-xl p-4 sm:p-6 text-center"
          >
            <p class="mb-1 sm:mb-2 font-display text-2xl sm:text-3xl font-bold text-brand-600">
              {{ reason.stat }}
            </p>
            <h3 class="mb-0.5 sm:mb-1 font-display text-xs sm:text-sm font-semibold text-default">
              {{ reason.title }}
            </h3>
            <p class="text-[10px] sm:text-xs text-dimmed">{{ reason.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-default">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:py-20">
        <div class="rounded-2xl bg-muted p-6 sm:p-8 text-center lg:p-12">
          <h2 class="mb-3 font-display text-xl sm:text-2xl font-bold text-default lg:text-3xl">
            Need Emergency Service?
          </h2>
          <p class="mb-5 sm:mb-6 text-sm sm:text-base text-dimmed">
            Our technicians are available 24/7 for emergency electrical equipment repair and
            replacement.
          </p>
          <div
            class="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4"
          >
            <UButton
              to="/services/emergency-response"
              size="lg"
              color="primary"
              class="w-full sm:w-auto justify-center"
              >Emergency Services</UButton
            >
            <UButton
              to="/contact"
              size="lg"
              variant="outline"
              color="neutral"
              class="w-full sm:w-auto justify-center"
              >Schedule Service</UButton
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
