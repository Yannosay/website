<template>
  <section class="news-article">
    <div v-if="pending" class="loading">
      <div class="spinner" aria-hidden="true" />
      <p class="sr-only">{{ $t('common.loading') }}</p>
    </div>

    <div v-else-if="error || !article" class="error-state">
      <p>{{ $t('common.error.newsArticle') }}</p>
      <NuxtLink to="/news" class="retry-btn">{{ $t('news.back') }}</NuxtLink>
    </div>

    <article v-else>
      <NuxtLink to="/news" class="back-link">{{ $t('news.back') }}</NuxtLink>

      <figure class="banner">
        <img
          :src="article.banner"
          :alt="article.bannerAlt || article.title"
          width="1200"
          height="675"
          decoding="async"
          fetchpriority="high"
        />
      </figure>

      <div class="meta-row">
        <span v-if="article.featured" class="badge">{{ $t('news.featured') }}</span>
        <ul v-if="article.tags.length" class="tags" role="list">
          <li v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</li>
        </ul>
      </div>

      <h1 class="title">{{ article.title }}</h1>

      <div class="byline">
        <template v-if="article.author">
          <span class="byline__author">{{ $t('news.by', { author: article.author }) }}</span>
          <span class="byline__dot" aria-hidden="true">·</span>
        </template>
        <time :datetime="article.date">{{ formatLong(article.date) }}</time>
        <template v-if="publishedTime">
          <span class="byline__dot" aria-hidden="true">·</span>
          <time :datetime="article.publishedAt || undefined">{{ publishedTime }}</time>
        </template>
        <template v-if="article.readingTimeMinutes">
          <span class="byline__dot" aria-hidden="true">·</span>
          <span>{{ $t('news.readingTime', { minutes: article.readingTimeMinutes }) }}</span>
        </template>
      </div>

      <p v-if="updatedLine" class="updated">{{ updatedLine }}</p>

      <div class="content" v-html="article.html" />

      <ShareArticle :title="article.title" :slug="article.slug" />
    </article>
  </section>
</template>

<script setup lang="ts">
import ShareArticle from '~/components/sections/news/ShareArticle.vue'

type ArticlePayload = {
  slug: string
  title: string
  date: string
  publishedAt: string | null
  updatedAt: string | null
  excerpt: string
  banner: string
  bannerAlt: string
  author: string | null
  tags: string[]
  featured: boolean
  readingTimeMinutes: number | null
  html: string
}

const props = defineProps({
  slug: { type: String, required: true }
})

const { formatLong, formatTime, formatLongDateTime } = useDateFormat()
const config = useRuntimeConfig()

const { data: article, pending, error } = await useFetch<ArticlePayload>(`/api/news/${props.slug}`, {
  key: `news-article-${props.slug}`
})

const publishedTime = computed(() => {
  const iso = article.value?.publishedAt
  if (!iso) return ''
  if (iso.endsWith('T00:00:00Z')) return ''
  return formatTime(iso)
})

const updatedLine = computed(() => {
  const iso = article.value?.updatedAt
  if (!iso) return ''
  if (iso.endsWith('T00:00:00Z')) return ''
  return `${formatLongDateTime(iso)}`
})

useCanonical(`/news/${props.slug}`)

useHead({
  title: () => article.value?.title
    ? `${article.value.title} – Yannosay Productions`
    : 'Announcement – Yannosay Productions',
  meta: [
    { name: 'description', content: () => article.value?.excerpt || '' },
    { property: 'og:title', content: () => article.value?.title || 'Announcement' },
    { property: 'og:description', content: () => article.value?.excerpt || '' },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: () => article.value?.banner || '/og/og-default.png' }
  ]
})

