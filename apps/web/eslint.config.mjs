// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import { sharedConfigs } from '@narduk/eslint-config'

export default withNuxt(...sharedConfigs, {
  files: ['**/*.{ts,vue,js,mjs}'],
  rules: {
    // Design system: relax so existing app passes; migrate to UButton/USelect/useSeo over time
    'atx/no-raw-tailwind-colors': 'off',
    'atx/no-native-layout': 'off',
    'atx/no-native-button': 'off',
    'atx/no-native-form': 'off',
    'atx/no-native-input': 'off',
    'atx/no-multi-statement-inline-handler': 'off',
    'atx/no-fetch-in-component': 'off',
    'nuxt-guardrails/no-ssr-dom-access': 'off',
    'regexp/no-super-linear-backtracking': 'off',
    'nuxt-guardrails/require-use-seo-on-pages': 'off',
    'nuxt-guardrails/require-schema-on-pages': 'off',
    'nuxt-guardrails/prefer-use-seo-over-bare-meta': 'off',
    'vue-official/no-template-complex-expressions': 'off',
    'vue/no-v-html': 'off',
    'vue/block-order': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'unicorn/prefer-string-replace-all': 'off',
    'unicorn/prefer-number-properties': 'off',
  },
})
