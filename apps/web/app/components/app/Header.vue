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
  <div class="sticky top-0 z-50 w-full">
    <!-- ━━━ Unified Premium Dark Header ━━━ -->
    <div class="header-shell">
      <!-- Top Info Strip — minimal, utility-focused -->
      <div class="border-b border-white/[0.06]">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6">
          <span class="hidden text-[11px] font-medium tracking-[0.15em] uppercase text-white/40 md:inline">
            A Group CBS Company — Trusted Since 1981
          </span>
          <div class="flex items-center gap-4 sm:gap-6 max-sm:w-full max-sm:justify-center text-[12px]">
            <ULink to="tel:8002325809" class="group flex items-center gap-1.5 text-white/45 transition-colors hover:text-white">
              <UIcon name="i-lucide-phone" class="size-3" />
              <span class="font-semibold text-white/70 group-hover:text-white transition-colors">800-232-5809</span>
            </ULink>
            <span class="hidden text-white/15 sm:inline">|</span>
            <ULink to="mailto:sales@circuitbreaker.com" class="hidden items-center gap-1.5 text-white/45 transition-colors hover:text-white sm:flex">
              <UIcon name="i-lucide-mail" class="size-3" />
              <span>sales@circuitbreaker.com</span>
            </ULink>
          </div>
        </div>
      </div>

      <!-- Brand Accent Line — subtle red gradient separator -->
      <div class="h-[2px] bg-linear-to-r from-transparent via-brand-500/60 to-transparent" />

      <!-- Main Navigation -->
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <!-- Logo — clean on dark, no wrapper needed -->
        <NuxtLink to="/" class="flex items-center gap-3.5">
          <img
            src="/images/branding/CBS-Service-Shop-Logo.png"
            alt="Circuit Breaker Sales"
            class="h-10 sm:h-12 w-auto object-contain"
          >
        </NuxtLink>

        <!-- Desktop Links — refined spacing and hierarchy -->
        <nav class="hidden items-center gap-1 lg:flex">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link rounded-md px-2.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/50 transition-all duration-200 hover:text-white hover:bg-white/[0.06]"
            active-class="!text-white !bg-white/[0.08]"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- CTA + Mobile Menu -->
        <div class="flex items-center gap-2.5">
          <UButton
            to="/contact"
            color="primary"
            size="md"
            class="hidden font-bold uppercase tracking-wider text-[12px] sm:inline-flex"
          >
            Request a Quote
          </UButton>

          <!-- Mobile Menu Button -->
          <button
            class="flex size-10 items-center justify-center rounded-lg text-white/50 transition-all hover:bg-white/[0.08] hover:text-white lg:hidden"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <UIcon :name="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="size-5" />
          </button>
        </div>
      </div>

      <!-- Bottom edge line for depth -->
      <div class="h-px bg-linear-to-r from-transparent via-white/[0.08] to-transparent" />
    </div>

    <!-- Mobile Menu — premium dark drawer -->
    <Transition
      enter-active-class="transition-all duration-250 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-if="mobileMenuOpen" class="mobile-menu-shell px-4 py-2 lg:hidden">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="block rounded-lg px-4 py-3 text-[14px] font-semibold uppercase tracking-wider text-white/50 transition-all hover:bg-white/[0.06] hover:text-white"
          active-class="!text-white !bg-white/[0.08]"
          @click="mobileMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
        <div class="mt-3 border-t border-white/[0.06] pt-3 pb-1">
          <UButton to="/contact" color="primary" block size="lg" class="font-bold uppercase tracking-wider" @click="mobileMenuOpen = false">
            Request a Quote
          </UButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Premium header shell — subtle gradient for depth, not flat */
.header-shell {
  background: linear-gradient(180deg, #0d1526 0%, #0f172a 100%);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.04),
    0 4px 24px rgba(0, 0, 0, 0.4);
}

/* Mobile menu matches the header shell */
.mobile-menu-shell {
  background: linear-gradient(180deg, #0f172a 0%, #0d1526 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}
</style>
