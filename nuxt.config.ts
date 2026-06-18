import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n'
  ],

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
  css: [
    '~/assets/css/main.css',
    '~/assets/css/global.css'
  ],

  runtimeConfig: {
    public: {
      newsApi: process.env.NUXT_PUBLIC_NEWS_API || 'https://news-api.yp-worker.workers.dev'
    }
  },

  routeRules: {
    '/news': { swr: 600 },
    '/news/**': { swr: 3600 }
  },

  app: {
    head: {
      meta: [
        { name: 'description', content: 'We do..' },
        { property: 'og:description', content: 'We do...' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: '/assets/img.png' },
        { property: 'og:image', content: '/assets/img.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/assets/logo.png' }
      ]
    }
  },

  nitro: {
    preset: 'cloudflare-pages',
    minify: false,
    cloudflare: {
      nodeCompat: true
    }
  },

  features: {
    inlineStyles: false
  },

  hooks: {
    'render:html': (html: any) => {
      html.head = html.head
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/></g, '>\n<')
    }
  } as any,

  compatibilityDate: '2026-05-25',

  components: false,

  vite: {
    optimizeDeps: {
      include: [
        '@studio-freight/lenis',
        '@vue/devtools-core',
        '@vue/devtools-kit'
      ]
    }
  }
})