<template>
  <div class="bg-black text-white min-h-screen overflow-x-hidden">

    <section class="hero">
      <div class="orb" aria-hidden="true" />
      <h1 class="title">
        <span class="name">Yannosay</span>
        <span class="productions">Productions</span>
      </h1>
      <div class="cta-row">
        <PillButton variant="filled" to="./explore">{{ $t('home.hero.download') }}</PillButton>
        <PillButton variant="ghost" href="https://discord.gg/SUvcrafTQm">{{ $t('home.hero.discord') }}</PillButton>
      </div>
    </section>

    <section id="work" class="section">
      <div class="header">
        <div>
          <p class="eyebrow reveal">{{ $t('home.work.eyebrow') }}</p>
          <h2 class="section-heading reveal reveal-d1">{{ $t('home.work.heading') }}</h2>
        </div>
        <span class="count reveal">{{ $t('home.work.count', { count: String(workItems.length).padStart(2, '0') }) }}</span>
      </div>
      <div class="list">
        <div v-for="(item, i) in workItems" :key="item.name" :class="['item', 'reveal', `reveal-d${i}`]">
          <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="name">{{ item.name }}</span>
          <span class="type">{{ item.type }}</span>
          <div class="right">
            <span class="arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </div>
      </div>
    </section>

    <section id="sinth" class="section dark">
      <div class="grid">
        <div>
          <p class="eyebrow reveal">{{ $t('home.sinth.eyebrow') }}</p>
          <h2 class="section-heading reveal reveal-d1">
            <img
              src="/assets/images/sinth/sinthbanner-progress.webp"
              alt="Sinth"
              class="sinth-logo-inline"
              width="300"
              height="100"
              decoding="async"
            />
          </h2>
          <p class="body reveal reveal-d2">{{ $t('home.sinth.description') }}</p>
          <div class="pills reveal reveal-d3">
            <PillButton href="https://www.npmjs.com/package/@yannosay/sinth" variant="filled">{{ $t('home.sinth.npm') }}</PillButton>
            <PillButton href="https://github.com/yannosay/sinth">{{ $t('home.sinth.github') }}</PillButton>
            <PillButton href="https://discord.gg/SUvcrafTQm">{{ $t('home.sinth.discord') }}</PillButton>
          </div>
        </div>
        <div class="reveal reveal-d2">
          <SinthVideoEmbed video-id="W0tOMTiIF0Q" video-title="Sinth introduction video" />
        </div>
      </div>
    </section>

    <section id="news" class="section dark">
      <p class="eyebrow reveal">{{ $t('home.news.eyebrow') }}</p>
      <h2 class="section-heading reveal reveal-d1">{{ $t('home.news.heading') }}</h2>
      <p v-if="lastUpdated" class="last-updated reveal reveal-d2">
        {{ $t('home.news.lastUpdated', { time: lastUpdated }) }}
      </p>
      <div class="grid">
        <NuxtLink
          v-for="(item, i) in latest"
          :key="item.slug"
          :to="`/news/${item.slug}`"
          :class="['cell', 'reveal', `reveal-d${i + 1}`]"
        >
          <div class="cell__banner">
            <img
              :src="bannerFor(item)"
              :alt="item.bannerAlt || item.title"
              width="1200"
              height="675"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p class="label">{{ formatShort(item.date) }}</p>
          <p class="title">{{ item.title }}</p>
          <p v-if="item.excerpt" class="body line-clamp-2">{{ item.excerpt }}</p>
          <span class="read-more">{{ $t('home.news.readMore') }}</span>
        </NuxtLink>
      </div>
      <NuxtLink to="/news" class="view-all reveal reveal-d4">
        {{ $t('home.news.viewAll') }}
      </NuxtLink>
    </section>

    <section id="more" class="section dark">
      <p class="eyebrow reveal">{{ $t('home.more.eyebrow') }}</p>
      <h2 class="section-heading reveal reveal-d1">{{ $t('home.more.heading') }}</h2>
      <div class="grid">
        <div v-for="(cell, i) in moreItems" :key="cell.title" :class="['cell', 'reveal', `reveal-d${i + 1}`]">
          <p class="label">{{ cell.label }}</p>
          <p class="title">{{ cell.title }}</p>
          <p class="body">{{ cell.body }}</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import PillButton from '~/components/ui/PillButton.vue'
