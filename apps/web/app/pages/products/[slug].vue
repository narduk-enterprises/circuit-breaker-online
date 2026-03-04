<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const siteUrl = normalizeSiteUrl((useRuntimeConfig().public.appUrl as string) || '')

const { data: product } = await useFetch('/api/products', {
  query: { slug },
  transform: (d: any) => d,
})

if (!product.value) {
  throw createError({ statusCode: 404, message: 'Product not found' })
}

const activeImage = ref(0)

// Fetch related products for internal linking
const { data: relatedProducts } = await useFetch('/api/related-products', {
  query: { slug },
  transform: (d: any) => d?.products || [],
})

// --- Helpers ---

/** Ensure an image URL is absolute (prefix with site origin if needed). */
function absoluteImageUrl(url?: string): string | undefined {
  return toAbsoluteImageUrl(siteUrl, url)
}

/** Map product condition to Schema.org itemCondition. */
function mapCondition(condition?: string): 'NewCondition' | 'UsedCondition' | 'RefurbishedCondition' | undefined {
  if (!condition) return undefined
  const lower = condition.toLowerCase()
  if (lower.includes('new')) return 'NewCondition'
  if (lower.includes('recondition') || lower.includes('refurbish')) return 'RefurbishedCondition'
  if (lower.includes('used')) return 'UsedCondition'
  return undefined
}

// --- Derived SEO values ---
const canonicalUrl = `${siteUrl}/products/${slug}`
const productId = product.value.sku || product.value.model || product.value.name
const seoTitle = buildProductTitle(product.value)

const fallbackDescription = buildFallbackDescription(product.value)
const cleanDescription = product.value.short_description || fallbackDescription

// Absolute image URLs for SEO
const absoluteImages = (product.value.images || []).map((img: string) => absoluteImageUrl(img)).filter(Boolean) as string[]
const primaryImage = absoluteImages[0] || `${siteUrl}/images/placeholder-product.png`

// Image alt text including product ID and brand
const imageAlt = [product.value.manufacturer, product.value.name, product.value.sku].filter(Boolean).join(' - ')

// SEO — canonical, OG, Twitter, meta
useSeo({
  title: seoTitle,
  description: cleanDescription.slice(0, 320),
  image: primaryImage,
  canonicalUrl,
  keywords: [
    product.value.sku,
    product.value.model,
    product.value.manufacturer,
    product.value.category,
    product.value.type,
    'circuit breaker',
    'industrial power equipment',
  ].filter(Boolean) as string[],
  ogImage: {
    title: product.value.name,
    description: cleanDescription.slice(0, 200),
    icon: '⚡',
  },
})

// Schema.org — Product structured data (includes mpn, url, seller, itemCondition)
const schemaDescription = (product.value.short_description || product.value.description?.replaceAll(/<[^>]*>/g, '') || fallbackDescription).slice(0, 500)
useProductSchema({
  name: product.value.name,
  description: schemaDescription,
  image: absoluteImages.length > 0 ? absoluteImages : [primaryImage],
  brand: product.value.manufacturer,
  sku: product.value.sku || slug,
  mpn: product.value.sku || product.value.model,
  availability: 'InStock',
  itemCondition: mapCondition(product.value.condition),
  url: canonicalUrl,
  seller: {
    name: 'Circuit Breaker Sales',
    url: siteUrl,
  },
})

