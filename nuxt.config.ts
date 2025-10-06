// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/leaflet',
  ],

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

  compatibilityDate: '2025-07-15',

  eslint: {
    config: {
      stylistic: true, // activeert Stylistic in plaats van Prettier
    },
  },
})
