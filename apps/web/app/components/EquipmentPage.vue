<script setup lang="ts">
defineProps<{
  breadcrumb: string
  title: string
  titleHighlight: string
  description: string
  catalogLink: string
  catalogLabel: string
  contentTitle: string
  contentParagraphs: string[]
  types?: { name: string; description: string }[]
  brands?: string[]
  services?: string[]
}>()
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="gradient-industrial hero-grid relative overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-b from-brand-950/20 via-transparent to-transparent" />
      <div class="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div class="mb-4 flex items-center gap-2">
          <NuxtLink to="/equipment" class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-500 hover:text-brand-400">Equipment</NuxtLink>
          <UIcon name="i-lucide-chevron-right" class="size-3 text-white/50" />
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{{ breadcrumb }}</span>
        </div>
        <h1 class="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
          {{ title }} <span class="text-brand-500">{{ titleHighlight }}</span>
        </h1>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-white/70">{{ description }}</p>
        <div class="flex flex-wrap gap-4">
          <UButton :to="catalogLink" size="lg" color="primary">{{ catalogLabel }}</UButton>
          <UButton to="/contact" size="lg" variant="outline" color="neutral">Request a Quote</UButton>
        </div>
      </div>
    </section>

    <!-- Content Grid -->
    <section class="mx-auto max-w-7xl px-4 py-20">
      <div class="grid gap-12 lg:grid-cols-3">
        <div class="lg:col-span-2 space-y-8">
          <div class="light-card rounded-xl p-8">
            <h2 class="mb-4 font-display text-xl font-semibold text-default">{{ contentTitle }}</h2>
            <div class="space-y-4 text-sm leading-relaxed text-muted">
              <p v-for="(p, i) in contentParagraphs" :key="i">{{ p }}</p>
            </div>
          </div>

          <div v-if="types?.length">
            <h2 class="mb-6 font-display text-xl font-semibold text-default">Types We Carry</h2>
            <div class="grid gap-4 sm:grid-cols-2">
              <div v-for="type in types" :key="type.name" class="light-card rounded-xl p-5">
                <h3 class="mb-1 font-display text-sm font-semibold text-default">{{ type.name }}</h3>
                <p class="text-xs leading-relaxed text-dimmed">{{ type.description }}</p>
              </div>
            </div>
          </div>

          <div v-if="brands?.length">
            <h2 class="mb-6 font-display text-xl font-semibold text-default">Brands</h2>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div v-for="brand in brands" :key="brand" class="light-card rounded-lg p-3 text-center">
                <span class="text-sm font-medium text-default">{{ brand }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <div v-if="services?.length" class="light-card border-default rounded-xl p-6">
            <h3 class="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-brand-500">Related Services</h3>
            <ul class="space-y-2.5 text-sm text-dimmed">
              <li v-for="s in services" :key="s" class="flex items-start gap-2">
                <UIcon name="i-lucide-circle-check" class="mt-0.5 size-4 shrink-0 text-brand-500" />
                <span>{{ s }}</span>
              </li>
            </ul>
            <UButton to="/services/shop-services" color="primary" block class="mt-6" size="sm">View Shop Services</UButton>
          </div>

          <div class="light-card rounded-xl p-6">
            <h3 class="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-brand-500">Need Help?</h3>
            <p class="mb-4 text-sm text-dimmed">Our engineers can help you find the right equipment for your application.</p>
            <div class="space-y-2 text-sm text-dimmed">
              <ULink to="tel:8002325809" class="flex items-center gap-2 hover:text-brand-500 text-dimmed">
                <UIcon name="i-lucide-phone" class="size-4 text-brand-600" />
                800-232-5809
              </ULink>
              <ULink to="mailto:sales@circuitbreaker.com" class="flex items-center gap-2 hover:text-brand-500 text-dimmed">
                <UIcon name="i-lucide-mail" class="size-4 text-brand-600" />
                sales@circuitbreaker.com
              </ULink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mx-auto max-w-7xl px-4 pb-20">
      <div class="rounded-2xl bg-muted p-8 text-center sm:p-12">
        <h2 class="mb-3 font-display text-2xl font-bold text-default">Need a Quote?</h2>
        <p class="mb-6 text-dimmed">Tell us what you need — we'll find it fast.</p>
        <UButton to="/contact" size="lg" color="primary">Get a Quote</UButton>
      </div>
    </section>
  </div>
</template>
