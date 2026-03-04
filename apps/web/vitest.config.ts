import { defineConfig } from 'vitest/config'

export default defineConfig({
  // Prevent vite-plugin-esbuild from loading the Nuxt tsconfig
  // which requires `nuxt prepare` to generate .nuxt/tsconfig.*.json
  esbuild: {
    tsconfigRaw: '{}',
  },
  test: {
    include: ['tests/**/*.test.ts'],
  },
})
