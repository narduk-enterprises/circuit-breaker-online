<script setup lang="ts">
const equipmentLinks = [
  { label: 'Circuit Breakers', to: '/equipment/circuit-breakers' },
  { label: 'Switchgear', to: '/equipment/switchgear' },
  { label: 'Transformers', to: '/equipment/transformers' },
  { label: 'Protective Relays', to: '/equipment/protective-relays' },
  { label: 'Vacuum Interrupters', to: '/equipment/vacuum-interrupters' },
  { label: 'Motor Controls', to: '/equipment/motor-controls' },
  { label: 'Remote Racking', to: '/equipment/remote-racking' },
]

const companyLinks = [
  { label: 'All Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Resources', to: '/resources' },
  { label: 'Videos', to: '/videos' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
</script>

<template>
  <div class="border-t border-default bg-accent-950 text-white">
    <!-- Main Footer -->
    <div class="mx-auto max-w-7xl px-4 py-10 sm:py-16">
      <div class="grid gap-10 sm:gap-12 grid-cols-2 md:grid-cols-4">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <NuxtLink to="/" class="flex items-center gap-3">
            <img
              src="/images/branding/CBS-Service-Shop-Logo.png"
              alt="Circuit Breaker Sales"
              class="h-9 w-auto object-contain"
            />
          </NuxtLink>
          <p class="mt-4 text-sm leading-relaxed text-white/50">
            A Group CBS company providing new and reconditioned electrical power equipment since 1981.
          </p>
          <div class="mt-4 flex items-center gap-2 text-sm text-white/60">
            <UIcon name="i-lucide-phone" class="size-4 text-brand-400" />
            <ULink to="tel:8002325809" class="font-semibold transition-colors hover:text-white">800-232-5809</ULink>
          </div>
          <!-- Trust Badges -->
          <div class="mt-4 flex items-center gap-3">
            <img
              src="/images/branding/ISO-9001-badge.png"
              alt="ISO 9001:2008 Certified"
              class="size-11 rounded object-contain opacity-50"
            />
          </div>
        </div>

        <!-- Equipment -->
        <div>
          <h3 class="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-white/40">Equipment</h3>
          <ul class="space-y-0.5">
            <li v-for="cat in equipmentLinks" :key="cat.to">
              <NuxtLink
                :to="cat.to"
                class="block rounded-md px-1 py-1.5 text-sm text-white/50 transition-colors hover:text-white"
              >
                {{ cat.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-white/40">Company</h3>
          <ul class="space-y-0.5">
            <li v-for="link in companyLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="block rounded-md px-1 py-1.5 text-sm text-white/50 transition-colors hover:text-white"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-white/40">Contact</h3>
          <div class="space-y-3 text-sm text-white/50">
            <p>
              <span class="font-semibold text-white/70">Main Office</span><br>
              <ULink to="tel:8002325809" class="transition-colors hover:text-white">800-232-5809</ULink>
            </p>
            <p>
              <span class="font-semibold text-white/70">Email</span><br>
              <ULink to="mailto:sales@circuitbreaker.com" class="transition-colors hover:text-white">sales@circuitbreaker.com</ULink>
            </p>
            <div class="pt-2">
              <UButton to="/contact" variant="outline" color="primary" size="sm" class="font-bold uppercase tracking-wide">
                Get a Quote
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-white/10">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-white/30">
        <p>© {{ new Date().getFullYear() }} Circuit Breaker Sales. All rights reserved.</p>
        <div class="flex items-center gap-3">
          <img
            src="/images/branding/Power-of-One-Logo-2026.png"
            alt="Group CBS — Power of One"
            class="h-8 w-auto object-contain opacity-40"
          />
        </div>
      </div>
    </div>
  </div>
</template>
