<script setup lang="ts">
defineProps<{
  product: {
    slug: string
    name: string
    images: string[]
    category: string
    subcategory?: string
    manufacturer: string
    condition: string
    sku: string
    short_description?: string
    voltage?: string
    amperage?: string
  }
}>()
</script>

<template>
  <NuxtLink
    :to="`/products/${product.slug}`"
    class="product-card light-card group block rounded-xl overflow-hidden"
  >
    <!-- Image -->
    <div class="relative aspect-square overflow-hidden bg-muted">
      <img
        v-if="product.images?.length"
        :src="product.images[0]"
        :alt="product.name"
        class="h-full w-full object-cover"
        loading="lazy"
      />
      <div v-else class="flex h-full w-full items-center justify-center">
        <UIcon name="i-lucide-image" class="size-12 text-dimmed" />
      </div>
      <!-- Condition Badge -->
      <span
        v-if="product.condition"
        class="absolute right-2 top-2 rounded-md bg-default/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted backdrop-blur-sm border border-default"
      >
        {{ product.condition }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-3 sm:p-4">
      <!-- Manufacturer Tag -->
      <p
        v-if="product.manufacturer"
        class="mb-1 text-[10px] font-semibold uppercase tracking-wider text-brand-600"
      >
        {{ product.manufacturer }}
      </p>

      <!-- Name -->
      <h3
        class="mb-1 line-clamp-2 font-display text-sm font-semibold text-default transition-colors group-hover:text-brand-600"
      >
        {{ product.name }}
      </h3>

      <!-- Short Description -->
      <p v-if="product.short_description" class="mb-2 line-clamp-2 text-xs text-dimmed">
        {{ product.short_description }}
      </p>
      <p v-else class="mb-3 text-xs text-dimmed">{{ product.category }}</p>

      <!-- Spec Badges -->
      <div v-if="product.voltage || product.amperage" class="mb-3 flex flex-wrap gap-1">
        <span
          v-if="product.voltage"
          class="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-700"
        >
          ⚡ {{ product.voltage }}
        </span>
        <span
          v-if="product.amperage"
          class="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-700"
        >
          🔌 {{ product.amperage }}
        </span>
      </div>

      <!-- SKU & CTA -->
      <div class="flex items-center justify-between border-t border-default pt-2.5 sm:pt-3">
        <span v-if="product.sku" class="text-[10px] font-mono text-dimmed hidden sm:inline">{{
          product.sku
        }}</span>
        <span v-else class="text-[10px] text-dimmed hidden sm:inline">—</span>
        <span
          class="text-xs font-medium text-brand-600 transition-colors group-hover:text-brand-500 py-1"
        >
          Details →
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