import SinthVideoEmbed from '~/components/ui/SinthVideoEmbed.vue'
import ModalSinthDownload from '~/components/modals/ModalSinthDownload.vue'

type NewsItem = {
  slug: string
  title: string
  date: string
  excerpt?: string
  banner?: string | null
  bannerAlt?: string | null
}

const DEFAULT_NEWS_BANNER = '/assets/images/news/default-banner.webp'

const modal = useModal()
const { workItems, moreItems } = useSiteData()
const { format: formatRelative } = useRelativeTime()
const { formatShort } = useDateFormat()

const handleOpen = () => {
  modal.open(
    ModalSinthDownload,
    { package: 'Sinth', ariaLabel: 'Download Sinth' },
    { size: 'md', scrollable: false, closable: true }
  )
}

const { data: news } = await useFetch<NewsItem[]>('/api/news', { key: 'home-news' })

const latest = computed<NewsItem[]>(() => (Array.isArray(news.value) ? news.value : []).slice(0, 3))

const lastUpdated = computed(() => {
  const first = Array.isArray(news.value) ? news.value[0] : null
  if (!first?.date) return ''
  return formatRelative(first.date)
})

const bannerFor = (item: NewsItem): string => item.banner || DEFAULT_NEWS_BANNER

useCanonical('/')

useHead({
  title: 'Yannosay Productions',
  titleTemplate: null,
  meta: [
    { name: 'description', content: 'Yannosay Productions is an indie studio creating games, tools, useful programs, productions, videos, art, music, films and code.' },
    { property: 'og:title', content: 'Yannosay Productions' },
    { property: 'og:description', content: 'An indie studio creating creative. Tools, Games, Art, Music... Explore our creative universe!' }
  ]
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          //                                           WebSite Schema
          {
            '@type': 'WebSite',
            '@id': 'https://yannosay.com/#website',
            'url': 'https://yannosay.com',
            'name': 'Yannosay',
            'alternateName': ['Yannosay Productions'],
          },

          {
            '@type': 'Organization',
            '@id': 'https://yannosay.com/#organization',
            'name': 'Yannosay Productions',
            'url': 'https://yannosay.com',
            'logo': 'https://yannosay.com/assets/images/logo/logo.png',
            'sameAs': [
              'https://github.com/yannosay',
              'https://www.youtube.com/@yannosay',
              'https://www.npmjs.com/package/@yannosay/sinth'
            ]
          }
        ]
      })
    }
  ]
})
</script>

<style scoped>
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 4rem;
  position: relative;
  overflow: hidden;
}

.orb {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 55vw;
  height: 55vw;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 70%);
  animation: pulse 8s ease-in-out infinite alternate;
}

