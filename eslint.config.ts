import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: { stylistic: true, typescript: true },
}).append({
  files: ['**/*.{ts,js,vue}'],
  rules: {
    // sta single‑word componentnamen toe (Tag, Tags, Collapse.client, …)
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',

    // sta function expressions/arrow functions toe
    'func-style': 'off', // of: ['error','expression',{ allowArrowFunctions: true }]

    // ongebruikte args met underscore negeren
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // zet uit als je nu door wilt; anders types fixen
    '@typescript-eslint/no-explicit-any': 'off',
  },
})
