<script setup lang="ts">
useSeo({
  title: 'Technical Videos — Circuit Breaker Testing & Maintenance | Circuit Breaker Sales',
  description: 'Watch circuit breaker assembly timelapses, slow-motion breaker operations, and technical demonstrations from Circuit Breaker Sales — a Group CBS company.',
  ogImage: {
    title: 'Technical Video Library',
    description: 'Circuit Breaker Assembly, Testing & Demonstrations',
    icon: '🎬',
  },
})

useBreadcrumbSchema([
  { name: 'Home', url: 'https://circuitbreaker.online/' },
  { name: 'Videos', url: 'https://circuitbreaker.online/videos' },
])

interface Video {
  id: string
  title: string
  description: string
  views: string
  date: string
  category: string
}

const playingVideoId = ref<string | null>(null)
const activeCategory = ref('all')

const allVideos: Video[] = [
  // Slow Motion — Circuit Breaker Operations
  { id: 'R5AxGp_cFqk', title: 'GE Power Break II — Slow Motion Operation', description: 'Watch a GE Power Break II circuit breaker operate in stunning slow motion. See the precise mechanism action that makes these breakers reliable.', views: '3K views', date: '9 years ago', category: 'Slow Motion' },
  { id: 'TBb27l1tTQM', title: 'Merlin Gerin FG2 — Slow Motion', description: 'Slow-motion capture of a Merlin Gerin FG2 vacuum circuit breaker tripping. An impressive display of mechanical engineering.', views: '3.3K views', date: '9 years ago', category: 'Slow Motion' },
  { id: 'JEJcMvXNC0I', title: 'Merlin Gerin FB4 — Slow Motion', description: 'CBS Service Shop captures a Merlin Gerin FB4 circuit breaker mechanism in slow motion.', views: '1.2K views', date: '9 years ago', category: 'Slow Motion' },
  { id: '0IGcqKnIvXg', title: 'GE AL-2-100 — Slow Motion', description: 'A GE AL-2-100 circuit breaker in slow-motion operation. These medium voltage breakers are workhorses of industrial distribution.', views: '417 views', date: '9 years ago', category: 'Slow Motion' },
  { id: 'YcMeluL6VHY', title: 'Hyundai HVF3167F — Slow Motion', description: 'Slow-motion footage of a Hyundai HVF3167F vacuum circuit breaker operating at our service shop.', views: '480 views', date: '9 years ago', category: 'Slow Motion' },
  { id: 'rLdYsNPuDak', title: 'Terasaki AT 12 — Slow Motion', description: 'Watch a Terasaki AT 12 air circuit breaker mechanism in slow motion during testing at our facility.', views: '996 views', date: '9 years ago', category: 'Slow Motion' },
  { id: '8HGcdYhDXfE', title: 'GE AKR-100 — Slow Motion', description: 'GE AKR-100 low voltage power circuit breaker captured in slow motion during trip testing.', views: '238 views', date: '9 years ago', category: 'Slow Motion' },
  { id: 'kLV6hTlw8ss', title: 'Siemens 15-FSV Mechanism — Slow Motion', description: 'Siemens 15-FSV mechanism operating in slow motion. Precision engineering for medium voltage applications.', views: '570 views', date: '10 years ago', category: 'Slow Motion' },
  { id: 'rJWD_Js-osk', title: 'MaxiVac — Slow Motion', description: 'MaxiVac vacuum circuit breaker mechanism captured in slow motion at our testing facility.', views: '71 views', date: '9 years ago', category: 'Slow Motion' },
  { id: 'JEi3WtneeTQ', title: 'GE AKRU 50 — Slow Motion', description: 'GE AKRU-50 circuit breaker mechanism in high-speed slow motion capture.', views: '106 views', date: '9 years ago', category: 'Slow Motion' },

  // Timelapse — Assembly & Disassembly
  { id: 'IJ0nIwpNhJI', title: 'GE AK-F-75 Assembly — Timelapse', description: 'Watch our technicians assemble a GE AK-F-75 circuit breaker from start to finish in this time-lapse video.', views: '255 views', date: '5 years ago', category: 'Timelapse' },
  { id: 'sgK3cpIaMpU', title: 'GE AL-2-50 MO Disassembly — Timelapse', description: 'Time-lapse of our service team disassembling a GE AL-2-50 mechanically operated circuit breaker for reconditioning.', views: '511 views', date: '9 years ago', category: 'Timelapse' },
  { id: 'aUdiahXP_9A', title: 'GE AKR-75 Wiring — Timelapse', description: 'Time-lapse of the detailed wiring process on a GE AKR-75 circuit breaker at CBS Service Shop.', views: '347 views', date: '9 years ago', category: 'Timelapse' },
  { id: '2kbGoHTWy3Y', title: 'Westinghouse DS-206 Assembly', description: 'Complete assembly of a Westinghouse DS-206 circuit breaker. One of our most popular reconditioned breaker models.', views: '1.5K views', date: '12 years ago', category: 'Timelapse' },
  { id: 'nXXFRPiU5Q8', title: 'Westinghouse DS-206 Disassembly', description: 'Full disassembly of a Westinghouse DS-206 for inspection and reconditioning at our ISO 9001 certified facility.', views: '1.7K views', date: '12 years ago', category: 'Timelapse' },

  // Field & Equipment
  { id: '-BQU6PdyzDI', title: 'Tough Duty Pole Replacement', description: 'Watch our field service team replace a pole on a Tough Duty circuit breaker. Precision work in real field conditions.', views: '103 views', date: '5 years ago', category: 'Field Service' },
  { id: '0P1-CwQ2JYI', title: 'Siemens 15kV Switchhouse', description: 'A look at a Siemens 15kV switchhouse — medium voltage power distribution equipment in action.', views: '177 views', date: '9 years ago', category: 'Field Service' },
  { id: 'PnY-mFkhhEU', title: 'Trip Lever Mechanism', description: 'Detailed look at a circuit breaker trip lever mechanism during testing and adjustment.', views: '714 views', date: '12 years ago', category: 'Field Service' },
  { id: 'FmfbEuxeqlM', title: 'CBS Mobile Master-Slave Operation', description: 'Demonstration of CBS mobile remote racking master-slave control for safe circuit breaker operation.', views: '302 views', date: '13 years ago', category: 'Field Service' },

  // Shop & Company
  { id: 'BfV7BNH1ErI', title: 'Circuit Breaker Sales — Company Overview', description: 'An introduction to Circuit Breaker Sales, a Group CBS company. See our facility, team, and commitment to quality.', views: '1K views', date: '13 years ago', category: 'Company' },
  { id: 'MY8stHh8838', title: 'Raiders of the Lost Arc', description: 'A dramatic arc flash demonstration showing why proper circuit breaker maintenance and testing is critical for safety.', views: '436 views', date: '11 years ago', category: 'Shop Floor' },
  { id: 'P0gedgpMKbU', title: 'Ronnie and the Raiders of the Lost Arc', description: 'Another impressive arc flash capture from the CBS testing lab — the power of electrical equipment on full display.', views: '346 views', date: '11 years ago', category: 'Shop Floor' },
  { id: 'QlVa1UJXAlQ', title: 'Angle Grinder — Slow Motion', description: 'Slow-motion footage of an angle grinder throwing sparks during circuit breaker part fabrication.', views: '197 views', date: '10 years ago', category: 'Shop Floor' },
  { id: 'AqFaAbi2i_U', title: 'Cutting Steel — Slow Motion', description: 'High-speed camera captures steel cutting operations at our service shop in beautiful slow motion.', views: '62 views', date: '10 years ago', category: 'Shop Floor' },
  { id: 'DCUsEJv93HM', title: 'Oxygen Torch Light — Slow Motion', description: 'An oxygen torch igniting in slow motion — the craftsmanship tools behind circuit breaker reconditioning.', views: '177 views', date: '10 years ago', category: 'Shop Floor' },
]

