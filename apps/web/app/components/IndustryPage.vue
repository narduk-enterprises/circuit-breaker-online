<script setup lang="ts">
const props = defineProps<{
  breadcrumb: string
  title: string
  titleHighlight: string
  description: string
  accentColor: string
  solutions: { title: string; icon: string; description: string }[]
  services: string[]
}>()

const accentTextClass = computed(() => {
  return `text-${props.accentColor}`
})
</script>

<template>
  <div>
    <section class="gradient-industrial hero-grid relative overflow-hidden">
      <div
        class="absolute inset-0 bg-linear-to-b from-brand-950/20 via-transparent to-transparent"
      />
      <div class="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:pb-20 sm:pt-28">
        <div class="mb-4 flex items-center gap-2">
          <NuxtLink
            to="/industries"
            class="font-display text-xs font-semibold uppercase tracking-[0.2em]"
            :class="accentTextClass"
            >Industries</NuxtLink
          >
          <UIcon name="i-lucide-chevron-right" class="size-3 text-white/50" />
          <span
            class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
            >{{ breadcrumb }}</span
          >
        </div>
        <h1
          class="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl"
        >
          {{ title }} <span :class="accentTextClass">{{ titleHighlight }}</span>
        </h1>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-white/70">{{ description }}</p>
        <UButton to="/contact" size="lg" color="primary">Discuss Your Project</UButton>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-20">
      <div class="grid gap-12 lg:grid-cols-3">
        <div class="lg:col-span-2 space-y-8">
          <div>
            <h2 class="mb-6 font-display text-xl font-semibold text-default">
              Equipment & Solutions
            </h2>
            <div class="grid gap-4 sm:grid-cols-2">
              <div v-for="sol in solutions" :key="sol.title" class="light-card rounded-xl p-5">
                <UIcon :name="sol.icon" class="mb-2 size-5" :class="accentTextClass" />
                <h3 class="mb-1 font-display text-sm font-semibold text-default">
                  {{ sol.title }}
                </h3>
                <p class="text-xs leading-relaxed text-dimmed">{{ sol.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="light-card border-default rounded-xl p-6">
            <h3
              class="mb-4 font-display text-sm font-semibold uppercase tracking-wider"
              :class="accentTextClass"
            >
              Services
            </h3>
            <ul class="space-y-2.5 text-sm text-muted">
              <li v-for="s in services" :key="s" class="flex items-start gap-2">
                <UIcon
                  name="i-lucide-circle-check"
                  class="mt-0.5 size-4 shrink-0"
                  :class="accentTextClass"
                />
                <span>{{ s }}</span>
              </li>
            </ul>
          </div>
          <div class="light-card rounded-xl p-6">
            <h3
              class="mb-3 font-display text-sm font-semibold uppercase tracking-wider"
              :class="accentTextClass"
            >
              Contact Us
            </h3>
            <p class="mb-4 text-sm text-dimmed">Let's discuss your equipment needs.</p>
            <ULink
              to="tel:8002325809"
              class="flex items-center gap-2 text-sm font-medium text-default hover:text-brand-500"
            >
              <UIcon name="i-lucide-phone" class="size-4" :class="accentTextClass" />
              800-232-5809
            </ULink>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 pb-20">
      <div class="rounded-2xl bg-muted p-8 text-center sm:p-12">
        <h2 class="mb-3 font-display text-2xl font-bold text-default">
          Let's Discuss Your Project
        </h2>
        <p class="mb-6 text-dimmed">
          Our team has deep experience in your industry. Tell us what you need.
        </p>
        <UButton to="/contact" size="lg" color="primary">Contact Our Team</UButton>
      </div>
    </section>
  </div>
</template>
