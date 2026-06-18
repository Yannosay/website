<template>
  <div class="bg-black text-white min-h-screen overflow-x-hidden">

    <section class="hero">
      <div class="orb" />
      <h1 class="title">
        <span class="name">Yannosay</span>
        <span class="productions">Productions</span>
      </h1>
      <!-- <p class="sub">Games · Tools · Film</p> -->
      <div class="cta-row">
        <PillButton @click="handleOpen" variant="filled">{{ $t('home.hero.download') }}</PillButton>
        <PillButton variant="ghost">{{ $t('home.hero.screensaver') }}</PillButton>
        <PillButton variant="ghost">{{ $t('home.hero.discord') }}</PillButton>
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
        <div v-for="(item,i) in workItems" :key="item.name" :class="['item', 'reveal', `reveal-d${i}`]">
          <span class="num">{{ String(i+1).padStart(2,'0') }}</span>
          <span class="name">{{ item.name }}</span>
          <span class="type">{{ item.type }}</span>
          <div class="right">
            <span class="arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
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
              src="~/assets/images/sinthbanner-progress.webp" 
              alt="Sinth Logo"
              class="sinth-logo-inline"
            />
          </h2>
          <p class="body reveal reveal-d2">{{ $t('home.sinth.description') }}</p>
          <div class="pills reveal reveal-d3">
            <PillButton href="https://www.npmjs.com/@yannosay/sinth" variant="filled">{{ $t('home.sinth.npm') }}</PillButton>
            <PillButton href="https://github.com/yannosay/sinth">{{ $t('home.sinth.github') }}</PillButton>
            <PillButton href="https://discord.gg/SUvcrafTQm">{{ $t('home.sinth.discord') }}</PillButton>
          </div>
        </div>
        <div class="reveal reveal-d2">
          <SinthVideoEmbed video-id="W0tOMTiIF0Q" />
        </div>
      </div>
    </section>

    <section id="news" class="section dark">
      <p class="eyebrow reveal">{{ $t('home.news.eyebrow') }}</p>
      <h2 class="section-heading reveal reveal-d1">{{ $t('home.news.heading') }}</h2>
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
            <span v-if="item.excerpt.endsWith('...')" class="read-more">{{ $t('home.news.readMore') }}</span>
          </p>
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
        <div v-for="(cell,i) in moreItems" :key="cell.title" :class="['cell', 'reveal', `reveal-d${i+1}`]">
          <p class="label">{{ cell.label }}</p>
          <p class="title">{{ cell.title }}</p>
          <p class="body">{{ cell.body }}</p>
        </div>
      </div>
    </section>

  </div>
</template>



<script setup>
import PillButton from '~/components/ui/PillButton.vue'
import SinthVideoEmbed from '~/components/ui/SinthVideoEmbed.vue'
import ModalSinthDownload from '~/components/modals/ModalSinthDownload.vue'
import VerticalProgressBar from '~/components/ui/VerticalProgressBar.vue'


const modal = useModal()
const handleOpen = () => {
  modal.open(ModalSinthDownload, { package: 'Sinth' }, { size: 'md', scrollable: false, closable: true })
}

const { workItems, filmItems, moreItems } = useSiteData()

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


useHead({
  title: 'Yannosay Productions',
  meta: [
    { name: 'description', content: 'Latest news and updates from Yannosay Productions.' },
    { property: 'og:description', content: 'Latest news and updates from Yannosay Productions.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: '/assets/logo.png' },
    { property: 'og:image', content: '/assets/logo.png' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/assets/logo.png' }
  ]
})



</script>



<style scoped>



.hero {
  min-height:100svh; display:flex; flex-direction:column; align-items:center; justify-content:center;
  text-align:center; padding:0 4rem; position:relative; overflow:hidden;
}
.orb {
  position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
  width:55vw; height:55vw; border-radius:50%;
  background:radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
  animation:pulse 8s ease-in-out infinite alternate;
}
@keyframes pulse {
  from { transform:translate(-50%,-50%) scale(1); opacity:0.6 }
  to   { transform:translate(-50%,-50%) scale(1.15); opacity:1 }
}
.title { line-height:0.9; letter-spacing:-0.04em; display:flex; flex-direction:column; align-items:center }
.name {
  font-family:var(--font-sans); font-weight:900; font-size:clamp(4.5rem,12vw,11rem);
  color:var(--white); opacity:0; animation:rise 0.9s 0.1s var(--ease) forwards;
}
.productions {
  font-family:var(--font-serif); font-style:italic; font-weight:400;
  font-size:clamp(3rem,8.5vw,8rem); color:var(--white); opacity:0.0;
  animation:rise 0.9s 0.3s var(--ease) forwards;
}
.sub {
  margin-top:2.8rem; font-size:clamp(0.65rem,1.2vw,0.82rem); font-weight:200;
  letter-spacing:0.22em; text-transform:uppercase; color:var(--muted);
  opacity:0; animation:fadeIn 0.8s 0.7s var(--ease) forwards;
}
@keyframes rise {
  from { opacity:0; transform:translateY(40px) skewY(2deg) }
  to   { opacity:1; transform:translateY(0) skewY(0) }
}
.cta-row {
  margin-top:2.4rem; display:flex; gap:0.7rem; flex-wrap:wrap; justify-content:center;
  opacity:0;
  animation:fadeIn 0.8s 0.9s var(--ease) forwards;
}
@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
@media (max-width:640px) { .hero { padding:0 1.4rem } }




#work.section { padding:9rem 4rem; border-top:1px solid var(--line) }
#work .header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:5rem; flex-wrap:wrap; gap:2rem }
#work .count { font-size:0.6rem; font-weight:200; letter-spacing:0.2em; text-transform:uppercase; color:var(--muted) }
#work .list { display:flex; flex-direction:column }
#work .item {
  display:grid; grid-template-columns:3rem 1fr 1fr auto; align-items:center; gap:3rem;
  padding:2.4rem 0; border-bottom:1px solid var(--line); position:relative; cursor:default;
}
#work .item:first-child { border-top:1px solid var(--line) }
#work .item::before {
  content:''; position:absolute; inset:0; background:rgba(255,255,255,0.02); opacity:0;
  transition:opacity 0.3s var(--ease); pointer-events:none;
}
#work .item:hover::before { opacity:1 }
#work .item:hover .arrow { opacity:1; transform:translateX(6px) }
#work .num { font-size:0.6rem; font-weight:200; color:var(--muted); letter-spacing:0.1em }
#work .name { font-family:var(--font-sans); font-weight:900; font-size:clamp(1.4rem,3vw,2.6rem); letter-spacing:-0.03em; line-height:1 }
#work .type { font-family:var(--font-serif); font-style:italic; font-size:clamp(0.88rem,1.5vw,1.05rem); color:var(--muted) }
#work .right { display:flex; align-items:center; gap:1rem }
#work .arrow {
  width: 2.4rem; 
  height: 2.4rem; 
  border-radius: 50%;
  display: flex; 
  align-items: center; 
  justify-content: center;
  color: var(--white);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  opacity: 0.25;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 3); 
}
@media (max-width:640px) {
  #work.section { padding:5.5rem 1.4rem }
  #work .item { grid-template-columns:2rem 1fr auto; gap:1.2rem }
  #work .type, #work .right :deep(.badge) { display:none }
}