const categories = computed(() => {
  const cats = [{ label: 'All Videos', value: 'all', count: allVideos.length }]
  const grouped = new Map<string, number>()
  for (const v of allVideos) {
    grouped.set(v.category, (grouped.get(v.category) || 0) + 1)
  }
  for (const [cat, count] of grouped) {
    cats.push({ label: cat, value: cat, count })
  }
  return cats
})

const featuredVideo = computed(() => allVideos[0])

const filteredVideos = computed(() => {
  const list = activeCategory.value === 'all'
    ? allVideos
    : allVideos.filter(v => v.category === activeCategory.value)
  // Exclude the featured video from the grid when showing all
  if (activeCategory.value === 'all') {
    return list.filter(v => v.id !== featuredVideo.value?.id)
  }
  return list
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Circuit Breaker Sales Technical Videos',
      itemListElement: allVideos.map((v, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'VideoObject',
          name: v.title,
          description: v.description,
          thumbnailUrl: `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`,
          contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
        },
      })),
    }),
  }],
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="gradient-industrial hero-grid relative overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-b from-brand-950/20 via-transparent to-transparent" />
      <div class="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:pb-24 sm:pt-28">
        <div class="mb-4 flex items-center gap-2">
          <div class="h-px w-8 bg-brand-600" />
          <span class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">Video Library</span>
        </div>
        <h1 class="mb-6 max-w-4xl font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
          Watch Our <span class="text-brand-500">Team in Action</span>
        </h1>
        <p class="mb-8 max-w-2xl text-lg leading-relaxed text-white/60">
          Time-lapse assemblies, slow-motion circuit breaker operations, and behind-the-scenes looks at our shop floor. See the craftsmanship behind every reconditioned breaker.
        </p>
      </div>
    </section>

    <!-- Filter Tabs -->
    <div class="border-b border-default bg-default/90 backdrop-blur-sm sticky top-16 z-10">
      <div class="mx-auto max-w-7xl px-4">
        <div class="flex gap-1 overflow-x-auto py-3 scrollbar-none">
          <UButton
            v-for="cat in categories"
            :key="cat.value"
            size="md"
            :variant="activeCategory === cat.value ? 'solid' : 'ghost'"
            :color="activeCategory === cat.value ? 'primary' : 'neutral'"
            class="shrink-0 font-medium whitespace-nowrap"
            @click="activeCategory = cat.value"
          >
            {{ cat.label }}
            <template #trailing>
              <span class="text-xs opacity-60">{{ cat.count }}</span>
            </template>
          </UButton>
        </div>
      </div>
    </div>

    <!-- Featured Video -->
    <section v-if="featuredVideo && activeCategory === 'all'" class="border-b border-default bg-muted py-10">
      <div class="mx-auto max-w-7xl px-4">
        <div class="grid gap-8 lg:grid-cols-5">
          <div class="lg:col-span-3">
            <div class="aspect-video overflow-hidden rounded-xl border border-default bg-muted shadow-2xl">
              <iframe
                v-if="playingVideoId === featuredVideo.id"
                :src="`https://www.youtube.com/embed/${featuredVideo.id}?autoplay=1&rel=0`"
                class="size-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
              <UButton
                v-if="featuredVideo"
                variant="link"
                color="neutral"
                class="group relative size-full p-0"
                @click="playingVideoId = featuredVideo?.id"
              >
                <img
                  :src="`https://img.youtube.com/vi/${featuredVideo?.id}/maxresdefault.jpg`"
                  :alt="featuredVideo?.title"
                  class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  @error="(e: Event) => { const img = e.target as HTMLImageElement; img.src = `https://img.youtube.com/vi/${featuredVideo?.id}/hqdefault.jpg` }"
                />
                <div class="absolute inset-0 flex items-center justify-center bg-muted/30 transition-colors group-hover:bg-muted/20">
                  <div class="flex size-16 items-center justify-center rounded-full bg-brand-600 text-default shadow-lg shadow-brand-600/30 transition-transform group-hover:scale-110">
                    <UIcon v-if="featuredVideo" name="i-lucide-play" class="ml-1 size-7" />
                  </div>
                </div>
              </UButton>
            </div>
          </div>
          <div class="flex flex-col justify-center lg:col-span-2">
            <span class="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-500">
              <UIcon name="i-lucide-star" class="size-3.5" />
              Featured Video
            </span>
            <h2 class="font-display text-2xl font-bold text-default">{{ featuredVideo.title }}</h2>
            <p class="mt-3 text-sm leading-relaxed text-muted">{{ featuredVideo.description }}</p>
            <div class="mt-4 flex items-center gap-4 text-xs text-dimmed">
              <span class="flex items-center gap-1">
                <UIcon name="i-lucide-eye" class="size-3.5" />
                {{ featuredVideo.views }}
              </span>
              <span class="rounded-full bg-muted px-2 py-0.5 text-muted">{{ featuredVideo.category }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Grid -->
    <section class="mx-auto max-w-7xl px-4 py-12">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="video in filteredVideos"
          :key="video.id"
          class="light-card group overflow-hidden rounded-xl transition-all duration-300 hover:border-brand-600/30 hover:shadow-lg hover:shadow-brand-600/5"
        >
          <!-- Thumbnail -->
          <div class="relative aspect-video overflow-hidden bg-muted">
            <iframe
              v-if="playingVideoId === video.id"
              :src="`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`"
              class="size-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
            <UButton
              v-else
              variant="link"
              color="neutral"
              class="relative size-full p-0"
              @click="playingVideoId = video.id"
            >
              <img
                :src="`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`"
                :alt="video.title"
                class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 flex items-center justify-center bg-muted/20 transition-colors group-hover:bg-muted/10">
                <div class="flex size-12 items-center justify-center rounded-full bg-brand-600/90 text-default shadow-lg transition-transform group-hover:scale-110">
                  <UIcon name="i-lucide-play" class="ml-0.5 size-5" />
                </div>
              </div>
              <!-- Category badge -->
              <div class="absolute bottom-2 right-2 rounded bg-muted/80 px-1.5 py-0.5 text-xs font-medium text-default backdrop-blur-sm">
                {{ video.category }}
              </div>
            </UButton>
          </div>

          <!-- Info -->
          <div class="p-5">
            <span class="mb-1.5 inline-block rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-600">
              {{ video.category }}
            </span>
            <h3 class="mb-1.5 font-display text-sm font-semibold leading-snug text-default transition-colors group-hover:text-brand-600">
              {{ video.title }}
            </h3>
            <p class="line-clamp-2 text-xs leading-relaxed text-muted">
              {{ video.description }}
            </p>
            <div class="mt-3 flex items-center justify-between text-xs text-dimmed">
              <span class="flex items-center gap-1">
                <UIcon name="i-lucide-eye" class="size-3" />
                {{ video.views }}
              </span>
              <span>{{ video.date }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredVideos.length === 0" class="py-20 text-center">
        <UIcon name="i-lucide-video" class="mx-auto size-12 text-dimmed" />
        <p class="mt-4 text-muted">No videos in this category yet.</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="mx-auto max-w-7xl px-4 pb-20">
      <div class="rounded-2xl bg-muted p-8 text-center sm:p-12">
        <h2 class="mb-3 font-display text-2xl font-bold text-default">Want to See More?</h2>
        <p class="mb-6 text-dimmed">
          Subscribe to our YouTube channel for the latest circuit breaker assembly videos, shop tours, and technical demonstrations.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <UButton
            to="https://www.youtube.com/@CircuitBreakerSales"
            target="_blank"
            color="primary"
            size="lg"
            icon="i-lucide-play-circle"
          >
            Subscribe on YouTube
          </UButton>
          <UButton to="/contact" variant="outline" color="neutral" size="lg">
            Request a Quote
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
