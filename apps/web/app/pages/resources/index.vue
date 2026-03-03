<script setup lang="ts">
useSeoMeta({
  title: 'Resources & Knowledge Base — Technical Articles | Circuit Breaker Sales',
  description: 'Technical articles and guides on circuit breaker maintenance, arc flash safety, switchgear modernization, protective relay testing, and electrical equipment best practices.',
})

const articles = [
  { slug: 'circuit-breaker-maintenance-guide', title: 'The Complete Guide to Circuit Breaker Maintenance', excerpt: 'Learn the essential maintenance intervals, testing procedures, and best practices for extending circuit breaker life and ensuring reliable protection.', category: 'Maintenance', accentClass: 'bg-brand-600', tagClass: 'text-brand-600' },
  { slug: 'arc-flash-safety-guide', title: 'Understanding Arc Flash Hazards & NFPA 70E Compliance', excerpt: 'A practical guide to arc flash hazard analysis, PPE requirements, and engineering controls that reduce risk to electrical workers.', category: 'Safety', accentClass: 'bg-muted', tagClass: 'text-primary' },
  { slug: 'switchgear-modernization', title: 'Switchgear Modernization: Retrofill vs. Replace', excerpt: 'Evaluate the costs, benefits, and technical considerations of retrofilling obsolete switchgear versus full replacement.', category: 'Engineering', accentClass: 'bg-muted', tagClass: 'text-primary' },
  { slug: 'vacuum-interrupter-testing', title: 'Vacuum Interrupter Testing: Why HiPot Isn\'t Enough', excerpt: 'Discover why magnetron atmospheric condition (MAC) testing provides a more reliable assessment of vacuum interrupter health than traditional HiPot.', category: 'Testing', accentClass: 'bg-muted', tagClass: 'text-primary' },
  { slug: 'protective-relay-coordination', title: 'Time-Current Coordination for Industrial Power Systems', excerpt: 'Fundamentals of protection coordination studies and how to ensure selective tripping across your electrical distribution system.', category: 'Protection', accentClass: 'bg-purple-600', tagClass: 'text-purple-600' },
  { slug: 'transformer-maintenance-guide', title: 'Power Transformer Maintenance: Oil Analysis & Beyond', excerpt: 'Essential transformer maintenance practices including dissolved gas analysis, insulation testing, and load tap changer service.', category: 'Maintenance', accentClass: 'bg-brand-600', tagClass: 'text-brand-600' },
]

const topics = [
  { title: 'Equipment Maintenance', icon: 'i-lucide-wrench', description: 'Best practices for maintaining circuit breakers, switchgear, and transformers.', link: '/resources/circuit-breaker-maintenance-guide' },
  { title: 'Safety & Compliance', icon: 'i-lucide-shield-check', description: 'Arc flash safety, OSHA compliance, and NFPA 70E requirements.', link: '/resources/arc-flash-safety-guide' },
  { title: 'Engineering Guides', icon: 'i-lucide-cpu', description: 'Technical guides for modernization, retrofit, and system design.', link: '/resources/switchgear-modernization' },
  { title: 'Testing & Diagnostics', icon: 'i-lucide-bar-chart', description: 'Equipment testing methods, diagnostics, and condition assessment.', link: '/resources/vacuum-interrupter-testing' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="gradient-industrial hero-grid relative overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-b from-brand-950/20 via-transparent to-transparent" />
      <div class="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:pb-24 sm:pt-28">
        <div class="mb-4 flex items-center gap-2">
          <div class="h-px w-8 bg-brand-600" />
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">Technical Resources</span>
        </div>
        <h1 class="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
          Resources & <span class="text-brand-500">Knowledge Base</span>
        </h1>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-white/60">
          Technical articles, industry guides, and expert insights on electrical equipment maintenance,
          safety, and best practices from the Circuit Breaker Sales engineering team.
        </p>
      </div>
    </section>

    <!-- Featured Articles -->
    <section class="bg-default">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <h2 class="mb-8 font-display text-2xl font-bold text-default">Featured Articles</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="article in articles"
            :key="article.slug"
            :to="`/resources/${article.slug}`"
            class="group light-card accent-border rounded-xl overflow-hidden transition-all duration-300"
          >
            <div class="h-2" :class="article.accentClass" />
            <div class="p-6">
              <span class="mb-2 inline-block rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider" :class="article.tagClass">
                {{ article.category }}
              </span>
              <h3 class="mb-2 font-display text-base font-semibold text-default group-hover:text-brand-600 transition-colors leading-snug">
                {{ article.title }}
              </h3>
              <p class="mb-3 text-xs leading-relaxed text-dimmed">{{ article.excerpt }}</p>
              <span class="text-xs font-medium text-brand-600">Read article →</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Topic Areas -->
    <section class="bg-muted border-y border-default">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <h2 class="mb-8 font-display text-2xl font-bold text-default">Browse by Topic</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink v-for="topic in topics" :key="topic.title" :to="topic.link" class="group light-card rounded-xl p-5 transition-all duration-300 hover:border-brand-600/30 hover:shadow-lg hover:shadow-brand-600/5">
            <UIcon :name="topic.icon" class="mb-3 size-5 text-brand-500" />
            <h3 class="mb-1 font-display text-sm font-semibold text-default group-hover:text-brand-600 transition-colors">{{ topic.title }}</h3>
            <p class="mb-3 text-xs leading-relaxed text-dimmed">{{ topic.description }}</p>
            <span class="text-xs font-medium text-brand-600">Browse articles →</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-default">
      <div class="mx-auto max-w-7xl px-4 py-20">
        <div class="rounded-2xl bg-muted p-8 text-center sm:p-12">
          <h2 class="mb-3 font-display text-2xl font-bold text-default">Have a Technical Question?</h2>
          <p class="mb-6 text-dimmed">Our engineering team is available to discuss your specific application.</p>
          <UButton to="/contact" size="lg" color="primary">Contact an Engineer</UButton>
        </div>
      </div>
    </section>
  </div>
</template>
