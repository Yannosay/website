export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
      { code: 'de', name: 'Deutsch', language: 'de-DE', file: 'de.json' }
    ],
    langDir: 'locales',
    restructureDir: 'i18n-config',
    detectBrowserLanguage: false
  },

  css: ['~/assets/css/main.scss'],

  runtimeConfig: {
    public: {
      newsApi: 'https://news-api.yp-worker.workers.dev',
      siteUrl: 'https://yannosay.com'
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/explore': { prerender: true },
    '/tools': { prerender: true },
    '/tools/**': { prerender: true },
    '/games': { prerender: true },
    '/movies': { prerender: true },
    '/illustrations': { prerender: true },
    '/youtube': { prerender: true },
    '/ai': { prerender: true },
    '/rss.xml': { swr: 300 },
    '/sitemap.xml': { swr: 3600 },
    
    '/html/**': { static: true }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#000000' },
        { name: 'description', content: 'Yannosay Productions is an indie studio crafting games, tools, story-driven productions, videos, art, music, and code. We bring bold ideas to life.' },
        { property: 'og:site_name', content: 'Yannosay Productions' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og/og-default.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: '/og/og-default.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/icon-512.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/unbounded-400.woff2', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/unbounded-900.woff2', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/dm-serif-display-400.woff2', crossorigin: 'anonymous' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'Yannosay Productions News', href: '/rss.xml' }
      ]
    }
  },

  nitro: {
    preset: 'cloudflare-pages',
    cloudflare: { nodeCompat: true }
  },

  compatibilityDate: '2026-05-30',

  components: false,

  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit']
    }
  }
})


