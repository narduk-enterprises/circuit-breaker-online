<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const articlesData: Record<
  string,
  {
    title: string
    category: string
    excerpt: string
    content: string
    relatedLinks: { to: string; label: string }[]
  }
> = {
  'circuit-breaker-maintenance-guide': {
    title: 'The Complete Guide to Circuit Breaker Maintenance',
    category: 'Maintenance',
    excerpt:
      'Essential maintenance intervals, testing procedures, and best practices for extending circuit breaker life.',
    content: `<h2>Why Circuit Breaker Maintenance Matters</h2>
<p>Circuit breakers are the last line of defense in electrical power systems. When a fault occurs, the breaker must operate correctly — often after sitting idle for years or even decades. Without regular maintenance, mechanical linkages can seize, contacts can weld, and trip units can drift out of calibration.</p>
<h2>Recommended Maintenance Intervals</h2>
<p><strong>Annual:</strong> Visual inspection, verify trip unit settings, check for signs of overheating, verify proper lubrication, exercise (open/close) the breaker several times.</p>
<p><strong>Every 3-5 Years:</strong> Primary injection testing of trip unit, contact resistance measurements, insulation resistance testing, mechanical timing tests, and thorough cleaning.</p>
<p><strong>Every 5-10 Years:</strong> Complete overhaul including disassembly, inspection of arc chutes, replacement of worn contacts, spring charging mechanism inspection, and full functional testing.</p>
<h2>Key Testing Procedures</h2>
<p>The most important tests for power circuit breakers include: primary current injection testing to verify trip unit accuracy, contact resistance (micro-ohm) testing to assess contact condition, insulation resistance (megger) testing to verify dielectric integrity, and mechanical timing tests to confirm proper operating speed.</p>
<h2>When to Replace vs. Recondition</h2>
<p>Reconditioning is typically the right choice when the breaker frame is structurally sound and replacement parts are available. Full replacement is recommended when the breaker has reached its end-of-life cycle, has been involved in a fault event beyond its rating, or when parts are no longer available.</p>`,
    relatedLinks: [
      { to: '/services/shop-services', label: 'Shop Repair Services' },
      { to: '/services/field-services', label: 'On-Site Maintenance' },
      { to: '/equipment/circuit-breakers', label: 'Circuit Breaker Inventory' },
    ],
  },
  'arc-flash-safety-guide': {
    title: 'Understanding Arc Flash Hazards & NFPA 70E Compliance',
    category: 'Safety',
    excerpt:
      'A practical guide to arc flash hazard analysis, PPE requirements, and engineering controls.',
    content: `<h2>What is Arc Flash?</h2>
<p>An arc flash is an explosive release of energy caused by an electrical arc fault. Arc flash temperatures can reach 35,000°F — four times the surface temperature of the sun. The resulting blast can cause severe burns, hearing damage, and even fatalities. Understanding and mitigating arc flash hazards is a critical safety priority in any facility with electrical equipment.</p>
<h2>NFPA 70E Requirements</h2>
<p>NFPA 70E, the Standard for Electrical Safety in the Workplace, requires employers to perform an arc flash hazard analysis, implement an electrical safety program, provide appropriate PPE, and establish approach boundaries for qualified and unqualified workers.</p>
<h2>Arc Flash Mitigation Strategies</h2>
<p><strong>Engineering Controls:</strong> These are the most effective and include: arc flash relays that detect and clear faults in milliseconds, zone-selective interlocking (ZSI) between upstream and downstream protective devices, bus differential protection for fast fault clearing, and maintenance switches that temporarily lower trip settings during maintenance.</p>
<p><strong>Equipment Solutions:</strong> Remote racking devices allow operators to rack circuit breakers from outside the arc flash boundary. Arc-resistant switchgear is designed to redirect arc flash energy safely. Current-limiting fuses and breakers reduce let-through energy.</p>
<h2>PPE Categories</h2>
<p>NFPA 70E defines PPE categories based on incident energy levels, from Category 1 (4 cal/cm²) requiring basic arc-rated clothing to Category 4 (40 cal/cm²) requiring full arc flash suits with hoods and face shields.</p>`,
    relatedLinks: [
      { to: '/equipment/remote-racking', label: 'Remote Racking Systems' },
      { to: '/services/field-services', label: 'Arc Flash Studies' },
      { to: '/services/engineered-solutions', label: 'Engineering Solutions' },
    ],
  },
  'switchgear-modernization': {
    title: 'Switchgear Modernization: Retrofill vs. Replace',
    category: 'Engineering',
    excerpt:
      'Evaluate the costs, benefits, and technical considerations of retrofilling obsolete switchgear.',
    content: `<h2>The Modernization Challenge</h2>
<p>Millions of switchgear lineups across North America are reaching 30, 40, or even 50+ years of age. Many contain circuit breakers that are no longer manufactured, with replacement parts becoming increasingly scarce and expensive. Facility managers face a critical decision: retrofill the existing enclosures with modern breakers, or replace the entire lineup.</p>
<h2>What is Retrofill?</h2>
<p>Retrofill (also called retrofitting or backlift) involves removing obsolete circuit breakers from existing switchgear enclosures and installing modern replacements that are engineered to fit the same space. This preserves the existing bus work, enclosure, and wiring while providing modern protection and control capabilities.</p>
<h2>Retrofill Advantages</h2>
<p>Retrofill typically costs 40-60% less than full replacement. It can be completed in significantly less downtime — often during a weekend shutdown rather than weeks of construction. It eliminates the need for demolition, foundation work, and re-routing of cables and bus connections.</p>
<h2>When Full Replacement is Better</h2>
<p>Full replacement is recommended when the switchgear enclosure is physically damaged, corroded, or has experienced a significant fault event. It's also preferred when the bus ratings need to be increased, the physical configuration needs to change, or code requirements mandate specific enclosure ratings that the existing lineup cannot meet.</p>`,
    relatedLinks: [
      { to: '/services/engineered-solutions', label: 'Engineered Solutions' },
      { to: '/equipment/switchgear', label: 'Switchgear Inventory' },
      { to: '/equipment/circuit-breakers', label: 'Circuit Breaker Options' },
    ],
  },
  'vacuum-interrupter-testing': {
    title: "Vacuum Interrupter Testing: Why HiPot Isn't Enough",
    category: 'Testing',
    excerpt: 'Why MAC testing provides a more reliable assessment of vacuum interrupter health.',
    content: `<h2>The Problem with HiPot Testing</h2>
<p>High-potential (HiPot) testing has been the traditional method for evaluating vacuum interrupter condition. The test applies a voltage across the open contacts to check for dielectric breakdown. However, HiPot testing has a significant limitation: it can only detect a complete loss of vacuum, missing interrupters that are deteriorating but haven't yet failed completely.</p>
<h2>Magnetron Atmospheric Condition (MAC) Testing</h2>
<p>MAC testing uses the magnetron atmospheric condition principle to measure the actual vacuum level inside the interrupter without opening it. By applying a controlled magnetic field and measuring the resulting current, MAC testing can detect vacuum degradation at much earlier stages than HiPot testing.</p>
<h2>Benefits of MAC Testing</h2>
<p>MAC testing can identify interrupters trending toward failure before a catastrophic in-service event. This allows planned replacement during scheduled outages rather than emergency repairs after a fault. The MAC-TS4 test unit used by Circuit Breaker Sales provides quantitative vacuum level measurements that can be trended over time.</p>
<h2>Recommended Testing Program</h2>
<p>We recommend MAC testing as part of every medium voltage vacuum circuit breaker maintenance cycle. Initial baseline measurements should be established during commissioning, with follow-up testing every 3-5 years or as indicated by operating conditions.</p>`,
    relatedLinks: [
      { to: '/equipment/vacuum-interrupters', label: 'Vacuum Interrupters' },
      { to: '/services/shop-services', label: 'Testing Services' },
      { to: '/services/field-services', label: 'On-Site Testing' },
    ],
  },
  'protective-relay-coordination': {
    title: 'Time-Current Coordination for Industrial Power Systems',
    category: 'Protection',
    excerpt: 'Fundamentals of protection coordination studies and selective tripping.',
    content: `<h2>What is Protection Coordination?</h2>
<p>Protection coordination (also called selectivity) ensures that when a fault occurs, only the protective device closest to the fault operates — leaving the rest of the system energized. Without proper coordination, a fault on a branch circuit could trip a main breaker and cause a complete facility outage.</p>
<h2>Time-Current Curves</h2>
<p>Protection coordination is analyzed using time-current characteristic curves (TCC). These curves plot the operating time of each protective device against fault current magnitude. By overlaying the curves of series-connected devices, engineers can verify that proper coordination margins exist throughout the system.</p>
<h2>Common Coordination Issues</h2>
<p>The most common coordination problems include: overlapping curves between upstream and downstream devices, inadequate time margins (minimum 0.3-0.4 seconds recommended), instantaneous trip conflicts where multiple devices see the same fault current, and ground fault coordination gaps in solidly grounded systems.</p>
<h2>Modern Solutions</h2>
<p>Digital protective relays and electronic trip units have significantly improved coordination capabilities. Features like zone-selective interlocking (ZSI) allow upstream devices to communicate with downstream devices, enabling faster fault clearing times while maintaining selectivity.</p>`,
    relatedLinks: [
      { to: '/equipment/protective-relays', label: 'Protective Relays' },
      { to: '/services/engineered-solutions', label: 'Engineering Services' },
      { to: '/services/field-services', label: 'Relay Commissioning' },
    ],
  },
  'transformer-maintenance-guide': {
    title: 'Power Transformer Maintenance: Oil Analysis & Beyond',
    category: 'Maintenance',
    excerpt: 'Essential transformer maintenance practices including dissolved gas analysis.',
    content: `<h2>Why Transformer Maintenance is Critical</h2>
<p>Power transformers represent some of the most expensive and longest-lead-time assets in any electrical distribution system. A transformer failure can take months to replace and cost hundreds of thousands of dollars — not including production losses. Proactive maintenance is essential to maximize transformer life and prevent catastrophic failures.</p>
<h2>Dissolved Gas Analysis (DGA)</h2>
<p>DGA is the single most important diagnostic tool for oil-filled transformers. By analyzing the gases dissolved in transformer oil, technicians can detect developing faults long before they cause visible symptoms or failure. Key gases include hydrogen (indicating partial discharge), ethylene and ethane (indicating thermal faults), and acetylene (indicating arcing).</p>
<h2>Oil Quality Testing</h2>
<p>Beyond DGA, routine oil quality testing should include: dielectric breakdown voltage, moisture content, acidity (neutralization number), interfacial tension, power factor, and dissolved metals. These tests help assess the overall condition of the oil and insulation system.</p>
<h2>Load Tap Changer Maintenance</h2>
<p>Load tap changers (LTCs) are the most maintenance-intensive component of a transformer. They should be inspected and serviced at regular intervals based on the number of operations. Key maintenance items include contact inspection and replacement, drive mechanism lubrication, and oil change in the LTC compartment.</p>`,
    relatedLinks: [
      { to: '/equipment/transformers', label: 'Transformer Inventory' },
      { to: '/equipment/load-tap-changers', label: 'LTC Parts & Service' },
      { to: '/services/field-services', label: 'On-Site Transformer Service' },
    ],
  },
}

