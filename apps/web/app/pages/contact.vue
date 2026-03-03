<script setup lang="ts">
useSeo({
  title: 'Contact Us — Request a Quote | Circuit Breaker Sales',
  description: 'Get a quote on circuit breakers, switchgear, transformers, and industrial power equipment from Circuit Breaker Sales. Toll-free: 800-232-5809.',
  ogImage: {
    title: 'Request a Quote',
    description: 'Toll-free: 800-232-5809',
    icon: '📞',
  },
})

useWebPageSchema({ type: 'ContactPage', name: 'Contact Circuit Breaker Sales', description: 'Request a quote on industrial power equipment. Toll-free: 800-232-5809.' })

const form = reactive({
  name: '',
  email: '',
  company: '',
  phone: '',
  subject: '',
  message: '',
})

const submitting = ref(false)
const submitted = ref(false)

const subjectOptions = [
  'Circuit Breakers',
  'Switchgear',
  'Transformers',
  'Protective Relays',
  'Vacuum Interrupters',
  'Motor Control',
  'Renewal & Replacement Parts',
  'Load Tap Changers',
  'Remote Racking',
  'Unit Substations',
  'Field Services',
  'General Inquiry',
]

const handleSubmit = async () => {
  submitting.value = true
  // Simulate form submission
  await new Promise(r => setTimeout(r, 1000))
  submitting.value = false
  submitted.value = true
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="mb-2 font-display text-3xl font-bold text-default">Contact Us / Request a Quote</h1>
      <div class="h-1 w-16 rounded bg-brand-600" />
      <p class="mt-4 text-lg text-dimmed">Have a question or need pricing? Fill out the form below and our team will respond promptly.</p>
    </div>

    <div class="grid gap-12 lg:grid-cols-3">
      <!-- Form -->
      <div class="lg:col-span-2">
        <UForm class="light-card accent-border rounded-xl p-8 sm:p-10" @submit.prevent="handleSubmit">
          <!-- Name & Email row -->
          <div class="grid gap-6 sm:grid-cols-2">
            <UFormField label="Full Name" required>
              <UInput v-model="form.name" placeholder="John Smith" size="xl" />
            </UFormField>
            <UFormField label="Email" required>
              <UInput v-model="form.email" type="email" placeholder="john@company.com" size="xl" />
            </UFormField>
          </div>

          <!-- Company & Phone row -->
          <div class="mt-6 grid gap-6 sm:grid-cols-2">
            <UFormField label="Company">
              <UInput v-model="form.company" placeholder="Company Name" size="xl" />
            </UFormField>
            <UFormField label="Phone">
              <UInput v-model="form.phone" type="tel" placeholder="(555) 555-5555" size="xl" />
            </UFormField>
          </div>

          <!-- Subject — full width -->
          <UFormField label="Subject" class="mt-6">
            <USelect v-model="form.subject" :items="subjectOptions" placeholder="Select a subject..." size="xl" class="w-full" />
          </UFormField>

          <!-- Message — large textarea -->
          <UFormField label="Message" class="mt-6" required>
            <UTextarea
              v-model="form.message"
              placeholder="Tell us about the equipment you need, including part numbers, quantities, and any specifications..."
              :rows="10"
              size="xl"
              class="w-full"
            />
          </UFormField>

          <div class="mt-8 flex items-center justify-between">
            <p class="text-sm text-dimmed">We typically respond within 24 hours.</p>
            <UButton type="submit" color="primary" size="xl" :loading="submitting">
              Send Message
            </UButton>
          </div>

          <div v-if="submitted" class="mt-6 rounded-lg bg-muted border border-default p-4">
            <p class="text-sm text-primary">
              <UIcon name="i-lucide-circle-check" class="mr-1 inline size-4" />
              Thank you! Your message has been sent. Our team will get back to you shortly.
            </p>
          </div>
        </UForm>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <div class="rounded-xl border border-default bg-muted p-6">
          <h3 class="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-brand-600">Direct Contact</h3>
          <div class="space-y-4 text-base text-muted">
            <div>
              <p class="mb-1 font-medium text-default">Call Us (Toll Free)</p>
              <ULink to="tel:8002325809" class="flex items-center gap-2 transition-colors hover:text-brand-600">
                <UIcon name="i-lucide-phone" class="size-4 text-brand-600" />
                800-232-5809
              </ULink>
            </div>
            <div>
              <p class="mb-1 font-medium text-default">Email</p>
              <ULink to="mailto:sales@circuitbreaker.com" class="flex items-center gap-2 transition-colors hover:text-brand-600">
                <UIcon name="i-lucide-mail" class="size-4 text-brand-600" />
                sales@circuitbreaker.com
              </ULink>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-default bg-default p-6">
          <h3 class="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-brand-600">
            Why Request a Quote?
          </h3>
          <ul class="space-y-2.5 text-sm text-dimmed">
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-circle-check" class="mt-0.5 size-3.5 shrink-0 text-brand-500" />
              <span>Competitive pricing on all equipment</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-circle-check" class="mt-0.5 size-3.5 shrink-0 text-brand-500" />
              <span>Volume discounts available</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-circle-check" class="mt-0.5 size-3.5 shrink-0 text-brand-500" />
              <span>Custom reconditioning to your specs</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-lucide-circle-check" class="mt-0.5 size-3.5 shrink-0 text-brand-500" />
              <span>Fast turnaround on urgent orders</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
