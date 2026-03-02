<script setup lang="ts">
useSeo({
  title: 'About Us | Circuit Breaker Sales',
  description: 'Circuit Breaker Sales is a Group CBS company providing new and reconditioned circuit breakers, switchgear, transformers, and industrial power equipment since 1981.',
  ogImage: {
    title: 'About Circuit Breaker Sales',
    description: 'A Group CBS Company — Since 1981',
    icon: '🏭',
  },
})

useWebPageSchema({ type: 'AboutPage', name: 'About Circuit Breaker Sales', description: 'A Group CBS company providing industrial power equipment since 1981.' })

const capabilities = [
  {
    title: 'Equipment Sales',
    icon: 'i-lucide-shopping-cart',
    description: 'New and reconditioned circuit breakers, switchgear, transformers, and more.',
    link: '/equipment',
  },
  {
    title: 'Reconditioning',
    icon: 'i-lucide-wrench',
    description: 'Factory-level reconditioning and testing to OEM specifications.',
    link: '/services/shop-services',
  },
  {
    title: 'Field Services',
    icon: 'i-lucide-truck',
    description: 'On-site installation, maintenance, and emergency repair services.',
    link: '/services/field-services',
  },
  {
    title: 'Engineering',
    icon: 'i-lucide-checkalculator',
    description: 'Technical consultation and engineering support for your power systems.',
    link: '/services/engineered-solutions',
  },
]
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="mb-2 font-display text-3xl font-bold text-default">About Circuit Breaker Sales</h1>
      <div class="h-1 w-16 rounded bg-brand-600" />
    </div>

    <div class="grid gap-12 lg:grid-cols-3">
      <!-- Main Content -->
      <div class="space-y-8 lg:col-span-2">
        <div class="light-card accent-border rounded-xl p-8">
          <h2 class="mb-4 font-display text-xl font-semibold text-default">A Group CBS Company</h2>
          <div class="space-y-4 text-base leading-relaxed text-muted">
            <p>
              Circuit Breaker Sales has been a trusted name in industrial power equipment since 1981.
              As a proud member of the Group CBS family of companies, we provide one of the largest
              inventories of new and reconditioned circuit breakers, switchgear, transformers, and renewal
              parts in North America.
            </p>
            <p>
              Our factory-trained technicians restore equipment to OEM specifications, backed by
              comprehensive testing and quality assurance programs. We serve utilities, industrial
              facilities, contractors, and electrical distributors nationwide with the reliability
              and expertise that over 40 years of experience provides.
            </p>
            <p>
              Whether you need a single replacement breaker or a complete substation package, our team
              of engineers and sales professionals will work with you to find the right solution at a
              competitive price — with the fast turnaround your operations demand.
            </p>
          </div>
        </div>

        <!-- Capabilities -->
        <div>
          <h2 class="mb-6 font-display text-xl font-semibold text-default">Our Capabilities</h2>
          <div class="grid gap-4 sm:grid-cols-2">
            <NuxtLink v-for="cap in capabilities" :key="cap.title" :to="cap.link" class="group light-card rounded-xl p-5 transition-all duration-300 hover:border-brand-600/30 hover:shadow-lg hover:shadow-brand-600/5">
              <div class="mb-3 flex size-9 items-center justify-center rounded-lg bg-brand-600/10">
                <UIcon :name="cap.icon" class="size-5 text-brand-500" />
              </div>
              <h3 class="mb-1 font-display text-sm font-semibold text-default group-hover:text-brand-600 transition-colors">{{ cap.title }}</h3>
              <p class="text-sm leading-relaxed text-dimmed">{{ cap.description }}</p>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <div class="rounded-xl border border-default bg-muted p-6">
          <h3 class="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-brand-600">Contact Us</h3>
          <div class="space-y-3 text-base text-muted">
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-phone" class="size-4 text-brand-600" />
              <ULink to="tel:8002325809" class="hover:text-brand-600">800-232-5809</ULink>
            </div>
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-mail" class="size-4 text-brand-600" />
              <ULink to="mailto:sales@circuitbreaker.com" class="hover:text-brand-600">sales@circuitbreaker.com</ULink>
            </div>
          </div>
          <UButton to="/contact" color="primary" block class="mt-6" size="lg">
            Request a Quote
          </UButton>
        </div>

        <div class="rounded-xl border border-default bg-default p-6">
          <h3 class="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-brand-600">Key Facts</h3>
          <ul class="space-y-2.5 text-base text-muted">
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-circle-check-circle" class="mt-0.5 size-4 shrink-0 text-brand-500" />
              <span>40+ years of industry experience</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-circle-check-circle" class="mt-0.5 size-4 shrink-0 text-brand-500" />
              <span>Part of the Group CBS network</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-circle-check-circle" class="mt-0.5 size-4 shrink-0 text-brand-500" />
              <span>1,000+ products in inventory</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-circle-check-circle" class="mt-0.5 size-4 shrink-0 text-brand-500" />
              <span>Factory-trained technicians</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-circle-check-circle" class="mt-0.5 size-4 shrink-0 text-brand-500" />
              <span>Nationwide service &amp; delivery</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
