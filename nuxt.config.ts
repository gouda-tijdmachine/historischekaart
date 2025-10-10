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
    app: {
      token: '',
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
      'Source Sans 3': true,
    },
  },
})
