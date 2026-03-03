<script setup lang="ts">
useSeoMeta({
  title: 'Circuit Breaker Sales | Industrial Power Equipment',
  description: 'Your trusted source for new and reconditioned circuit breakers, switchgear, transformers, and industrial power equipment. A Group CBS company since 1981.',
  ogType: 'website',
  ogSiteName: 'Circuit Breaker Sales',
  ogImage: 'https://circuitbreaker.online/images/branding/og-default.png',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://circuitbreaker.online/images/branding/og-default.png',
})
</script>

<template>
  <UApp>
    <AppHeader />
    <div class="min-h-screen">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
    <AppFooter />

    <!-- Sticky Mobile CTA Bar — always visible on mobile -->
    <div class="mobile-cta-bar lg:hidden">
      <UButton
        to="tel:8002325809"
        color="neutral"
        variant="outline"
        size="xl"
        class="font-bold justify-center"
      >
        <template #leading>
          <UIcon name="i-lucide-phone" class="size-5" />
        </template>
        Call Now
      </UButton>
      <UButton
        to="/contact"
        color="primary"
        size="xl"
        class="font-bold justify-center"
      >
        <template #leading>
          <UIcon name="i-lucide-message-square" class="size-5" />
        </template>
        Get a Quote
      </UButton>
    </div>
    <!-- Spacer so footer content isn't hidden behind the sticky bar -->
    <div class="mobile-bottom-spacer lg:hidden" />
  </UApp>
</template>