@keyframes pulse {
  from { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  to   { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
}

.title {
  line-height: 0.9;
  letter-spacing: -0.04em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.name {
  font-family: var(--font-sans);
  font-weight: 900;
  font-size: clamp(4.5rem, 12vw, 11rem);
  color: var(--white);
  opacity: 0;
  animation: rise 0.9s 0.1s var(--ease) forwards;
}

.productions {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(3rem, 8.5vw, 8rem);
  color: var(--white);
  opacity: 0;
  animation: rise 0.9s 0.3s var(--ease) forwards;
}

@keyframes rise {
  from { opacity: 0; transform: translateY(40px) skewY(2deg); }
  to   { opacity: 1; transform: translateY(0) skewY(0); }
}

.cta-row {
  margin-top: 3rem;
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 0;
  animation: fadeIn 0.8s 0.9s var(--ease) forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 640px) {
  .hero { padding: 0 1.4rem; }
}

#work.section { padding: 9rem 4rem; border-top: 1px solid var(--line); }
#work .header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 5rem; flex-wrap: wrap; gap: 2rem; }
#work .count { font-size: 0.6rem; font-weight: 200; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
#work .list { display: flex; flex-direction: column; }
#work .item {
  display: grid;
  grid-template-columns: 3rem 1fr 1fr auto;
  align-items: center;
  gap: 3rem;
  padding: 2.4rem 0;
  border-bottom: 1px solid var(--line);
  position: relative;
}
#work .item:first-child { border-top: 1px solid var(--line); }
#work .num { font-size: 0.6rem; font-weight: 200; color: var(--muted); letter-spacing: 0.1em; }
#work .name { font-family: var(--font-sans); font-weight: 900; font-size: clamp(1.4rem, 3vw, 2.6rem); letter-spacing: -0.03em; line-height: 1; }
#work .type { font-family: var(--font-serif); font-style: italic; font-size: clamp(0.88rem, 1.5vw, 1.05rem); color: var(--muted); }
#work .right { display: flex; align-items: center; gap: 1rem; }
#work .arrow {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  opacity: 0.25;
}

@media (max-width: 640px) {
  #work.section { padding: 5.5rem 1.4rem; }
  #work .item { grid-template-columns: 2rem 1fr auto; gap: 1.2rem; }
  #work .type, #work .right { display: none; }
}

#sinth.section { padding: 9rem 4rem; border-top: 1px solid var(--line); }
#sinth.dark { background: #0a0a0a; }
#sinth .grid { display: grid; grid-template-columns: 5fr 6fr; gap: 6rem; align-items: center; }
#sinth .body { font-size: 0.82rem; font-weight: 200; line-height: 2; color: var(--muted); margin-bottom: 2.2rem; max-width: 44ch; }
#sinth .pills { display: flex; gap: 0.7rem; flex-wrap: wrap; }

@media (max-width: 860px) {
  #sinth .grid { grid-template-columns: 1fr; gap: 3.5rem; }
}
@media (max-width: 640px) {
  #sinth.section { padding: 5.5rem 1.4rem; }
}

#news.section { padding: 9rem 4rem; border-top: 1px solid var(--line); }
#news.dark { background: #0a0a0a; }
#news .last-updated {
  margin-top: 1rem;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
}
#news .grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: 1.2rem;
  overflow: hidden;
  margin-top: 4rem;
}
#news .cell {
  background: #0a0a0a;
  padding: 1.5rem 1.5rem 2.25rem;
  transition: background 0.3s;
  text-decoration: none;
  color: inherit;
  display: block;
}
#news .cell:hover { background: #141414; }
#news .cell__banner {
  aspect-ratio: 16 / 9;
  width: 100%;
  overflow: hidden;
  border-radius: 0.6rem;
  margin-bottom: 1.5rem;
  background: #141414;
}
#news .cell__banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s var(--ease);
}
#news .cell:hover .cell__banner img { transform: scale(1.03); }
#news .label {
  font-size: 0.58rem;
  letter-spacing: 0.22em;
  font-weight: 200;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.85rem;
}
#news .title { font-weight: 900; font-size: 1.35rem; letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 0.75rem; overflow-wrap: anywhere; }
#news .body { font-size: 0.78rem; font-weight: 200; color: var(--muted); line-height: 1.9; overflow-wrap: anywhere; }
#news .read-more {
  display: inline-block;
  margin-top: 1rem;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  transition: color 0.2s;
}
#news .cell:hover .read-more { color: var(--white); }
#news .view-all {
  display: block;
  text-align: center;
  margin-top: 2.5rem;
  font-size: 0.8rem;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.3s;
}
#news .view-all:hover { color: var(--white); }

@media (max-width: 720px) {
  #news .grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  #news.section { padding: 5.5rem 1.4rem; }
}

#more.section { padding: 9rem 4rem; border-top: 1px solid var(--line); }
#more.dark { background: #0a0a0a; }
#more .grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: 1.2rem;
  overflow: hidden;
  margin-top: 4rem;
}
#more .grid > * { text-align: left; display: block; }
#more .cell { background: #0a0a0a; padding: 3rem 2.5rem; transition: background 0.3s; }
#more .cell:hover { background: #141414; }
#more .label { font-size: 0.58rem; letter-spacing: 0.22em; font-weight: 200; text-transform: uppercase; color: var(--muted); margin-bottom: 1rem; }
#more .title { font-weight: 900; font-size: 1.5rem; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 0.8rem; }
#more .body { font-size: 0.78rem; font-weight: 200; color: var(--muted); line-height: 1.9; }

@media (max-width: 720px) {
  #more .grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  #more.section { padding: 5.5rem 1.4rem; }
}

.sinth-logo-inline {
  height: 100px;
  width: auto;
  vertical-align: middle;
  margin-bottom: 1.5rem;
}
</style>