// Schema.org — Breadcrumb path
const breadcrumbItems = [
  { name: 'Home', url: `${siteUrl}/` },
  { name: 'Products', url: `${siteUrl}/products` },
]
if (product.value.category) {
  breadcrumbItems.push({
    name: product.value.category,
    url: `${siteUrl}/products/category/${useCategorySlug(product.value.category)}`,
  })
}
breadcrumbItems.push({
  name: product.value.name,
  url: canonicalUrl,
})
useBreadcrumbSchema(breadcrumbItems)
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12">
    <!-- Breadcrumb (hierarchical) -->
    <nav class="mb-6 flex items-center gap-2 text-sm text-dimmed">
      <NuxtLink to="/" class="transition-colors hover:text-default">Home</NuxtLink>
      <UIcon name="i-lucide-chevron-right" class="size-3" />
      <NuxtLink to="/products" class="transition-colors hover:text-default">Products</NuxtLink>
      <template v-if="product.category">
        <UIcon name="i-lucide-chevron-right" class="size-3" />
        <NuxtLink
          :to="`/products/category/${useCategorySlug(product.category)}`"
          class="transition-colors hover:text-default"
        >
          {{ product.category }}
        </NuxtLink>
      </template>
      <UIcon name="i-lucide-chevron-right" class="size-3" />
      <span class="truncate text-muted font-medium">{{ product.name }}</span>
    </nav>

    <div class="grid gap-10 lg:grid-cols-2">
      <!-- Image Gallery -->
      <div>
        <!-- Main Image -->
        <div class="light-card mb-4 overflow-hidden rounded-xl">
          <div class="relative aspect-square bg-muted">
            <img
              v-if="absoluteImages.length"
              :src="absoluteImages[activeImage]"
              :alt="imageAlt"
              class="h-full w-full object-contain p-4"
            />
            <div v-else class="flex h-full w-full items-center justify-center">
              <UIcon name="i-lucide-image" class="size-24 text-gray-200" />
            </div>
            <!-- Condition Badge -->
            <span
              v-if="product.condition"
              class="absolute left-3 top-3 rounded-md bg-default/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted border border-default backdrop-blur-sm"
            >
              {{ product.condition }}
            </span>
          </div>
        </div>

        <!-- Thumbnails -->
        <div v-if="absoluteImages.length > 1" class="grid grid-cols-4 gap-2">
          <button
            v-for="(img, idx) in absoluteImages"
            :key="idx"
            class="overflow-hidden rounded-lg border-2 transition-all"
            :class="activeImage === Number(idx) ? 'border-brand-600' : 'border-default hover:border-brand-300'"
            @click="activeImage = Number(idx)"
          >
            <img :src="img" :alt="`${imageAlt} - Image ${Number(idx) + 1}`" class="aspect-square object-cover" loading="lazy" />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <!-- Manufacturer -->
        <p v-if="product.manufacturer" class="text-xs font-semibold uppercase tracking-wider text-brand-600">
          {{ product.manufacturer }}
        </p>

        <!-- Name -->
        <h1 class="font-display text-2xl font-bold text-default sm:text-3xl">{{ product.name }}</h1>

        <!-- Product ID / SKU (visible near top) -->
        <p v-if="productId" class="text-sm font-mono text-muted">
          <span class="font-semibold text-dimmed">Part #:</span> {{ productId }}
        </p>

        <!-- Short Description -->
        <p v-if="product.short_description" class="text-base text-muted leading-relaxed">
          {{ product.short_description }}
        </p>

        <!-- Spec Badges -->
        <div v-if="product.voltage || product.amperage || product.type" class="flex flex-wrap gap-2">
          <span v-if="product.voltage" class="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium text-primary border border-default">
            ⚡ {{ product.voltage }}
          </span>
          <span v-if="product.amperage" class="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium text-primary border border-default">
            🔌 {{ product.amperage }}
          </span>
          <span v-if="product.type" class="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium text-primary border border-emerald-100">
            {{ product.type }}
          </span>
        </div>

        <!-- Specifications Table -->
        <div class="light-card accent-border rounded-xl p-6">
          <h2 class="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-dimmed">Specifications</h2>
          <dl class="grid grid-cols-2 gap-4">
            <div v-if="product.sku">
              <dt class="text-xs text-dimmed">SKU / Part #</dt>
              <dd class="mt-0.5 font-mono text-sm font-medium text-default">{{ product.sku }}</dd>
            </div>
            <div v-if="product.manufacturer">
              <dt class="text-xs text-dimmed">Manufacturer</dt>
              <dd class="mt-0.5 text-sm text-default">{{ product.manufacturer }}</dd>
            </div>
            <div v-if="product.model">
              <dt class="text-xs text-dimmed">Model</dt>
              <dd class="mt-0.5 text-sm text-default">{{ product.model }}</dd>
            </div>
            <div v-if="product.voltage">
              <dt class="text-xs text-dimmed">Voltage</dt>
              <dd class="mt-0.5 text-sm text-default">{{ product.voltage }}</dd>
            </div>
            <div v-if="product.amperage">
              <dt class="text-xs text-dimmed">Amperage</dt>
              <dd class="mt-0.5 text-sm text-default">{{ product.amperage }}</dd>
            </div>
            <div v-if="product.condition">
              <dt class="text-xs text-dimmed">Condition</dt>
              <dd class="mt-0.5 text-sm text-default">{{ product.condition }}</dd>
            </div>
            <div v-if="product.warranty">
              <dt class="text-xs text-dimmed">Warranty</dt>
              <dd class="mt-0.5 text-sm text-default">{{ product.warranty }}</dd>
            </div>
            <div v-if="product.category">
              <dt class="text-xs text-dimmed">Category</dt>
              <dd class="mt-0.5 text-sm">
                <NuxtLink
                  :to="`/products/category/${useCategorySlug(product.category)}`"
                  class="text-brand-600 hover:text-brand-500"
                >
                  {{ product.category }}
                </NuxtLink>
                <span v-if="product.subcategory" class="text-dimmed"> › {{ product.subcategory }}</span>
              </dd>
            </div>
          </dl>
        </div>

        <!-- CTA -->
        <div class="bg-muted border border-default rounded-xl p-6 text-center">
          <p class="mb-1 font-display text-lg font-semibold text-default">Interested in this equipment?</p>
          <p class="mb-4 text-sm text-dimmed">Get a custom quote from our engineering team</p>
          <UButton
            :to="`/contact?subject=${encodeURIComponent(product.category || 'General Inquiry')}&product=${encodeURIComponent(product.name)}`"
            color="primary"
            size="lg"
            block
          >
            Request a Quote
          </UButton>
          <ULink to="tel:8002325809" class="mt-3 flex items-center justify-center gap-2 text-sm text-dimmed transition-colors hover:text-default">
            <UIcon name="i-lucide-phone" class="size-4 text-brand-600" />
            or call 800-232-5809
          </ULink>
        </div>

        <!-- Long Description -->
        <div v-if="product.long_description" class="light-card rounded-xl p-6">
          <div class="prose prose-sm max-w-none text-muted prose-headings:text-default prose-headings:font-display prose-a:text-brand-600" v-html="product.long_description" />
        </div>

        <!-- Original Description (fallback) -->
        <div v-else-if="product.description" class="light-card rounded-xl p-6">
          <h2 class="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-dimmed">Description</h2>
          <div class="prose prose-sm max-w-none text-muted" v-html="product.description" />
        </div>

        <!-- Generated fallback description (when no real description exists) -->
        <div v-else class="light-card rounded-xl p-6">
          <h2 class="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-dimmed">About This Product</h2>
          <p class="text-sm text-muted leading-relaxed">{{ fallbackDescription }}</p>
        </div>

        <!-- Tags -->
        <div v-if="product.tags?.length" class="flex flex-wrap gap-1.5">
          <NuxtLink
            v-for="tag in product.tags"
            :key="tag"
            :to="`/products?search=${encodeURIComponent(tag)}`"
            class="inline-block rounded-full bg-muted px-3 py-1 text-xs text-dimmed transition-colors hover:bg-brand-50 hover:text-brand-600"
          >
            {{ tag }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <div v-if="relatedProducts?.length" class="mt-16">
      <h2 class="mb-6 font-display text-xl font-bold text-default">Related Products</h2>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <NuxtLink
          v-for="rp in relatedProducts"
          :key="rp.slug"
          :to="`/products/${rp.slug}`"
          class="group light-card overflow-hidden rounded-xl transition-all hover:shadow-md"
        >
          <div class="aspect-square bg-muted">
            <img
              v-if="rp.images?.length"
              :src="rp.images[0]"
              :alt="rp.name"
              class="h-full w-full object-contain p-3"
              loading="lazy"
            />
            <div v-else class="flex h-full w-full items-center justify-center">
              <UIcon name="i-lucide-image" class="size-12 text-gray-200" />
            </div>
          </div>
          <div class="p-3">
            <p v-if="rp.manufacturer" class="text-[10px] font-semibold uppercase tracking-wider text-brand-600">{{ rp.manufacturer }}</p>
            <p class="mt-0.5 text-sm font-medium text-default line-clamp-2 group-hover:text-brand-600 transition-colors">{{ rp.name }}</p>
            <p v-if="rp.voltage || rp.amperage" class="mt-1 text-xs text-dimmed">
              <span v-if="rp.voltage">{{ rp.voltage }}</span>
              <span v-if="rp.voltage && rp.amperage"> · </span>
              <span v-if="rp.amperage">{{ rp.amperage }}</span>
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>
