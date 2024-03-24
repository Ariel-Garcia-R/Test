import { Link } from "#build/components";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['assets/styles.css'],
  app: {
    head: {
      link: [
        {rel: 'preconnect', href:'https://fonts.googleapis.com'},
        {rel: 'preconnect', href: 'https://fonts.gstatic.com'},
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap'}
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-feather-icons',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ]
})
