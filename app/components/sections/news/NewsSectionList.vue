<template>
  <section class="news-list">
    <div v-if="pending" class="loading">
      <div class="spinner" aria-hidden="true" />
      <p>{{ $t('common.loading') }}</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ $t('common.error.newsList') }}</p>
      <button type="button" class="retry-btn" @click="onRetry">{{ $t('common.retry') }}</button>
    </div>

    <template v-else>
      <header class="news-list__header">
        <h1 class="news-list__title">{{ $t('news.title') }}</h1>
        <a
          href="/rss.xml"
          class="news-list__rss"
          :aria-label="$t('news.rss')"
          rel="alternate"
          type="application/rss+xml"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 11a9 9 0 0 1 9 9" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1.5" fill="currentColor" />
          </svg>
        </a>
      </header>

      <div v-if="!items.length" class="empty">
        <p>{{ $t('home.news.empty') }}</p>
      </div>

      <template v-else>
        <section v-if="featuredItems.length" class="section">
          <h2 class="section__heading">{{ $t('news.featuredHeading') }}</h2>
          <div class="grid">
            <article v-for="item in featuredItems" :key="item.slug" class="card card--featured">
              <NuxtLink :to="`/news/${item.slug}`" class="card__link">
                <div class="card__banner">
                  <img
                    :src="item.banner"
                    :alt="item.bannerAlt || item.title"
                    width="1200"
                    height="675"
                    decoding="async"
                  />
                  <span class="card__badge">{{ $t('news.featured') }}</span>
                </div>
                <h3 class="card__title">{{ item.title }}</h3>
                <p v-if="item.excerpt" class="card__excerpt line-clamp-2">{{ item.excerpt }}</p>
                <div class="card__footer">
                  <time class="card__date" :datetime="item.date">{{ formatLong(item.date) }}</time>
                  <template v-if="item.readingTimeMinutes">
                    <span class="card__dot" aria-hidden="true">·</span>
                    <span class="card__reading">{{ $t('news.readingTime', { minutes: item.readingTimeMinutes }) }}</span>
                  </template>
                </div>
              </NuxtLink>
            </article>
          </div>
        </section>

        <section v-if="otherItems.length" class="section">
          <h2 v-if="featuredItems.length" class="section__heading">{{ $t('news.moreArticles') }}</h2>
          <div class="grid">
            <article v-for="item in otherItems" :key="item.slug" class="card">
              <NuxtLink :to="`/news/${item.slug}`" class="card__link">
                <div class="card__banner">
                  <img
                    :src="item.banner"
                    :alt="item.bannerAlt || item.title"
                    width="1200"
                    height="675"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 class="card__title">{{ item.title }}</h3>
                <p v-if="item.excerpt" class="card__excerpt line-clamp-2">{{ item.excerpt }}</p>
                <div class="card__footer">
                  <time class="card__date" :datetime="item.date">{{ formatLong(item.date) }}</time>
                  <template v-if="item.readingTimeMinutes">
                    <span class="card__dot" aria-hidden="true">·</span>
                    <span class="card__reading">{{ $t('news.readingTime', { minutes: item.readingTimeMinutes }) }}</span>
                  </template>
                </div>
              </NuxtLink>
            </article>
          </div>
        </section>
      </template>
    </template>
  </section>
</template>

<script setup lang="ts">
type NewsItem = {
  slug: string
  title: string
  date: string
  publishedAt?: string | null
  updatedAt?: string | null
  excerpt?: string
  banner: string
  bannerAlt?: string | null
  author?: string | null
  tags?: string[]
  featured?: boolean
  readingTimeMinutes?: number | null
}

const { formatLong } = useDateFormat()

const { data, pending, error, refresh } = await useFetch<NewsItem[]>('/api/news', {
  key: 'news-list'
})

const items = computed<NewsItem[]>(() => (Array.isArray(data.value) ? data.value : []))
const featuredItems = computed<NewsItem[]>(() => items.value.filter((item) => item.featured === true))
const otherItems = computed<NewsItem[]>(() => items.value.filter((item) => item.featured !== true))

const onRetry = () => {
  refresh()
}
</script>

<style scoped>
.news-list {
  min-height: 100svh;
  padding: 8rem 2rem 6rem;
  max-width: 80rem;
  margin: 0 auto;
}

.news-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.news-list__title {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: clamp(2.5rem, 6vw, 4rem);
  letter-spacing: -0.04em;
  line-height: 0.95;
}

.news-list__rss {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: color 0.2s, background 0.2s, border-color 0.2s;
}

.news-list__rss:hover {
  color: var(--white);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}

.news-list__rss:focus-visible {
  outline: 2px solid var(--white);
  outline-offset: 3px;
}

.loading,
.error-state,
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60svh;
  gap: 1rem;
  color: var(--muted);
  text-align: center;
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

.retry-btn {
  background: rgba(255, 255, 255, 0.08);
  color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
  font-family: inherit;
}

.retry-btn:hover {
  background: rgba(255, 255, 255, 0.14);
}

.section + .section {
  margin-top: 4.5rem;
}

.section__heading {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
  color: rgba(255, 255, 255, 0.78);
  margin-bottom: 1.75rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 2.5rem 1.75rem;
}

.card {
  min-width: 0;
}

.card__link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.card__banner {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 0.75rem;
  overflow: hidden;
  background: #0d0d0d;
  margin-bottom: 1.1rem;
}

.card__banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.55s var(--ease);
}

.card:hover .card__banner img {
  transform: scale(1.03);
}

.card__badge {
  position: absolute;
  top: 0.7rem;
  left: 0.7rem;
  padding: 0.24rem 0.6rem;
  font-size: 0.55rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: 500;
  color: #0a0a0a;
  background: linear-gradient(135deg, #ffb1db 0%, #ffe5f3 100%);
  border-radius: 999px;
  box-shadow: 0 4px 14px rgba(255, 177, 219, 0.3);
  pointer-events: none;
  z-index: 1;
}

.card__title {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  line-height: 1.3;
  margin-bottom: 0.55rem;
  overflow-wrap: anywhere;
}

.card:hover .card__title {
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 1px;
}

.card__excerpt {
  font-size: 0.82rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1rem;
  overflow-wrap: anywhere;
}

.card__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.02em;
}

.card__dot {
  color: rgba(255, 255, 255, 0.15);
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .news-list {
    padding: 6rem 1.4rem 4rem;
  }

  .news-list__header {
    margin-bottom: 2.25rem;
  }

  .section + .section {
    margin-top: 3.5rem;
  }

  .grid {
    gap: 2.25rem 1.25rem;
  }
}
</style>
