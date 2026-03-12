// App-specific ESLint rule overrides for circuit-breaker-online.
// This file is never synced by the template — edit freely.
export default [
  {
    files: ['**/*.{ts,vue,js,mjs}'],
    rules: {
      // Design system: relax so existing app passes; migrate to UButton/USelect/useSeo over time
      'narduk/no-raw-tailwind-colors': 'off',
      'narduk/no-native-layout': 'off',
      'narduk/no-native-button': 'off',
      'narduk/no-native-form': 'off',
      'narduk/no-native-input': 'off',
      'narduk/no-multi-statement-inline-handler': 'off',
      'narduk/no-fetch-in-component': 'off',
      'narduk/no-ssr-dom-access': 'off',
      'regexp/no-super-linear-backtracking': 'off',
      'narduk/require-use-seo-on-pages': 'off',
      'narduk/require-schema-on-pages': 'off',
      'narduk/prefer-use-seo-over-bare-meta': 'off',
      'narduk/no-template-complex-expressions': 'off',
      'vue/no-v-html': 'off',
      'vue/block-order': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'unicorn/prefer-string-replace-all': 'off',
      'unicorn/prefer-number-properties': 'off',
      // Workaround: <ul> HTML element is false-positived as unknown Nuxt UI component "UL"
      'narduk/no-unknown-nuxt-ui-component': ['error', { additionalComponents: ['UL'] }],
    },
  },
]