useHead(() => {
  if (!article.value) return {}
  const base = String(config.public.siteUrl || '').replace(/\/$/, '')
  const banner = article.value.banner
    ? article.value.banner.startsWith('http')
      ? article.value.banner
      : `${base}${article.value.banner}`
    : `${base}/og/og-default.png`
  return {
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.value.title,
          datePublished: article.value.publishedAt || article.value.date,
          dateModified: article.value.updatedAt || article.value.publishedAt || article.value.date,
          image: banner,
          author: {
            '@type': article.value.author ? 'Person' : 'Organization',
            name: article.value.author || 'Yannosay Productions'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Yannosay Productions',
            logo: {
              '@type': 'ImageObject',
              url: `${base}/assets/images/logo/logo.png`
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${base}/news/${article.value.slug}`
          }
        })
      }
    ]
  }
})
</script>

<style scoped>
.news-article {
  min-height: 100svh;
  padding: clamp(7rem, 11vw, 10rem) 2rem clamp(6rem, 10vw, 9rem);
  max-width: 47rem;
  margin: 0 auto;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60svh;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--white);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60svh;
  gap: 1rem;
  color: var(--muted);
  text-align: center;
}

.back-link,
.retry-btn {
  display: inline-block;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  margin-bottom: 3.75rem;
  transition: color 0.2s;
}

.back-link:hover,
.retry-btn:hover {
  color: var(--white);
}

.banner {
  margin: 0 0 3.75rem;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 1rem;
  background: #141414;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.35rem;
}

.badge {
  font-size: 0.55rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--white);
  background: rgba(255, 255, 255, 0.08);
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
}

.tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.22rem 0.65rem;
  border-radius: 999px;
}

.title {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: clamp(2.5rem, 5.5vw, 3.85rem);
  letter-spacing: -0.035em;
  line-height: 1.05;
  overflow-wrap: anywhere;
}

.byline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
  margin-top: 1.6rem;
  font-size: 0.85rem;
  color: var(--muted);
}

.byline__author {
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
}

.byline__dot {
  color: rgba(255, 255, 255, 0.2);
}

.updated {
  margin-top: 0.75rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  font-style: italic;
}

.content {
  margin-top: 4.5rem;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.0625rem;
  letter-spacing: 0.005em;
  overflow-wrap: anywhere;
}

.content :deep(h2) {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1.9rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-top: 4.5rem;
  margin-bottom: 1.35rem;
  color: var(--white);
}

.content :deep(h2:first-child) {
  margin-top: 0;
}

.content :deep(h3) {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 1.45rem;
  line-height: 1.25;
  margin-top: 3.25rem;
  margin-bottom: 1rem;
  color: var(--white);
}

.content :deep(h4) {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 1.15rem;
  line-height: 1.3;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  color: var(--white);
}

.content :deep(p) {
  margin-bottom: 1.6rem;
}

.content :deep(strong) {
  font-weight: 600;
  color: var(--white);
}

.content :deep(em) {
  font-style: italic;
}

.content :deep(a) {
  color: var(--white);
  text-decoration: underline;
  text-underline-offset: 3px;
  overflow-wrap: anywhere;
}

.content :deep(a:hover) {
  opacity: 0.8;
}

.content :deep(ul),
.content :deep(ol) {
  padding-left: 1.9rem;
  margin-bottom: 1.75rem;
}

.content :deep(ul) {
  list-style: disc;
}

.content :deep(ol) {
  list-style: decimal;
}

.content :deep(li) {
  margin-bottom: 0.75rem;
  line-height: 1.75;
}

.content :deep(li > ul),
.content :deep(li > ol) {
  margin-top: 0.7rem;
  margin-bottom: 0;
}

.content :deep(ul:has(> li > input[type="checkbox"])) {
  list-style: none;
  padding-left: 0;
}

.content :deep(li:has(> input[type="checkbox"])) {
  list-style: none;
  position: relative;
  padding-left: 1.9rem;
  margin-bottom: 0.85rem;
  line-height: 1.6;
}

.content :deep(input[type="checkbox"]) {
  appearance: none;
  -webkit-appearance: none;
  position: absolute;
  left: 0;
  top: 0.32em;
  width: 1.15rem;
  height: 1.15rem;
  margin: 0;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 0.3rem;
  background: rgba(255, 255, 255, 0.03);
  cursor: default;
  transition: background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}

.content :deep(input[type="checkbox"]:checked) {
  background: linear-gradient(135deg, #ffb1db 0%, #ffe5f3 100%);
  border-color: #ffe5f3;
  box-shadow: 0 0 12px rgba(255, 177, 219, 0.3);
}

.content :deep(input[type="checkbox"]:checked::after) {
  content: '';
  position: absolute;
  left: 50%;
  top: 47%;
  width: 5px;
  height: 9px;
  border: solid #0a0a0a;
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -50%) rotate(45deg);
}

.content :deep(blockquote) {
  border-left: 2px solid rgba(255, 255, 255, 0.2);
  padding-left: 1.75rem;
  margin: 2.75rem 0;
  color: rgba(255, 255, 255, 0.68);
  font-style: italic;
  font-size: 1.0625rem;
  line-height: 1.85;
}

.content :deep(code) {
  font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace;
  background: rgba(255, 255, 255, 0.06);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  overflow-wrap: anywhere;
}

.content :deep(pre) {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 1.5rem 1.75rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 2.75rem 0;
  max-width: 100%;
}

.content :deep(pre code) {
  background: none;
  padding: 0;
  font-size: 0.85rem;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.85);
  white-space: pre;
  overflow-wrap: normal;
}

.content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 2.5rem 0;
  font-size: 0.9rem;
  display: block;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.content :deep(thead) {
  background: rgba(255, 255, 255, 0.03);
}

.content :deep(th),
.content :deep(td) {
  text-align: left;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.content :deep(th) {
  font-weight: 600;
  color: var(--white);
}

.content :deep(hr) {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin: 4rem 0;
}

.content :deep(.media-figure) {
  margin: 3rem 0;
}

.content :deep(.media-figure img),
.content :deep(.media-figure video) {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  display: block;
  background: rgba(255, 255, 255, 0.02);
}

.content :deep(figcaption) {
  margin-top: 0.9rem;
  font-size: 0.82rem;
  color: var(--muted);
  text-align: center;
  font-style: italic;
  line-height: 1.55;
}

.content :deep(.media-embed) {
  position: relative;
  aspect-ratio: 16 / 9;
  margin: 3rem 0;
  border-radius: 10px;
  overflow: hidden;
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.content :deep(.media-embed iframe) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  display: block;
  background: rgba(255, 255, 255, 0.02);
}

.content :deep(p > img:only-child) {
  margin: 3rem 0;
}

.content :deep(.hljs-string) { color: #a5d6ff; }
.content :deep(.hljs-number),
.content :deep(.hljs-literal) { color: #ffab70; }
.content :deep(.hljs-keyword),
.content :deep(.hljs-attr) { color: #c792ea; }
.content :deep(.hljs-title) { color: #82aaff; }
.content :deep(.hljs-type),
.content :deep(.hljs-built_in) { color: #ffcb6b; }
.content :deep(.hljs-comment) { color: rgba(255, 255, 255, 0.3); font-style: italic; }
.content :deep(.hljs-punctuation) { color: rgba(255, 255, 255, 0.5); }
.content :deep(.hljs-property) { color: #80cbc4; }

@media (max-width: 640px) {
  .news-article {
    padding: 6rem 1.4rem 5rem;
  }

  .back-link {
    margin-bottom: 2.5rem;
  }

  .banner {
    margin-bottom: 2.5rem;
  }

  .content {
    margin-top: 3rem;
    font-size: 1rem;
    line-height: 1.8;
  }

  .content :deep(h2) {
    margin-top: 3rem;
    font-size: 1.6rem;
  }

  .content :deep(h3) {
    margin-top: 2.25rem;
    font-size: 1.25rem;
  }

  .content :deep(p) {
    margin-bottom: 1.35rem;
  }

  .content :deep(blockquote) {
    padding-left: 1.2rem;
    font-size: 1rem;
    margin: 2rem 0;
  }

  .content :deep(pre) {
    padding: 1.15rem 1.25rem;
    margin: 1.85rem 0;
  }

  .content :deep(hr) {
    margin: 2.75rem 0;
  }

  .content :deep(.media-embed),
  .content :deep(.media-figure) {
    margin: 2rem 0;
  }
}
</style>