#sinth.section { padding:9rem 4rem; border-top:1px solid var(--line) }
#sinth.dark { background:#0a0a0a }
#sinth .grid { display:grid; grid-template-columns:5fr 6fr; gap:6rem; align-items:center }
#sinth .tagline { font-family:var(--font-serif); font-style:italic; font-size:clamp(1.3rem,3vw,2rem); opacity:0; line-height:1.3; margin:1.8rem 0 1.4rem }
#sinth .body { font-size:0.82rem; font-weight:200; line-height:2; color:var(--muted); margin-bottom:2.2rem; max-width:44ch }
#sinth .pills { display:flex; gap:0.7rem; flex-wrap:wrap }
@media (max-width:860px) {
  #sinth .grid { grid-template-columns:1fr; gap:3.5rem }
}
@media (max-width:640px) {
  #sinth.section { padding:5.5rem 1.4rem }
}




#news.section { padding:9rem 4rem; border-top:1px solid var(--line) }

#news .grid {
  display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line);
  border:1px solid var(--line); border-radius:1.2rem; overflow:hidden; margin-top:4rem;
}
#news .cell {
  background:#0a0a0a; padding:3rem 2.5rem; transition:background 0.3s;
  text-decoration:none; color:inherit; display:block;
}
#news .cell:hover { background:#141414 }
#news .label {
  font-size:0.58rem; letter-spacing:0.22em; font-weight:200; text-transform:uppercase;
  color:var(--muted); margin-bottom:1rem;
}
#news .title { font-weight:900; font-size:1.5rem; letter-spacing:-0.03em; line-height:1; margin-bottom:0.8rem }
#news .body { font-size:0.78rem; font-weight:200; color:var(--muted); line-height:1.9 }
#news .view-all {
  display:block; text-align:center; margin-top:2.5rem; font-size:0.8rem;
  color:var(--muted); text-decoration:none; transition:color 0.3s;
}
#news .view-all:hover { color:var(--white) }
#news .excerpt-text {
  mask-image:linear-gradient(to right, #fff 70%, transparent);
  -webkit-mask-image:linear-gradient(to right, #fff 70%, transparent);
}
#news .excerpt-ellipsis { opacity:1 }
#news .read-more {
  color:var(--white); font-weight:500; text-decoration:none;
  margin-left:0.25rem; opacity:1;
}
#news .read-more:hover { text-decoration:underline; text-underline-offset:3px }
@media (max-width:720px) {
  #news .grid { grid-template-columns:1fr }
}
@media (max-width:640px) {
  #news.section { padding:5.5rem 1.4rem }
}



#more.section { padding:9rem 4rem; border-top:1px solid var(--line) }
#more.dark { background:#0a0a0a }
#more .grid {
  display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line);
  border:1px solid var(--line); border-radius:1.2rem; overflow:hidden; margin-top:4rem;
}
#more .grid > * {
  text-align:left;
  display:block;
}
#more .cell { background:#0a0a0a; padding:3rem 2.5rem; transition:background 0.3s }
#more .cell:hover { background:#141414 }
#more .label { font-size:0.58rem; letter-spacing:0.22em; font-weight:200; text-transform:uppercase; color:var(--muted); margin-bottom:1rem }
#more .title { font-weight:900; font-size:1.5rem; letter-spacing:-0.03em; line-height:1; margin-bottom:0.8rem }
#more .body { font-size:0.78rem; font-weight:200; color:var(--muted); line-height:1.9 }
@media (max-width:720px) { #more .grid { grid-template-columns:1fr } }
@media (max-width:640px) { #more.section { padding:5.5rem 1.4rem } }



.sinth-logo-inline {
  height: 100px;
  width: auto;
  vertical-align: middle;
  margin-bottom: 1.5rem;
}


</style>