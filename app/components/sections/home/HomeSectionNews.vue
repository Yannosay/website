<template>
  <section id="news" class="section dark">
    <p class="eyebrow reveal">Stay updated</p>
    <h2 class="section-heading reveal reveal-d1">Latest <em>news.</em></h2>
    <div class="grid">
      <NuxtLink
        v-for="(item, i) in latest"
        :key="item.slug"
        :to="`/news/${item.slug}`"
        :class="['cell', 'reveal', `reveal-d${i + 1}`]"
      >
        <p class="label">{{ formatDate(item.date) }}</p>
        <p class="title">{{ item.title }}</p>
        <p class="body">
          <span class="excerpt-text">{{ item.excerpt.replace(/\.{3}$/, '') }}</span>
          <span v-if="item.excerpt.endsWith('...')" class="excerpt-ellipsis">...</span>
          <NuxtLink v-if="item.excerpt.endsWith('...')" :to="`/news/${item.slug}`" class="read-more">Read more</NuxtLink>
        </p>
      </NuxtLink>
    </div>
    <NuxtLink to="/news" class="view-all reveal reveal-d4">
      View all announcements →
    </NuxtLink>
  </section>
</template>

<script setup>
const { data: news } = await useAsyncData('home-news', () =>
  $fetch('/api/news', {
    baseURL: 'https://news-api.yp-worker.workers.dev',
    headers: { Accept: 'application/json' }
  })
)

const latest = computed(() => news.value?.slice(0, 3) ?? [])

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
.section {
  padding: 9rem 4rem;
  border-top: 1px solid var(--line);
}

.dark {
  background: #0a0a0a;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: 1.2rem;
  overflow: hidden;
  margin-top: 4rem;
}

.cell {
  background: #0a0a0a;
  padding: 3rem 2.5rem;
  transition: background 0.3s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.cell:hover {
  background: #141414;
}

.label {
  font-size: 0.58rem;
  letter-spacing: 0.22em;
  font-weight: 200;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 1rem;
}

.title {
  font-weight: 900;
  font-size: 1.5rem;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 0.8rem;
}

.body {
  font-size: 0.78rem;
  font-weight: 200;
  color: var(--muted);
  line-height: 1.9;
}

.view-all {
  display: block;
  text-align: center;
  margin-top: 2.5rem;
  font-size: 0.8rem;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.3s;
}

.view-all:hover {
  color: var(--white);
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .section {
    padding: 5.5rem 1.4rem;
  }
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