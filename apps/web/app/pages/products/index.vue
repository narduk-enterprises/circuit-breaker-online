<script setup lang="ts">
useSeo({
  title: 'Full Product Catalog | Circuit Breaker Sales',
  description:
    'Browse our full inventory of new and reconditioned circuit breakers, switchgear, transformers, protective relays, and industrial power equipment.',
  ogImage: {
    title: 'Product Catalog',
    description: 'Browse 1,000+ Industrial Power Equipment Items',
    icon: '🔍',
  },
})

useWebPageSchema({
  type: 'CollectionPage',
  name: 'Product Catalog',
  description: 'Browse our full inventory of industrial power equipment.',
})

useBreadcrumbSchema([
  { name: 'Home', url: 'https://circuitbreaker.online/' },
  { name: 'Products', url: 'https://circuitbreaker.online/products' },
])

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

interface Subcategory {
  name: string
  slug: string
  count: number
}

interface Category {
  name: string
  slug: string
  count: number
  subcategories: Subcategory[]
}

interface FilterData {
  manufacturers: string[]
  voltages: string[]
  amperages: string[]
}

const route = useRoute()
const router = useRouter()

// State
const searchInput = ref((route.query.search as string) || '')
const searchQuery = ref((route.query.search as string) || '')
const activeCategory = ref((route.query.category as string) || '')
const activeSubcategory = ref((route.query.subcategory as string) || '')
const activeManufacturer = ref((route.query.manufacturer as string) || '')
const activeVoltage = ref((route.query.voltage as string) || '')
const activeAmperage = ref((route.query.amperage as string) || '')
const activeSort = ref((route.query.sort as string) || 'name-asc')
const currentPage = ref(Number.parseInt(route.query.page as string) || 1)
const mobileFiltersOpen = ref(false)

// Track total products
const totalProducts = ref(0)

const hasActiveFilters = computed(
  () =>
    activeCategory.value ||
    activeSubcategory.value ||
    activeManufacturer.value ||
    activeVoltage.value ||
    activeAmperage.value ||
    searchQuery.value,
)

const activeFilterCount = computed(() => {
  let count = 0
  if (activeCategory.value) count++
  if (activeSubcategory.value) count++
  if (activeManufacturer.value) count++
  if (activeVoltage.value) count++
  if (activeAmperage.value) count++
  return count
})

// Fetch categories
const { data: categories } = await useFetch<Category[]>('/api/categories')

// Fetch filters
const { data: filters } = await useFetch<FilterData>('/api/filters')

// Fetch products
const { data, status } = await useFetch<ProductResponse>('/api/products', {
  query: computed(() => ({
    ...(searchQuery.value ? { search: searchQuery.value } : {}),
    ...(activeCategory.value ? { category: activeCategory.value } : {}),
    ...(activeSubcategory.value ? { subcategory: activeSubcategory.value } : {}),
    ...(activeManufacturer.value ? { manufacturer: activeManufacturer.value } : {}),
    ...(activeVoltage.value ? { voltage: activeVoltage.value } : {}),
    ...(activeAmperage.value ? { amperage: activeAmperage.value } : {}),
    ...(activeSort.value !== 'name-asc' ? { sort: activeSort.value } : {}),
    page: currentPage.value,
    limit: 24,
  })),
  watch: [
    searchQuery,
    activeCategory,
    activeSubcategory,
    activeManufacturer,
    activeVoltage,
    activeAmperage,
    activeSort,
    currentPage,
  ],
})

// Get total products count
const { data: allData } = await useFetch<ProductResponse>('/api/products', { query: { limit: 1 } })
if (allData.value) totalProducts.value = allData.value.total

// Methods
function performSearch() {
  searchQuery.value = searchInput.value
  currentPage.value = 1
  updateUrl()
}

function clearSearch() {
  searchInput.value = ''
  searchQuery.value = ''
  currentPage.value = 1
  updateUrl()
}

