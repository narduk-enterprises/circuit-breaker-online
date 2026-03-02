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
  <div class="border-t border-default bg-muted">
    <!-- Main Footer -->
    <div class="mx-auto max-w-7xl px-4 py-16">
      <div class="grid gap-12 md:grid-cols-4">
        <!-- Brand -->
        <div class="md:col-span-1">
          <NuxtLink to="/" class="flex items-center gap-3">
            <img
              src="/images/branding/CBS-Service-Shop-Logo.png"
              alt="Circuit Breaker Sales"
              class="h-12 w-auto"
            />
          </NuxtLink>
          <p class="mt-4 text-base leading-relaxed text-dimmed">
            A Group CBS company providing new and reconditioned electrical power equipment since 1981.
          </p>
          <div class="mt-4 flex items-center gap-2">
            <UIcon name="i-lucide-phone" class="size-5 text-brand-500" />
            800-232-5809
          </div>
          <!-- Trust Badges -->
          <div class="mt-4 flex items-center gap-3">
            <img
              src="/images/branding/ISO-9001-badge.png"
              alt="ISO 9001:2008 Certified"
              class="size-12 rounded object-contain opacity-70"
            />
          </div>
        </div>

        <!-- Equipment -->
        <div>
          <h3 class="mb-4 font-display text-base font-bold uppercase tracking-wider text-default">Equipment</h3>
          <ul class="space-y-3">
            <li v-for="cat in equipmentLinks" :key="cat.to">
              <NuxtLink
                :to="cat.to"
                class="text-base text-dimmed transition-colors hover:text-brand-400"
              >
                {{ cat.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="mb-4 font-display text-base font-bold uppercase tracking-wider text-default">Company</h3>
          <ul class="space-y-3">
            <li v-for="link in companyLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-base text-dimmed transition-colors hover:text-brand-400"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="mb-4 font-display text-base font-bold uppercase tracking-wider text-default">Contact</h3>
          <div class="space-y-3 text-base text-dimmed">
            <p>
              <span class="font-bold text-default">Main Office</span><br>
              <ULink to="tel:8002325809" class="transition-colors hover:text-default">800-232-5809</ULink>
            </p>
            <p>
              <span class="font-bold text-default">Email</span><br>
              <ULink to="mailto:sales@circuitbreaker.com" class="transition-colors hover:text-default">sales@circuitbreaker.com</ULink>
            </p>
            <div class="pt-2">
              <UButton to="/contact" variant="outline" color="primary" size="md" class="font-bold uppercase tracking-wide">
                Get a Quote
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-default">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-sm text-dimmed">
        <p>© {{ new Date().getFullYear() }} Circuit Breaker Sales. All rights reserved.</p>
        <div class="flex items-center gap-3">
          <img
            src="/images/branding/Power-of-One-Logo-2026.png"
            alt="Group CBS — Power of One"
            class="h-10 w-auto opacity-60"
          />
        </div>
      </div>
    </div>
  </div>
</template>
