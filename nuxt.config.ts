// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/google-fonts',
    '@nuxtjs/leaflet',
    '@pinia/nuxt',
  ],

  // Turn off server side rendering - Customer wants client side only
  ssr: false,

  devtools: { enabled: true },

  app: {
    head: {
      title: 'Gouda Timemachine',
      htmlAttrs: {
        lang: 'nl',
      },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
      ],
    },
  },

  css: [
    'ress/ress.css',
    '~/assets/scss/main.scss',
  ],

  runtimeConfig: {
    public: {
      baseUrl: 'https://api-viewer.goudatijdmachine.nl/',
      token1: 'sk.eyJ1IjoidG90YWxhY3RpdmVtZWRpYSIsImEiOiJjbWdrbHI1N2kwbHpjMm5va2tuM3Fhdm5kIn0.9EwQAsbzCK8PrQnORKhxoA',
      token2: 'pk.eyJ1IjoiZ291ZGF0aWpkbWFjaGluZSIsImEiOiJja3Q2N2Fqb24wZm9sMm9wZThzMW1tYzF1In0.F9nmw4f4wDkIJnsbVqmzJQ',
    },
  },

  compatibilityDate: '2025-07-15',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/mixins.scss" as *;',
        },
      },
    },
  },

  eslint: {
    config: {
      stylistic: true, // activeert Stylistic in plaats van Prettier
    },
  },

  googleFonts: {
    families: {
      'Source Sans 3': [400, 500, 600, 700],
    },
  },
})