function selectCategory(category: string) {
  activeCategory.value = category
  activeSubcategory.value = ''
  currentPage.value = 1
  updateUrl()
}

function selectSubcategory(category: string, subcategory: string) {
  activeCategory.value = category
  activeSubcategory.value = subcategory
  currentPage.value = 1
  updateUrl()
}

function clearCategory() {
  activeCategory.value = ''
  activeSubcategory.value = ''
  currentPage.value = 1
  updateUrl()
}

function clearSubcategory() {
  activeSubcategory.value = ''
  currentPage.value = 1
  updateUrl()
}

function clearAllFilters() {
  activeManufacturer.value = ''
  activeVoltage.value = ''
  activeAmperage.value = ''
  currentPage.value = 1
  updateUrl()
}

function applyFilter() {
  currentPage.value = 1
  updateUrl()
}

function resetFilters() {
  searchInput.value = ''
  searchQuery.value = ''
  activeCategory.value = ''
  activeSubcategory.value = ''
  activeManufacturer.value = ''
  activeVoltage.value = ''
  activeAmperage.value = ''
  activeSort.value = 'name-asc'
  currentPage.value = 1
  updateUrl()
}

function goToPage(page: number) {
  currentPage.value = page
  updateUrl()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function updateUrl() {
  const query: Record<string, string> = {}
  if (searchQuery.value) query.search = searchQuery.value
  if (activeCategory.value) query.category = activeCategory.value
  if (activeSubcategory.value) query.subcategory = activeSubcategory.value
  if (activeManufacturer.value) query.manufacturer = activeManufacturer.value
  if (activeVoltage.value) query.voltage = activeVoltage.value
  if (activeAmperage.value) query.amperage = activeAmperage.value
  if (activeSort.value !== 'name-asc') query.sort = activeSort.value
  if (currentPage.value > 1) query.page = String(currentPage.value)
  router.replace({ query })
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-6 lg:py-12">
    <!-- Page Header -->
    <div class="mb-6 lg:mb-8">
      <h1 class="mb-2 font-display text-2xl font-bold text-default lg:text-3xl">
        {{ activeCategory ? activeCategory : 'Full Product Catalog' }}
      </h1>
      <div class="h-1 w-16 rounded bg-brand-600" />
      <p class="mt-2 text-sm text-dimmed">
        {{ data?.total || 0 }} products available
        <span v-if="searchQuery"> matching "{{ searchQuery }}"</span>
        <span v-if="activeCategory"> in {{ activeCategory }}</span>
        <span v-if="activeSubcategory"> › {{ activeSubcategory }}</span>
      </p>
    </div>

    <!-- Mobile Toolbar -->
    <div class="mb-4 flex items-center gap-2 lg:hidden">
      <div class="flex-1">
        <UInput
          v-model="searchInput"
          placeholder="Search products..."
          size="lg"
          :ui="{ trailing: 'pointer-events-auto' }"
          @keyup.enter="performSearch"
        >
          <template #trailing>
            <UButton
              v-if="searchInput"
              variant="link"
              color="neutral"
              size="xs"
              icon="i-lucide-x"
              @click="clearSearch"
            />
          </template>
        </UInput>
      </div>
      <UButton
        size="lg"
        color="neutral"
        variant="outline"
        icon="i-lucide-funnel"
        @click="mobileFiltersOpen = true"
      >
        <span class="sr-only sm:not-sr-only">Filters</span>
      </UButton>
      <!-- Active filter count badge -->
      <span
        v-if="activeFilterCount > 0"
        class="flex size-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-default"
      >
        {{ activeFilterCount }}
      </span>
    </div>

    <!-- Mobile Active Filters -->
    <div v-if="hasActiveFilters" class="mb-4 flex flex-wrap items-center gap-2 lg:hidden">
      <span
        v-if="activeCategory"
        class="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
      >
        {{ activeCategory }}
        <button class="ml-0.5 hover:text-brand-900" @click="clearCategory">&times;</button>
      </span>
      <span
        v-if="activeSubcategory"
        class="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-primary"
      >
        {{ activeSubcategory }}
        <button class="ml-0.5 hover:text-primary" @click="clearSubcategory">&times;</button>
      </span>
      <span
        v-if="activeManufacturer"
        class="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-primary"
      >
        {{ activeManufacturer }}
        <button
          class="ml-0.5 hover:text-primary"
          @click="
            activeManufacturer = ''
            applyFilter()
          "
        >
          &times;
        </button>
      </span>
      <span
        v-if="activeVoltage"
        class="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-primary"
      >
        {{ activeVoltage }}
        <button
          class="ml-0.5 hover:text-primary"
          @click="
            activeVoltage = ''
            applyFilter()
          "
        >
          &times;
        </button>
      </span>
      <span
        v-if="activeAmperage"
        class="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700"
      >
        {{ activeAmperage }}
        <button
          class="ml-0.5 hover:text-purple-900"
          @click="
            activeAmperage = ''
            applyFilter()
          "
        >
          &times;
        </button>
      </span>
      <button class="text-xs text-dimmed underline hover:text-muted" @click="resetFilters">
        Clear all
      </button>
    </div>

    <!-- Mobile Filter Drawer (Slide-over) -->
    <Teleport to="body">
      <Transition name="drawer">
        <div v-if="mobileFiltersOpen" class="fixed inset-0 z-50 lg:hidden">
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-muted/40 backdrop-blur-sm"
            @click="mobileFiltersOpen = false"
          />
          <!-- Drawer Panel -->
          <div class="absolute inset-y-0 right-0 flex w-full max-w-sm">
            <div class="relative flex w-full flex-col overflow-y-auto bg-default shadow-2xl">
              <!-- Drawer Header -->
              <div class="flex items-center justify-between border-b border-default px-5 py-4">
                <h2 class="font-display text-lg font-semibold text-default">
                  Filters & Categories
                </h2>
                <button
                  class="flex size-9 items-center justify-center rounded-full text-dimmed hover:bg-muted hover:text-muted"
                  @click="mobileFiltersOpen = false"
                >
                  <UIcon name="i-lucide-x" class="size-5" />
                </button>
              </div>

              <!-- Drawer Body -->
              <div class="flex-1 space-y-6 overflow-y-auto px-5 py-5">
                <!-- Categories -->
                <div>
                  <h3
                    class="mb-3 font-display text-xs font-semibold uppercase tracking-wider text-dimmed"
                  >
                    Categories
                  </h3>
                  <ul class="space-y-0.5">
                    <li>
                      <button
                        class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors"
                        :class="
                          !activeCategory
                            ? 'bg-brand-600/10 text-brand-600 font-medium'
                            : 'text-muted hover:text-default hover:bg-muted'
                        "
                        @click="
                          clearCategory()
                          mobileFiltersOpen = false
                        "
                      >
                        <span>All Products</span>
                        <span class="text-xs text-dimmed">{{ totalProducts }}</span>
                      </button>
                    </li>
                    <li v-for="cat in categories" :key="cat.name">
                      <button
                        class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors"
                        :class="
                          activeCategory === cat.name && !activeSubcategory
                            ? 'bg-brand-50 text-brand-600 font-medium'
                            : 'text-muted hover:text-default hover:bg-muted'
                        "
                        @click="
                          selectCategory(cat.name)
                          mobileFiltersOpen = false
                        "
                      >
                        <span class="truncate">{{ cat.name }}</span>
                        <span class="ml-2 shrink-0 text-xs text-dimmed">{{ cat.count }}</span>
                      </button>
                      <!-- Subcategories -->
                      <ul
                        v-if="activeCategory === cat.name && cat.subcategories?.length"
                        class="ml-4 mt-1 space-y-0.5 border-l-2 border-brand-100 pl-2"
                      >
                        <li v-for="sub in cat.subcategories" :key="sub.name">
                          <button
                            class="flex w-full items-center justify-between rounded px-3 py-2 text-xs transition-colors"
                            :class="
                              activeSubcategory === sub.name
                                ? 'bg-brand-600/10 text-brand-600 font-medium'
                                : 'text-dimmed hover:text-default hover:bg-muted'
                            "
                            @click="
                              selectSubcategory(cat.name, sub.name)
                              mobileFiltersOpen = false
                            "
                          >
                            <span class="truncate">{{ sub.name }}</span>
                            <span class="ml-1 shrink-0 text-[10px] text-dimmed">{{
                              sub.count
                            }}</span>
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <!-- Filters -->
                <div v-if="filters" class="space-y-4 border-t border-default pt-5">
                  <h3
                    class="font-display text-xs font-semibold uppercase tracking-wider text-dimmed"
                  >
                    Filters
                  </h3>

                  <!-- Manufacturer -->
                  <div v-if="filters.manufacturers?.length">
                    <label
                      class="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-dimmed"
                      >Manufacturer</label
                    >
                    <select
                      v-model="activeManufacturer"
                      class="w-full rounded-lg border border-default bg-default px-3 py-2.5 text-sm text-muted focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      @change="applyFilter"
                    >
                      <option value="">All Manufacturers</option>
                      <option v-for="m in filters.manufacturers" :key="m" :value="m">
                        {{ m }}
                      </option>
                    </select>
                  </div>

                  <!-- Voltage -->
                  <div v-if="filters.voltages?.length">
                    <label
                      class="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-dimmed"
                      >Voltage</label
                    >
                    <select
                      v-model="activeVoltage"
                      class="w-full rounded-lg border border-default bg-default px-3 py-2.5 text-sm text-muted focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      @change="applyFilter"
                    >
                      <option value="">All Voltages</option>
                      <option v-for="v in filters.voltages" :key="v" :value="v">{{ v }}</option>
                    </select>
                  </div>

                  <!-- Amperage -->
                  <div v-if="filters.amperages?.length">
                    <label
                      class="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-dimmed"
                      >Amperage</label
                    >
                    <select
                      v-model="activeAmperage"
                      class="w-full rounded-lg border border-default bg-default px-3 py-2.5 text-sm text-muted focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                      @change="applyFilter"
                    >
                      <option value="">All Amperages</option>
                      <option v-for="a in filters.amperages" :key="a" :value="a">{{ a }}</option>
                    </select>
                  </div>
                </div>

                <!-- Sort -->
                <div class="border-t border-default pt-5">
                  <h3
                    class="mb-2 font-display text-xs font-semibold uppercase tracking-wider text-dimmed"
                  >
                    Sort By
                  </h3>
                  <select
                    v-model="activeSort"
                    class="w-full rounded-lg border border-default bg-default px-3 py-2.5 text-sm text-muted focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    @change="applyFilter"
                  >
                    <option value="name-asc">Name A–Z</option>
                    <option value="name-desc">Name Z–A</option>
                    <option value="newest">Newest First</option>
                    <option value="manufacturer">Manufacturer</option>
                  </select>
                </div>
              </div>

              <!-- Drawer Footer -->
              <div class="border-t border-default px-5 py-4">
                <div class="flex gap-3">
                  <UButton
                    class="flex-1"
                    variant="outline"
                    color="neutral"
                    size="lg"
                    @click="
                      resetFilters()
                      mobileFiltersOpen = false
                    "
                  >
                    Clear All
                  </UButton>
                  <UButton
                    class="flex-1"
                    color="primary"
                    size="lg"
                    @click="mobileFiltersOpen = false"
                  >
                    Show {{ data?.total || 0 }} Results
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <div class="grid gap-8 lg:grid-cols-4">
      <!-- Desktop Sidebar (hidden on mobile) -->
      <aside class="hidden lg:col-span-1 lg:block">
        <div
          class="sticky top-24 max-h-[calc(100vh-7rem)] space-y-6 overflow-y-auto pr-1 scrollbar-thin"
        >
          <!-- Search -->
          <div>
            <UInput
              v-model="searchInput"
              placeholder="Search products..."
              size="lg"
              :ui="{ trailing: 'pointer-events-auto' }"
              @keyup.enter="performSearch"
            >
              <template #trailing>
                <UButton
                  v-if="searchInput"
                  variant="link"
                  color="neutral"
                  size="xs"
                  icon="i-lucide-x"
                  @click="clearSearch"
                />
              </template>
            </UInput>
            <UButton
              class="mt-2 w-full"
              size="sm"
              color="primary"
              variant="soft"
              @click="performSearch"
            >
              Search
            </UButton>
          </div>

          <!-- Categories (Hierarchical) -->
          <div class="light-card rounded-xl p-4">
            <h3
              class="mb-3 font-display text-xs font-semibold uppercase tracking-wider text-dimmed"
            >
              Categories
            </h3>
            <ul class="space-y-1">
              <li>
                <button
                  class="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors"
                  :class="
                    !activeCategory
                      ? 'bg-brand-600/10 text-brand-600'
                      : 'text-dimmed hover:text-default hover:bg-muted'
                  "
                  @click="clearCategory"
                >
                  <span>All Products</span>
                  <span class="text-xs text-dimmed">{{ totalProducts }}</span>
                </button>
              </li>
              <li v-for="cat in categories" :key="cat.name">
                <button
                  class="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors"
                  :class="
                    activeCategory === cat.name && !activeSubcategory
                      ? 'bg-brand-50 text-brand-600 font-medium'
                      : 'text-muted hover:text-default hover:bg-muted'
                  "
                  @click="selectCategory(cat.name)"
                >
                  <span class="truncate">{{ cat.name }}</span>
                  <span class="ml-2 shrink-0 text-xs text-dimmed">{{ cat.count }}</span>
                </button>
                <!-- Subcategories -->
                <ul
                  v-if="activeCategory === cat.name && cat.subcategories?.length"
                  class="ml-4 mt-1 space-y-0.5 border-l-2 border-brand-100 pl-2"
                >
                  <li v-for="sub in cat.subcategories" :key="sub.name">
                    <button
                      class="flex w-full items-center justify-between rounded px-2 py-1 text-xs transition-colors"
                      :class="
                        activeSubcategory === sub.name
                          ? 'bg-brand-600/10 text-brand-600'
                          : 'text-dimmed hover:text-default hover:bg-muted'
                      "
                      @click="selectSubcategory(cat.name, sub.name)"
                    >
                      <span class="truncate">{{ sub.name }}</span>
                      <span class="ml-1 shrink-0 text-[10px] text-dimmed">{{ sub.count }}</span>
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <!-- Filters -->
          <div v-if="filters" class="light-card rounded-xl p-4 space-y-4">
            <h3 class="font-display text-xs font-semibold uppercase tracking-wider text-dimmed">
              Filters
            </h3>

            <!-- Manufacturer -->
            <div v-if="filters.manufacturers?.length">
              <label
                class="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-dimmed"
                >Manufacturer</label
              >
              <select
                v-model="activeManufacturer"
                class="w-full rounded-lg border border-default bg-default px-3 py-2 text-sm text-muted focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                @change="applyFilter"
              >
                <option value="">All Manufacturers</option>
                <option v-for="m in filters.manufacturers" :key="m" :value="m">{{ m }}</option>
              </select>
            </div>

            <!-- Voltage -->
            <div v-if="filters.voltages?.length">
              <label
                class="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-dimmed"
                >Voltage</label
              >
              <select
                v-model="activeVoltage"
                class="w-full rounded-lg border border-default bg-default px-3 py-2 text-sm text-muted focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                @change="applyFilter"
              >
                <option value="">All Voltages</option>
                <option v-for="v in filters.voltages" :key="v" :value="v">{{ v }}</option>
              </select>
            </div>

            <!-- Amperage -->
            <div v-if="filters.amperages?.length">
              <label
                class="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-dimmed"
                >Amperage</label
              >
              <select
                v-model="activeAmperage"
                class="w-full rounded-lg border border-default bg-default px-3 py-2 text-sm text-muted focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                @change="applyFilter"
              >
                <option value="">All Amperages</option>
                <option v-for="a in filters.amperages" :key="a" :value="a">{{ a }}</option>
              </select>
            </div>

            <!-- Clear Filters -->
            <UButton
              v-if="activeManufacturer || activeVoltage || activeAmperage"
              variant="link"
              color="error"
              size="xs"
              @click="clearAllFilters"
            >
              Clear All Filters
            </UButton>
          </div>

          <!-- Sort -->
          <div class="light-card rounded-xl p-4">
            <h3
              class="mb-2 font-display text-xs font-semibold uppercase tracking-wider text-dimmed"
            >
              Sort By
            </h3>
            <select
              v-model="activeSort"
              class="w-full rounded-lg border border-default bg-default px-3 py-2 text-sm text-muted focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              @change="applyFilter"
            >
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
              <option value="newest">Newest First</option>
              <option value="manufacturer">Manufacturer</option>
            </select>
          </div>
        </div>
      </aside>

      <!-- Product Grid -->
      <div class="lg:col-span-3">
        <!-- Desktop Active Filter Tags -->
        <div v-if="hasActiveFilters" class="mb-4 hidden flex-wrap items-center gap-2 lg:flex">
          <span class="text-xs font-medium text-dimmed">Active filters:</span>
          <span
            v-if="activeCategory"
            class="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
          >
            {{ activeCategory }}
            <button class="ml-0.5 hover:text-brand-900" @click="clearCategory">&times;</button>
          </span>
          <span
            v-if="activeSubcategory"
            class="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-primary"
          >
            {{ activeSubcategory }}
            <button class="ml-0.5 hover:text-primary" @click="clearSubcategory">&times;</button>
          </span>
          <span
            v-if="activeManufacturer"
            class="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-primary"
          >
            {{ activeManufacturer }}
            <button
              class="ml-0.5 hover:text-primary"
              @click="
                activeManufacturer = ''
                applyFilter()
              "
            >
              &times;
            </button>
          </span>
          <span
            v-if="activeVoltage"
            class="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-primary"
          >
            {{ activeVoltage }}
            <button
              class="ml-0.5 hover:text-primary"
              @click="
                activeVoltage = ''
                applyFilter()
              "
            >
              &times;
            </button>
          </span>
          <span
            v-if="activeAmperage"
            class="inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700"
          >
            {{ activeAmperage }}
            <button
              class="ml-0.5 hover:text-purple-900"
              @click="
                activeAmperage = ''
                applyFilter()
              "
            >
              &times;
            </button>
          </span>
          <button class="text-xs text-dimmed underline hover:text-muted" @click="resetFilters">
            Clear all
          </button>
        </div>

        <!-- Loading -->
        <div v-if="status === 'pending'" class="grid gap-3 grid-cols-2 lg:gap-4 xl:grid-cols-3">
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
          <div class="grid gap-3 grid-cols-2 lg:gap-4 xl:grid-cols-3">
            <ProductCard v-for="product in data.products" :key="product.slug" :product="product" />
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
        <div v-else class="flex flex-col items-center justify-center py-20 text-center">
          <UIcon name="i-lucide-search" class="mb-4 size-12 text-dimmed" />
          <h3 class="mb-2 font-display text-lg font-semibold text-default">No products found</h3>
          <p class="mb-4 text-sm text-dimmed">Try adjusting your search or filter criteria</p>
          <UButton variant="outline" color="neutral" size="sm" @click="resetFilters">
            Clear All Filters
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-enter-active > div:last-child,
.drawer-leave-active > div:last-child {
  transition: transform 0.3s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from > div:last-child,
.drawer-leave-to > div:last-child {
  transform: translateX(100%);
}
</style>
