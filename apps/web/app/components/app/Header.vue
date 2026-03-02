<script setup lang="ts">
const mobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Equipment', to: '/equipment' },
  { label: 'Industries', to: '/industries' },
  { label: 'Resources', to: '/resources' },
  { label: 'Videos', to: '/videos' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<template>
  <div class="sticky top-0 z-50 w-full border-b border-default bg-white shadow-lg">
    <!-- Top Bar -->
    <div class="border-b border-default bg-gray-50">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 text-sm text-dimmed">
        <span class="hidden sm:inline font-medium">A Group CBS Company — Trusted Since 1981</span>
        <div class="flex items-center gap-5">
          <ULink to="tel:8002325809" class="flex items-center gap-1.5 transition-colors hover:text-default">
            <UIcon name="i-lucide-phone" class="size-4" />
            <span class="font-bold text-default">800-232-5809</span>
          </ULink>
          <ULink to="mailto:sales@circuitbreaker.com" class="hidden items-center gap-1.5 transition-colors hover:text-default sm:flex">
            <UIcon name="i-lucide-mail" class="size-4" />
            <span>sales@circuitbreaker.com</span>
          </ULink>
        </div>
      </div>
    </div>

    <!-- Main Nav -->
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 transition-opacity hover:opacity-80">
        <img
          src="/images/branding/CBS-Service-Shop-Logo.png"
          alt="Circuit Breaker Sales"
          class="h-14 sm:h-16 w-auto"
        />
      </NuxtLink>

      <!-- Desktop Links -->
      <div class="hidden items-center gap-1 md:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="rounded-md px-3 py-2 text-[13.5px] font-bold uppercase tracking-wide text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          active-class="!text-gray-900 bg-gray-100"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <!-- CTA + Mobile Menu -->
      <div class="flex items-center gap-3">
        <UButton
          to="/contact"
          color="primary"
          size="md"
          class="hidden sm:inline-flex font-bold uppercase tracking-wide"
        >
          Request a Quote
        </UButton>

        <!-- Mobile Menu Button -->
        <UButton
          variant="ghost"
          color="neutral"
          class="rounded-md p-2 text-dimmed transition-colors hover:text-default md:hidden"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <UIcon :name="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="size-6" />
        </UButton>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileMenuOpen" class="border-t border-default bg-white px-4 py-3 md:hidden">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="block rounded-md px-3 py-3 text-base font-bold uppercase tracking-wide text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          @click="mobileMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
        <div class="mt-2 border-t border-default pt-3">
          <UButton to="/contact" color="primary" block class="font-bold uppercase" @click="mobileMenuOpen = false">
            Request a Quote
          </UButton>
        </div>
      </div>
    </Transition>
  </div>
</template>
