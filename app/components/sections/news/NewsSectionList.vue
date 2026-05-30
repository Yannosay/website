<template>
  <section class="news-list">
    <div v-if="pending" class="loading">
      <div class="spinner" />
      <p>Loading announcements…</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>Unable to load announcements.</p>
      <button class="retry-btn" @click="refresh">Try again</button>
    </div>

    <template v-else>
      <h1 class="title">Announcements</h1>

      <div v-if="news.length === 0" class="empty">
        <p>No announcements yet.</p>
      </div>

      <div v-else class="grid">
        <article v-for="item in news" :key="item.slug" class="card">
          <NuxtLink :to="`/news/${item.slug}`" class="card-link">
            <h2 class="card-title">{{ item.title }}</h2>
          </NuxtLink>
          <time class="card-date" :datetime="item.date">
            {{ formatDate(item.date) }}
          </time>
          <p class="card-excerpt">
            <span class="excerpt-text">{{ item.excerpt.replace(/\.{3}$/, '') }}</span>
            <span v-if="item.excerpt.endsWith('...')" class="excerpt-ellipsis">...</span>
            <NuxtLink v-if="item.excerpt.endsWith('...')" :to="`/news/${item.slug}`" class="read-more">Read more</NuxtLink>
          </p>
        </article>
      </div>
    </template>
  </section>
</template>

<script setup>
const { data: news, pending, error } = await useAsyncData(
  'news-list',
  () =>
    $fetch('/api/news', {
      baseURL: 'https://news-api.yp-worker.workers.dev',
      headers: { Accept: 'application/json' }
    })
)

function formatDate(dateStr) {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.news-list {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 2rem;
}

.title {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: clamp(3rem, 8vw, 5rem);
  letter-spacing: -0.04em;
  margin-bottom: 4rem;
  text-align: center;
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
  to {
    transform: rotate(360deg);
  }
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
}

.retry-btn:hover {
  background: rgba(255, 255, 255, 0.14);
}

.grid {
  display: grid;
  gap: 2.5rem;
  max-width: 48rem;
  width: 100%;
}

.card {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding-bottom: 2.5rem;
}

.card:last-child {
  border-bottom: none;
}

.card-link {
  text-decoration: none;
  color: inherit;
}

.card-title {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: clamp(1.4rem, 3vw, 1.85rem);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.card-title:hover {
  text-decoration: underline;
  text-underline-offset: 5px;
  text-decoration-thickness: 1px;
}

.card-date {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.8rem;
  color: var(--muted);
}

.card-excerpt {
  margin-top: 0.75rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.65;
  font-size: 0.95rem;
}

.excerpt-text {
  mask-image: linear-gradient(to right, #fff 70%, transparent);
  -webkit-mask-image: linear-gradient(to right, #fff 70%, transparent);
}

.excerpt-ellipsis {
  opacity: 1;
}

.read-more {
  color: var(--white);
  font-weight: 500;
  text-decoration: none;
  margin-left: 0.25rem;
  opacity: 1;
}

.read-more:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>