const currentArticle = computed(() => articlesData[slug])

if (!currentArticle.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

useSeo({
  title: `${currentArticle.value.title} | Circuit Breaker Sales`,
  description: currentArticle.value.excerpt,
  type: 'article',
  keywords: [
    currentArticle.value.category,
    'circuit breaker',
    'electrical equipment',
    'technical guide',
  ],
  ogImage: {
    title: currentArticle.value.title,
    description: currentArticle.value.category,
    icon: '📄',
  },
})
useBreadcrumbSchema([
  { name: 'Home', url: 'https://circuitbreaker.online/' },
  { name: 'Resources', url: 'https://circuitbreaker.online/resources' },
  { name: currentArticle.value.title, url: `https://circuitbreaker.online/resources/${slug}` },
])

// Extract FAQ pairs from article h2s for FAQ schema
const faqPairs = computed(() => {
  const content = currentArticle.value?.content || ''
  const pairs: { question: string; answer: string }[] = []
  const h2Regex = /<h2>(.*?)<\/h2>\s*([\s\S]*?)(?=<h2>|$)/g
  let match
  while ((match = h2Regex.exec(content)) !== null) {
    const question = (match[1] || '').replaceAll(/<[^>]*>/g, '').trim()
    const answer = (match[2] || '')
      .replaceAll(/<[^>]*>/g, ' ')
      .replaceAll(/\s+/g, ' ')
      .trim()
    if (question && answer) {
      pairs.push({ question, answer: answer.slice(0, 500) })
    }
  }
  return pairs
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: currentArticle.value.title,
        description: currentArticle.value.excerpt,
        author: { '@type': 'Organization', name: 'Circuit Breaker Sales' },
        publisher: {
          '@type': 'Organization',
          name: 'Circuit Breaker Sales',
          url: 'https://circuitbreaker.online',
        },
      }),
    },
    // FAQ schema — enables "People Also Ask" rich results
    ...(faqPairs.value.length > 0
      ? [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqPairs.value.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
          },
        ]
      : []),
  ],
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
            to="/resources"
            class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-500 hover:text-brand-400"
            >Resources</NuxtLink
          >
          <UIcon name="i-lucide-chevron-right" class="size-3 text-white/70" />
          <span
            class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/60"
            >{{ currentArticle?.category }}</span
          >
        </div>
        <h1
          class="mb-6 max-w-4xl font-display text-3xl font-bold leading-[1.15] text-white sm:text-4xl"
        >
          {{ currentArticle?.title }}
        </h1>
        <p class="max-w-2xl text-lg leading-relaxed text-white/60">{{ currentArticle?.excerpt }}</p>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-16">
      <div class="grid gap-12 lg:grid-cols-3">
        <article class="lg:col-span-2 prose prose-gray max-w-none">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div
            class="light-card rounded-xl p-8 text-sm leading-relaxed text-muted"
            v-html="currentArticle?.content"
          />
        </article>

        <aside class="space-y-6">
          <div class="light-card border-brand-600/20 rounded-xl p-6">
            <h3
              class="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-brand-500"
            >
              Related Services
            </h3>
            <ul class="space-y-2 text-sm text-muted">
              <li v-for="link in currentArticle?.relatedLinks" :key="link.to">
                <NuxtLink :to="link.to" class="flex items-center gap-2 hover:text-brand-600">
                  <UIcon name="i-lucide-arrow-right" class="size-3 text-brand-600" />
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="light-card rounded-xl p-6">
            <h3
              class="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-brand-500"
            >
              Need Expert Help?
            </h3>
            <p class="mb-4 text-sm text-dimmed">
              Our engineering team can help with your specific application.
            </p>
            <UButton to="/contact" color="primary" block size="sm">Contact an Engineer</UButton>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
