<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)

interface CategoryData {
  name: string
  slug: string
  count: number
  subcategories: { name: string; slug: string; count: number }[]
}

interface Product {
  id: number
  name: string
  slug: string
  sku: string
  manufacturer: string
  model: string
  category: string
  subcategory: string
  condition: string
  voltage: string
  amperage: string
  type: string
  short_description: string
  images: string[]
}

interface ProductResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Resolve slug → category (reactive — re-fetches on client-side slug change)
const { data: category } = await useFetch<CategoryData>(
  computed(() => `/api/categories/${slug.value}`),
  { watch: [slug] },
)

if (!category.value) {
  throw createError({ statusCode: 404, message: 'Category not found' })
}

const categoryName = computed(() => category.value?.name ?? '')
const siteUrl = normalizeSiteUrl((useRuntimeConfig().public.appUrl as string) || '')

const seoTitle = computed(() => `${categoryName.value} | Circuit Breaker Sales`)
const seoDescription = computed(
  () =>
    `Browse our inventory of ${categoryName.value.toLowerCase()}. New and reconditioned industrial power equipment available with fast shipping.`,
)
const ogDescription = computed(() => `${category.value?.count ?? 0}+ items in stock`)
const webPageDescription = computed(
  () => `Browse ${categoryName.value.toLowerCase()} from Circuit Breaker Sales.`,
)
const categoryUrl = computed(() => `${siteUrl}/products/category/${slug.value}`)

// SEO
useSeo({
  title: seoTitle.value,
  description: seoDescription.value,
  ogImage: {
    title: categoryName.value,
    description: ogDescription.value,
    icon: '⚡',
  },
})

useWebPageSchema({
  type: 'CollectionPage',
  name: categoryName.value,
  description: webPageDescription.value,
})

useBreadcrumbSchema([
  { name: 'Home', url: `${siteUrl}/` },
  { name: 'Products', url: `${siteUrl}/products` },
  { name: categoryName.value, url: categoryUrl.value },
])

// Pagination
const currentPage = ref(1)

// Reset to first page when category slug changes (client-side navigation)
watch(slug, () => {
  currentPage.value = 1
})

// Fetch products for this category (reactive — re-fetches on slug, category name, or page change)
const { data, status } = await useFetch<ProductResponse>('/api/products', {
  query: computed(() => ({
    category: categoryName.value,
    page: currentPage.value,
    limit: 24,
  })),
  watch: [slug, categoryName, currentPage],
})

function goToPage(page: number) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-6 lg:py-12">
    <!-- Breadcrumb -->
    <nav class="mb-6 flex items-center gap-2 text-sm text-dimmed">
      <NuxtLink to="/" class="transition-colors hover:text-default">Home</NuxtLink>
      <UIcon name="i-lucide-chevron-right" class="size-3" />
      <NuxtLink to="/products" class="transition-colors hover:text-default">Products</NuxtLink>
      <UIcon name="i-lucide-chevron-right" class="size-3" />
      <span class="font-medium text-default">{{ categoryName }}</span>
    </nav>

    <!-- Header -->
    <div class="mb-6 lg:mb-8">
      <h1 class="mb-2 font-display text-2xl font-bold text-default lg:text-3xl">
        {{ categoryName }}
      </h1>
      <div class="h-1 w-16 rounded bg-brand-600" />
      <p class="mt-2 text-sm text-dimmed">
        {{ data?.total || 0 }} products available
      </p>
    </div>

    <!-- Subcategories -->
    <div v-if="category?.subcategories?.length" class="mb-8">
      <h2 class="mb-3 font-display text-xs font-semibold uppercase tracking-wider text-dimmed">Subcategories</h2>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="sub in category.subcategories"
          :key="sub.slug"
          :to="`/products?category=${encodeURIComponent(categoryName)}&subcategory=${encodeURIComponent(sub.name)}`"
          class="inline-flex items-center gap-1.5 rounded-full border border-default bg-default px-3 py-1.5 text-sm text-muted transition-colors hover:border-brand-500 hover:text-brand-600"
        >
          {{ sub.name }}
          <span class="text-xs text-dimmed">({{ sub.count }})</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="status === 'pending'" class="grid gap-3 grid-cols-2 lg:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      <div v-for="i in 12" :key="i" class="light-card animate-pulse rounded-xl">
        <div class="aspect-square bg-gray-200/50 rounded-t-xl" />
        <div class="p-3 space-y-2 lg:p-4">
          <div class="h-3 w-1/3 rounded bg-gray-200" />
          <div class="h-4 w-2/3 rounded bg-gray-200" />
          <div class="h-3 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
    </div>

    <!-- Results -->
    <template v-else-if="data?.products?.length">
      <div class="grid gap-3 grid-cols-2 lg:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        <ProductCard
          v-for="product in data.products"
          :key="product.slug"
          :product="product"
        />
      </div>

      <!-- Pagination -->
      <div v-if="data.totalPages > 1" class="mt-8 flex items-center justify-center gap-2">
        <UButton
          :disabled="currentPage <= 1"
          variant="outline"
          color="neutral"
          size="md"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </UButton>
        <span class="px-4 text-sm text-dimmed">
          Page {{ currentPage }} of {{ data.totalPages }}
        </span>
        <UButton
          :disabled="currentPage >= data.totalPages"
          variant="outline"
          color="neutral"
          size="md"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </UButton>
      </div>
    </template>

    <!-- Empty State -->
    <div v-else class="py-16 text-center">
      <UIcon name="i-lucide-package" class="mx-auto mb-4 size-12 text-dimmed" />
      <h2 class="mb-2 text-lg font-semibold text-default">No products found</h2>
      <p class="text-sm text-dimmed">No products are currently available in this category.</p>
      <UButton to="/products" class="mt-4" color="primary" variant="soft">
        Browse All Products
      </UButton>
    </div>

    <!-- Full Catalog Link -->
    <div class="mt-12 text-center">
      <NuxtLink
        to="/products"
        class="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-500 transition-colors"
      >
        <UIcon name="i-lucide-arrow-left" class="size-4" />
        View Full Product Catalog
      </NuxtLink>
    </div>
  </div>
</template>
