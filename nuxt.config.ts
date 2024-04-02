export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Tasks App',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap' }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-feather-icons',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxtjs/eslint-module',
  ],

  colorMode: {
    classSuffix: ''
  }
})
