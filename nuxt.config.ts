export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '~/assets/css/main.css',
    '~/assets/css/global.css'
  ],
  app: {
    head: {
      // meta: [
      //   { name: 'description', content: 'We do..' },
      //   { property: 'og:description', content: 'We do...' },
      //   { property: 'og:type', content: 'website' },
      //   { name: 'twitter:card', content: 'summary_large_image' },
      //   { name: 'twitter:image', content: '/assets/img.png' },
      //   { property: 'og:image', content: '/assets/img.png' },
      // ]
    }
  },
  nitro: {
    preset: 'cloudflare-pages',
    cloudflare: {
      nodeCompat: true
    }
  },
  compatibilityDate: '2026-05-25',
  components: [
    {
      path: '~/components',
      pathPrefix: false
    },
    {
      path: '~/components/sections',
      pathPrefix: false,
      pattern: '**/*.vue',
      global: true
    },
    {
      path: '~/components/ui',
      pathPrefix: false,
      prefix: 'Ui',
      pattern: '**/*.vue',
      global: true
    },
    {
      path: '~/components/global',
      pathPrefix: false,
      pattern: '**/*.vue',
      global: true
    }
  ]
})